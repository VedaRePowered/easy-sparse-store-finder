import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account. The link needs to be a link to your credentials.
cred = credentials.Certificate('C:/Users/coled/Documents/easy-sparse-store-finder/dbauth.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def dbPush(location, rating, time):
    #PUSH TO DATABASE
    doc_ref = db.collection('userRatings').document(location)
    doc_ref.set({
        'rating': rating,
        'time': time
    })

def dbRead(document):
    users_ref = db.collection('userRatings')
    docs = users_ref.stream()
    for doc in docs:
        if(doc.id == document):
            print('{} => {}'.format(doc.id, doc.to_dict()))
