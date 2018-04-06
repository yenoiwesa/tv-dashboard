import React, { Component } from 'react';
import CountdownNow from 'react-countdown-now';
import './CountDown.css';
import '../slide.utils.css';

class CountDown extends Component {
  
  render() {
    const slide = this.props.slide;

    const renderer = ({ hours, minutes, seconds }) => {
        return (<div className="CountDown-time">
          {hours}<span>:</span>{minutes}<span>:</span>{seconds}
        </div>);
    };

    let title;
    switch (slide.event) {
      case 'standUp':
        title = (<div className="CountDown-title">Time left before <div className="CountDown-event">stand up</div></div>);
        break;
      case 'lunch':
        title = (<div className="CountDown-title">Countdown to <div className="CountDown-event">lunch time</div></div>);
        break;
      default:
        break;
    }

    return (
      <div className={`CountDown CountDown-${slide.event} u-slide-container`}>
        <div className="CountDown-content">
          {title}
          <div className="CountDown-separator"></div>
          <CountdownNow date={slide.date} daysInHours={true} renderer={renderer}/>
        </div>
      </div>
    );
  }
}

export default CountDown;