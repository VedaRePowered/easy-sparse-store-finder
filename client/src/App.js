import React from 'react';
import './App.css';
import ListView from './ListView';
import RatingBar from './RatingBar';

// split a string formated like 'a:b;c:d' into an array like [['a', 'b'], ['c', 'd']]
function decode(data) {
  return data.split(";").map(object => object.split(":"));
}

const socket = new WebSocket("ws://sparse.ben1jen.software/ws/"); // connect to backend server
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.storeType = "supermarket"; // The store type your searching for
    this.closestId = ""; // The store your nearest to
    this.closestName = "";
    this.ownPosition = {"latitude": 51.0509746, "longitude": -114.0782401};
    this.state = {
      stores: [], // stored in this.state for react
    };
  }
  reloadStores() {
    // Get position and reload store list from the server
    navigator.geolocation.getCurrentPosition(
      position => {
        this.ownPosition.latitude = position.coords.latitude;
        this.ownPosition.longitude = position.coords.longitude;
        socket.send("getRatings;" + this.ownPosition.latitude.toString() + ";" + this.ownPosition.longitude.toString() + ";" + this.storeType);
      },
      error => alert(error.message)
    );
    // This is horrible.
  }
  componentDidMount() {
    // Refresh as soon as we connect to the backend
    socket.onopen = event => {
      this.reloadStores();
      setInterval(this.reloadStores.bind(this), 90000) // Reload once every one and a half minutes
    };
    socket.onmessage = event => {
      // Parse message from server
      const data = decode(event.data);
      const newStores = [];
      switch (data[0][0]) {
        case "storeRatings":
          // New list of stores
          for (const storeID in data) { // can't use of because data[0] is the message type.
            if (data.hasOwnProperty(storeID) && parseInt(storeID) !== 0) {
              const store = data[storeID];
              newStores.push({name: store[0], userRating: parseInt(store[1]), googleRating: parseInt(store[2]), locationId: store[3], position: {"latitude": store[4], "longitude": store[5]}})
            }
          }
          // Find closest store
          for (const store of newStores) {
            const dist = (Math.pow(store.position.latitude-this.ownPosition.latitude, 2)+Math.pow(store.position.longitude-this.ownPosition.longitude, 2))*100000
            store.dist = dist;
          }
          const sortedStores = newStores
            .filter(store => store.googleRating !== 0)
            .sort((a, b) => a.dist - b.dist);

          if (sortedStores[0]) {
            this.closestId = sortedStores[0].locationId;
            this.closestName = sortedStores[0].name;
          }

          // Update the react elements
          this.setState({stores: sortedStores});
          break;
        default:

      }
    };
    socket.onclose = event => {
      alert("disconnect");
      setTimeout(() => {
        socket = new WebSocket("ws://sparse.ben1jen.software/ws/");
      }, 5000)
    }
  }

  // Send our new rating to the server
  userRate(cursor) {
    socket.send("userRate;" + this.closestId + ";" + Math.floor(cursor.clientX/window.innerWidth*100.0).toString());
    this.reloadStores();
  }

  // Switch which type of store we're displaying
  switchStores(storeType) {
    this.storeType = storeType;
    this.reloadStores();
  }

  render() {
    return (
      <div className="App">
        <img className="App_logo" src="sparselogo.png" alt="sparse"/>
        <div className="App_refreshButtonContainer"><button className="App_refreshButton" onClick={this.reloadStores.bind(this)}>Refresh</button></div>
        <span className="App_buttonContainer">
          <button onClick={() => this.switchStores("supermarket")}>Supermarkets</button>
          <button onClick={() => this.switchStores("convenience_store")}>Convenience Store</button>
          <button onClick={() => this.switchStores("restaurant")}>Restaurants</button>
          <button onClick={() => this.switchStores("park")}>Parks</button>
        </span>
        <ListView className="App_listView" stores={this.state.stores} />
        <RatingBar className="App_ratingBar" storeName={this.closestName} userRate={this.userRate.bind(this)}/>
      </div>
    );
  }
}

export default App;
