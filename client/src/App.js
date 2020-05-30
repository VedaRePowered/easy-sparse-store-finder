import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Header
        </p>
      </header>
      <ListItem storeName="Safeway" userRating="3"/>
    </div>
  );
}

export default App;
