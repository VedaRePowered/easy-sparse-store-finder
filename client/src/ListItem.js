import React from 'react';
import './ListItem.css';

function getRatingStr(ratingValue) {
  if (typeof(ratingValue) !== "number") {
    return "Unknown";
  }
  let ratingStr = "";
  const scaledRating = Math.floor(ratingValue / 100.0 * 9.0);
  switch (scaledRating) {
    case 9: case 10:        ratingStr = "Squishy"; break;
    case 6: case 7: case 8: ratingStr = "Crowded"; break;
    case 5:                 ratingStr = "Moderate"; break;
    case 4: case 3:         ratingStr = "Sparse"; break;
    case 2: case 1:         ratingStr = "Quiet"; break;
    case 0:                 ratingStr = "Lonely"; break;
    default:                ratingStr = "Unknown"; break;
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
