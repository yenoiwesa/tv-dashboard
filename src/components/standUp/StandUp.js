import React, { Component } from 'react';
import './StandUp.css';
import '../slide.utils.css';

class StandUp extends Component {
  
  render() {
    return (
      <div className="StandUp u-slide-container">
        <div className="StandUp-content">
          It's stand up time!
        </div>
      </div>
    );
  }
}

export default StandUp;