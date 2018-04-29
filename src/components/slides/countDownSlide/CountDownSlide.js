import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import './CountDownSlide.css';
import '../slide.utils.css';

class CountDownSlide extends Component {

    render() {
        const slide = this.props.slide;

        const renderer = ({ hours, minutes, seconds }) => {
            return (<div className="CountDownSlide-time">
                {hours}<span>:</span>{minutes}<span>:</span>{seconds}
            </div>);
        };

        let title;
        switch (slide.event) {
            case 'standUp':
                title = (<div className="CountDownSlide-title">Time left before <div className="CountDownSlide-event">stand up</div></div>);
                
                // play sound
                if (slide.sound) {
                    setTimeout(() => {
                        (new Audio('/assets/fiveMinutesToStandUp.mp3')).play();
                    }, 500);
                }
                break;
            case 'lunch':
                title = (<div className="CountDownSlide-title">Countdown to <div className="CountDownSlide-event">lunch time</div></div>);
                break;
            default:
                break;
        }

        return (
            <div className={`CountDownSlide CountDownSlide-${slide.event} u-slide-container`}>
                <div className="CountDownSlide-content">
                    {title}
                    <div className="CountDownSlide-separator"></div>
                    <Countdown date={slide.date} daysInHours={true} renderer={renderer}/>
                </div>
            </div>
        );
    }
}

CountDownSlide.propTypes = {
    slide: PropTypes.object.isRequired
};

export default CountDownSlide;