# io-hack-project
An IO Hack Project for team ANTS

To get started:
`cd client`
`npm run init`
`cd ..`
`cd server`
`pip3 install websockets`
`pip3 install firebase_admin`
`pip3 install --upgrade git+https://github.com/m-wrzr/populartimes`

To run, simultaneously run:
`cd client; npm start` and
`cd server; python3 main.py`

Created by:
Ben Heard,
Ben Shi,
Cole Dewis,
Jacob Guglielmin and
Jerry Zhou

# Technologies Utilized
Our project utilizes many different technologies, including:
- React JavaScript libraries to create a simple, yet effective, web app
- Cordova to package a web app into an android APK
- Google Maps Places API to get data on nearby locations and their popularity
- Popular times API, a python extension to Places API
- Cloud Firebase, a cloud based API, to store user ratings and display them to clients
- Websockets to allow the client and server to communicate

# Code Structure
Sparse operates with both a front end and back end. 

Inside the "client" folder you will find our front end application. This consists of the React project that creates our app. The front end communicates with the server and displays the information it recieves to the user. Many files are utilized to create the UI.

Inside the "server" folder you will find the back end. This is a python file that runs on our server. This file is designed to communicate with the Firebase DB and the Popular times API. When it recieves a request from the client, it will send the required data. The backend file is "main.py"
