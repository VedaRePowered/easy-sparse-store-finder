import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListView from './ListView';
import RatingBar from './RatingBar';

function decode(data) {
  return data.split(",").map(object => object.split(":"));
}

const socket = new WebSocket("ws://127.0.0.1:12345");
class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stores: [],
    };
  }
  componentDidMount() {
    socket.onopen = event => {
      // navigator.geolocation.getCurrentPosition(
      //   position => socket.send("getRatings," + position.coords.latitude.toString() + "," + position.coords.longitude.toString()),
      //   error => alert(error.message)
      // );
      socket.send("getRatings,51.0673044,-114.0862353")
    };
    socket.onmessage = event => {
      const data = decode(event.data);
      const newStores = [];
      switch (data[0][0]) {
        case "storeRatings":
          for (const storeID in data) { // can't use of because data[0] is the message type.
            if (data.hasOwnProperty(storeID) && parseInt(storeID) !== 0) {
              const store = data[storeID];
              newStores.push({name: store[0], userRating: parseInt(store[1]), googleRating: parseInt(store[2]), locationId: store[3]})
            }
          }
          this.setState({stores: newStores});

          break;
        default:

      }
    };
  }

  userRate(cursor) {
    socket.send("userRate," + Math.floor(cursor.clientX/window.innerWidth*100.0).toString());
  }

  render() {
    return (
      <div className="App">
        <header>
          <p>
            Header
          </p>
        </header>
        <ListView stores={this.state.stores} />
        <RatingBar userRate={this.userRate}/>
      </div>
    );
  }
}

export default App;
