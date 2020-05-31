# Import type hints
from typing import Dict, List

# Import database library
import firebase_admin as firebase
from firebase_admin import firestore

# Import library to make our API calls
import populartimes

# Time (who would have guessed?)
from time import time
from datetime import datetime

# Imports for frontend-backenc communication
import asyncio
import websockets
import math

# Get the API key from the apiKey file
apiKeyFile = open("apiKey.txt", "r")

if apiKeyFile.mode == "r":
    apiKey = apiKeyFile.read()

# Use a service account. The link needs to be a link to your credentials.
cred = firebase.credentials.Certificate("dbauth.json")
firebase.initialize_app(cred)

db = firestore.client()

def dbPush(locationID: str, value: int, collection: str):
    # PUSH TO DB
    doc_ref = db.collection(collection).document(locationID)
    # Updates DB if document exists, creates if it does not
    if doc_ref.get().exists:
        doc_ref.update({
            str(math.floor(time())): {"value": value}
        })
    else:
        doc_ref.set({
            str(math.floor(time())): {"value": value}
        })

def dbRead(document: str, collection: str):
    # Set up variables to read db and determine weighting
    doc_ref = db.collection(collection).document(document)
    doc = doc_ref.get()
    contents: Dict[str, Dict[str, int]] = doc.to_dict()
    total: float = 0
    totalWeight: float = 0

    # Determine weight of each entry based on how old it is
    if contents is None:
      return None
    for entryTime, entry in contents.items():
        weight: float = 1 - (time() - float(entryTime)) / 9000
        # Based on weight, either delete the entry or use the weight to determine how busy location is
        if weight < 0:
            doc_ref.update({
                entryTime: firestore.DELETE_FIELD
            })
        else:
            totalWeight += weight
            total += weight * entry["value"]
    # Prevents divide by zero errors
    if totalWeight == 0:
        return None
    total /= totalWeight
    return total


def getNearby(types: List[str], lat: float, lon: float):
    # Request from API information on nearby locations
    nearbyPlaces = populartimes.get(apiKey, types, (lat-0.005,lon-0.005), (lat+0.005,lon+0.005))
    return nearbyPlaces

async def onmessage(websocket, path: str):
    async for message in websocket:
        data: List[str] = message.split(";")
        # If server recieves request for nearby data...
        if data[0] == "getRatings":
            results = getNearby([data[3]], float(data[1]), float(data[2]))
            strData: str = ""
            for result in results:
                cur_pop: str = ""
                if "current_popularity" in result:
                  cur_pop = result["current_popularity"]
                elif "populartimes" in result: # fall back on average populartimes
                  weekday: int = datetime.today().weekday()
                  hour: int = datetime.now().hour
                  cur_pop = result["populartimes"][weekday]["data"][hour]
                strData += ";" + result["name"] + " at " + result["address"] + ":" + \
                  str(dbRead(result["id"], "userRatings")) + ":" + \
                  str(cur_pop) + ":" + \
                  result["id"] + ":" + \
                  str(result["coordinates"]["lat"]) + ":" + \
                  str(result["coordinates"]["lng"])
            # ...send data on locations to user
            await websocket.send("storeRatings" + strData)
        # If server recieves user rating for a location
        elif data[0] == "userRate":
            # Push rating to database
            dbPush(data[1], data[2], "userRatings")

# Start websocket server
asyncio.get_event_loop().run_until_complete(
     websockets.serve(onmessage, "0.0.0.0", 7030))
asyncio.get_event_loop().run_forever()
