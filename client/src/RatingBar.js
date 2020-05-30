import React from 'react';
import './RatingBar.css';

function RatingBar(props) {
  return (
    <div className="RatingBar" onClick={props.userRate}>
    </div>
  );
}

export default RatingBar;
