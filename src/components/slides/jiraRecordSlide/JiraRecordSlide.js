import React, { Component } from 'react';
import JiraRecord from '../../jiraRecord/JiraRecord';
import './JiraRecordSlide.css';
import '../slide.utils.css';

class JiraRecordSlide extends Component {
  
  render() {
    const slide = this.props.slide;

    return (
      <div className="JiraRecordSlide u-slide-container">
        <div className="JiraRecordSlide-content">
          <div className="JiraRecordSlide-title">
            {slide.title}
          </div>
          <JiraRecord record={slide.record} />
        </div>
      </div>
    );
  }
}

export default JiraRecordSlide;