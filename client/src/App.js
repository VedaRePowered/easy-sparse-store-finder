import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListView from './ListView';
import RatingBar from './RatingBar';

function decode(data) {
  return data.split(";").map(object => object.split(":"));
}

const debug = true;
const socket = new WebSocket(debug ? "ws://127.0.0.1:12345" : "ws://monarch.lan:12345");
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.storeType = "supermarket";
    this.closestId = "";
    this.closestName = "";
    this.ownPosition = {"latitude": 51.0673044, "longitude": -114.0862353};
    this.state = {
      stores: [],
    };
  }
  reloadStores() {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.ownPosition.latitude = position.coords.latitude;
    //     this.ownPosition.longitude = position.coords.longitude;
    //   },
    //   error => alert(error.message)
    // );
    socket.send("getRatings;" + this.ownPosition.latitude.toString() + ";" + this.ownPosition.longitude.toString() + ";" + this.storeType);
  }
  componentDidMount() {
    socket.onopen = event => {
      this.reloadStores();
      setInterval(this.reloadStores.bind(this), 90000) // Reload once every one and a half minutes
    };
    socket.onmessage = event => {
      const data = decode(event.data);
      const newStores = [];
      switch (data[0][0]) {
        case "storeRatings":
          for (const storeID in data) { // can't use of because data[0] is the message type.
            if (data.hasOwnProperty(storeID) && parseInt(storeID) !== 0) {
              const store = data[storeID];
              newStores.push({name: store[0], userRating: parseInt(store[1]), googleRating: parseInt(store[2]), locationId: store[3], position: {"latitude": store[4], "longitude": store[5]}})
            }
          }
          let closestDist = 1000000;
          for (const store of newStores) {
            const dist = (Math.pow(store.position.latitude-this.ownPosition.latitude, 2)+Math.pow(store.position.longitude-this.ownPosition.longitude, 2))*100000
            store.dist = dist;
            if (dist < closestDist) {
              closestDist = dist;
              this.closestId = store.locationId;
              this.closestName = store.name;
            }
          }
          const sortedStores = newStores.sort((a, b) => a.dist - b.dist);
          console.log(this.closestId)
          console.log(this.closestName)
          this.setState({stores: sortedStores});

          break;
        default:

      }
    };
  }

  userRate(cursor) {
    socket.send("userRate;" + this.closestId + ";" + Math.floor(cursor.clientX/window.innerWidth*100.0).toString());
    this.reloadStores();
  }

  switchStores(storeType) {
    this.storeType = storeType;
    this.reloadStores();
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src="sparselogo.png"/>
        </header>
        <button className="App_refreashButton" onClick={this.reloadStores.bind(this)}>Refresh</button>
        <span className="App_buttonContainer">
          <button onClick={() => this.switchStores("supermarket")}>Supermarkets</button>
          <button onClick={() => this.switchStores("convenience_store")}>Convenience Store</button>
          <button onClick={() => this.switchStores("restaurant")}>Restaurants</button>
          <button onClick={() => this.switchStores("park")}>Parks</button>
        </span>
        <ListView stores={this.state.stores} />
        <RatingBar storeName={this.closestName} userRate={this.userRate.bind(this)}/>
      </div>
    );
  }
}

export default App;
