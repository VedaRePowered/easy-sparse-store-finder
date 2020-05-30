import React from 'react';
import './ListItem.css';

function getRatingStr(ratingValue) {
  if (typeof(ratingValue) !== "number") {
    return "Unknown";
  }
  let ratingStr = "";
  const scaledRating = Math.floor(ratingValue / 100.0 * 6.0);
  switch (scaledRating) {
    case 7: ratingStr = "More then ever before"; break;
    case 6: ratingStr = "Squishy"; break;
    case 5: ratingStr = "Packed"; break;
    case 4: ratingStr = "Crowded"; break;
    case 3: ratingStr = "Moderate"; break;
    case 2: ratingStr = "Sparse"; break;
    case 1: ratingStr = "Lonely"; break;
    case 0: ratingStr = "Empty"; break;
    default: ratingStr = "Unknown"; break;
  }
  return ratingStr;
}

function ListItem(props) {
  const userRating = getRatingStr(props.userRating);
  const googleRating = getRatingStr(props.googleRating);
  return (
    <span className="ListItem">
      <div className="ListItem-name">{props.storeName}</div>
      <div className="ListItem-ratingContainer">
        <div className={"ListItem-rating ListItem-rating_" + userRating}>{userRating}</div>
        <div className={"ListItem-rating ListItem-rating_" + googleRating}>{googleRating}</div>
      </div>
    </span>
  );
}

export default ListItem;
