import React from 'react';
import ListItem from './ListItem';

function ListView(props) {
  return (
    <div className="ListView">
      {
        props.stores
          .sort((a, b) => b.userRating-a.userRating)
          .map((store) => <ListItem storeName={store.name} userRating={store.userRating} googleRating={store.googleRating} />)
      }
    </div>
  );
}

export default ListView;
