import React from 'react';
import './RatingBar.css';

// Bar that you can click to rate your current location
class RatingBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "completed": false
    };
  }

  reset() {
    this.setState({"completed": true});
  }

  render() {
    if (this.state.completed) {
      return (
        <div className="RatingBar">
          <span className="RatingBar_name">Thank you for the rating!</span>
        </div>
      );
    } else {
      return (
        <div className="RatingBar">
          <span className="RatingBar_name">How busy is {this.props.storeName.split(" at ")[0]}?</span>
          <div className="RatingBar_gradient" onClick={cursor => {this.props.userRate(cursor); this.reset();}}>
            <p className="RatingBar_marker RatingBar_marker-not-busy">Not busy</p>
            <p className="RatingBar_marker RatingBar_marker-busy">Busy</p>
          </div>
        </div>
      );
    }
  }
}

export default RatingBar;
