import React from 'react';
import './RatingBar.css';

function RatingBar(props) {
  return (
    <div className="RatingBar">
      <span>How Safe do you feel in this store?</span>
      <div className="RatingBar_gradient" onClick={props.userRate}>
        <p className="RatingBar_marker RatingBar_marker-safe">safe</p>
        <p className="RatingBar_marker RatingBar_marker-ok">OK</p>
        <p className="RatingBar_marker RatingBar_marker-unsafe">unsafe</p>
      </div>
    </div>
  );
}

export default RatingBar;
