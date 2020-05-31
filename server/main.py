#Import database library
import firebase_admin as firebase
from firebase_admin import firestore

#Import library to make our API calls
import populartimes

#Time (who would have guessed?)
from time import time

#Imports for frontend-backenc communication
import asyncio
import websockets

# Get the API key from the apiKey file
apiKeyFile = open("apiKey.txt", "r")

if apiKeyFile.mode == "r":
    apiKey = apiKeyFile.read()

# Use a service account. The link needs to be a link to your credentials.
cred = firebase.credentials.Certificate("dbauth.json")
firebase.initialize_app(cred)

db = firestore.client()

def dbPush(locationID, value, collection):
    #PUSH TO DATABASE
    doc_ref = db.collection(collection).document(locationID)
    doc_ref.set({
        "value": value,
        "time": time()
    })

def dbRead(document, collection):
    users_ref = db.collection(collection)
    docs = users_ref.stream()
    for doc in docs:
        #only shows the requested doc
        if(doc.id == document):
            #if the review was performed recently, display. else, do not display
            if(time() - doc.to_dict()["time"] < 9000):
                return doc.to_dict()["value"]
            else:
                return None


def getNearby(types, lat, lon):
    #request from API information on nearby locations
    nearbyPlaces = populartimes.get(apiKey, types, (lat-0.001,lon-0.001), (lat+0.001,lon+0.001))
    return nearbyPlaces
    # for place in nearbyPlaces:
    #     # Send to frontend
    #     print(place["name"] + ": " + str(place["current_popularity"]))

# getNearby(["restaurant"], 51.0673044, -114.0862353)

async def onmessage(websocket, path):
    async for message in websocket:
        data = message.split(",")
        #if server recieves request for nearby data
        if data[0] == "getRatings":
            results = getNearby([data[3]], float(data[1]), float(data[2]))
            strData = ""
            for result in results:
                strData += "," + result["name"] + ":" + str(dbRead(result["id"], "userRatings")) + ":" + str(result["current_popularity"]) + ":" + result["id"] + ":" + str(result["coordinates"]["lat"]) + ":" + str(result["coordinates"]["lng"])
            #send data on locations to user
            await websocket.send("storeRatings" + strData)
        #if server recieves user rating for a location
        elif data[0] == "userRate":
            #push rating to database
            dbPush("ChIJpTcxKoxvcVMRBwv5uhdBpcE", data[1], "userRatings")

#websocket configuration
asyncio.get_event_loop().run_until_complete(
    websockets.serve(onmessage, "0.0.0.0", 12345))
asyncio.get_event_loop().run_forever()
