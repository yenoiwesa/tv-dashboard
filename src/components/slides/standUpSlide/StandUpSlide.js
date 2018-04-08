import React, { Component } from 'react';
import './StandUpSlide.css';
import '../slide.utils.css';

class StandUpSlide extends Component {
  
  render() {
    return (
      <div className="StandUpSlide u-slide-container">
        <div className="StandUpSlide-content">
          It's stand up time!
        </div>
      </div>
    );
  }
}

export default StandUpSlide;