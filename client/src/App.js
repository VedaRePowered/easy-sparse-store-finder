import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListView from './ListView';

const socket = new WebSocket("ws://127.0.0.1:12345");
class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stores: [],
    };
  }
  componentDidMount() {
    socket.onopen = function(e) {
      navigator.geolocation.getCurrentPosition(
        position => socket.send("getRatings," + position.coords.latitude.toString() + "," + position.coords.longitude.toString()),
        error => alert(error.message)
      );
      socket.send("test");
    };
    socket.onmessage = function(event) {
      alert(`[message] Data received from server: ${event.data}`);
    };
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
      </div>
    );
  }
}

export default App;
