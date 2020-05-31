import React from 'react';
import './RatingBar.css';

function RatingBar(props) {
  return (
    <div className="RatingBar">
      <span>How busy is {props.storeName}?</span>
      <div className="RatingBar_gradient" onClick={props.userRate}>
        <p className="RatingBar_marker RatingBar_marker-not-busy">Not busy</p>
        <p className="RatingBar_marker RatingBar_marker-moderately-busy">Moderately busy</p>
        <p className="RatingBar_marker RatingBar_marker-busy">Busy</p>
      </div>
    </div>
  );
}

export default RatingBar;
