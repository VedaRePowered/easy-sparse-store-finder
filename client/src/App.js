import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListView from './ListView';

function App() {
  const stores = [
    {
      "name": "Safeway",
      "userRating": 4
    },
    {
      "name": "Costco",
      "userRating": 0
    },
    {
      "name": "Sobeys",
      "userRating": 3
    },
    {
      "name": "Superstore",
      "userRating": 1
    },
    {
      "name": "Co-op",
      "userRating": 2
    },
  ]
  return (
    <div className="App">
      <header>
        <p>
          Header
        </p>
      </header>
      <ListView stores={stores} />
    </div>
  );
}

export default App;
