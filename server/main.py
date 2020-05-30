#Import database library
import firebase_admin as firebase

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
cred = firebase.credentials.Certificate('dbauth.json')
firebase.initialize_app(cred)

db = firebase.firestore.client()

def dbPush(locationID, locationName, value, collection):
    #PUSH TO DATABASE
    doc_ref = db.collection(collection).document(locationID)
    doc_ref.set({
        'name': locationName,
        'value': value,
        'time': time()
    })

def dbRead(document, collection):
    users_ref = db.collection(collection)
    docs = users_ref.stream()
    for doc in docs:
        if(doc.id == document):
            print('{} => {}'.format(doc.id, doc.to_dict()))

def getNearby(types, lat, lon):
    nearbyPlaces = populartimes.get(apiKey, types, (lat-0.001,lon-0.001), (lat+0.001,lon+0.001))
    for place in nearbyPlaces:
        print("a")
        # Send to frontend
        #print(place["name"] + ": " + str(place["current_popularity"]))

getNearby(["restaurant"], 51.0673044, -114.0862353)

async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 12345))
asyncio.get_event_loop().run_forever()