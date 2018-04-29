import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StandUpSlide.css';
import '../slide.utils.css';

class StandUpSlide extends Component {
  
    render() {
        // play sound
        if (this.props.slide.sound) {
            setTimeout(() => {
                (new Audio('/assets/standUp.mp3')).play();
            }, 500);
        }

        return (
            <div className="StandUpSlide u-slide-container">
                <div className="StandUpSlide-content">
                    <div className="StandUpSlide-text">{'It\'s stand up time!'}</div>
                </div>
            </div>
        );
    }
}

StandUpSlide.propTypes = {
    slide: PropTypes.object.isRequired
};

export default StandUpSlide;