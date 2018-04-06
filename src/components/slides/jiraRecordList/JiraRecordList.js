import React, { Component } from 'react';
import './JiraRecordList.css';
import '../slide.utils.css';

class JiraRecordList extends Component {
  
  render() {

    const records = this.props.slide.records.map(record => (
      <div key={record.key}>{record.key} - {record.summary}</div>
    ));

    return (
      <div className="JiraRecordList u-slide-container">
        <div className="JiraRecordList-content">
          {records}
        </div>
      </div>
    );
  }
}

export default JiraRecordList;