import React from 'react';
import ListItem from './ListItem';
import './ListView.css'

// List of stores
function ListView(props) {
  return (
    <div className="ListView">
      {
        props.stores.map(store => <ListItem key={store.id} storeName={store.name} userRating={store.userRating} googleRating={store.googleRating} />)
      }
    </div>
  );
}

export default ListView;
