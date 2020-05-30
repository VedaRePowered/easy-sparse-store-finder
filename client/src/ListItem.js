import React from 'react';
import './ListItem.css';

function ListItem(props) {
  let ratingStr = "";
  switch (props.userRating) {
    case "0": ratingStr = "Squishy"; break;
    case "1": ratingStr = "Packed"; break;
    case "2": ratingStr = "Normal"; break;
    case "3": ratingStr = "Sparse"; break;
    case "4": ratingStr = "Sparse"; break;
    default: ratingStr = "Unknown"; break;
  }
  return (
    <span class="ListItem">
      <div class="ListItem-name">{props.storeName}</div>
      <div class="ListItem-ratingUser">{ratingStr}</div>
    </span>
  );
}

export default ListItem;
