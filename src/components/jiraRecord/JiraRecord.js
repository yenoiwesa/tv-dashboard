import React, { Component } from 'react';
import './JiraRecord.css';
import '../slide.utils.css';

class JiraRecord extends Component {
  
  render() {
    return (
      <div className="JiraRecord u-slide-container">
        <div className="JiraRecord-content">
          <div className="JiraRecord-text">
            Here is a Jira record
          </div>
        </div>
      </div>
    );
  }
}

export default JiraRecord;