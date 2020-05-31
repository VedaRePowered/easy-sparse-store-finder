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
  let ratingValue = props.googleRating > props.userRating ?
    props.googleRating*0.7 + props.userRating*0.3 :
    props.userRating*0.7 + props.googleRating*0.3
  if (typeof(ratingValue) !== "number" || isNaN(ratingValue)) {
    ratingValue = typeof(props.googleRating) === "number" ? props.googleRating : props.userRating
  }
  const rating = getRatingStr(ratingValue);
  return (
    <span className="ListItem">
      <div className="ListItem-name">{props.storeName}</div>
      <div className={"ListItem-rating ListItem-rating_" + rating}>{rating}</div>
    </span>
  );
}

export default ListItem;
