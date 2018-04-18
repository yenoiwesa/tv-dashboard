import React, { Component } from 'react';
import JiraRecord from '../../jiraRecord/JiraRecord';
import './JiraRecordListSlide.css';
import '../slide.utils.css';

const ITEMS_PER_COLUMN = 4;
const MAX_COLUMNS = 3;

class JiraRecordListSlide extends Component {
  
  render() {
    const slide = this.props.slide;

    // form columns
    let columns = [];
    for (let index = 0; index < MAX_COLUMNS; index++) {
      const start = index * ITEMS_PER_COLUMN;
      const end = start + ITEMS_PER_COLUMN;
      const columnRecords = slide.records.slice(start, end);

      if (columnRecords.length) {
        const toJiraRecord = record => (<JiraRecord key={record.key} record={record}/>);
        columns.push((
          <div className="JiraRecordListSlide-column" key={index}>
            {columnRecords.map(toJiraRecord)}
          </div>
        ));
      }
    }

    return (
      <div className="JiraRecordListSlide u-slide-container">
        <div className="JiraRecordListSlide-content">
          <div className="JiraRecordListSlide-title">{slide.title}</div>
          <div className="JiraRecordListSlide-columns">
            {columns}
          </div>
        </div>
      </div>
    );
  }
}

export default JiraRecordListSlide;