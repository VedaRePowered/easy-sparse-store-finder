import React from 'react';
import './ListItem.css';

function ListItem(props) {
  let ratingStr = "";
  switch (props.userRating) {
    case 0: ratingStr = "Squishy"; break;
    case 1: ratingStr = "Packed"; break;
    case 2: ratingStr = "Normal"; break;
    case 3: ratingStr = "Sparse"; break;
    case 4: ratingStr = "Lonely"; break;
    default: ratingStr = "Unknown"; break;
  }
  return (
    <span className="ListItem">
      <div className="ListItem-name">{props.storeName}</div>
      <div className={"ListItem-ratingUser ListItem-ratingUser_" + ratingStr}>{ratingStr}</div>
    </span>
  );
}

export default ListItem;
