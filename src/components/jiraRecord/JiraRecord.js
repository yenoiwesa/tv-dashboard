import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import './JiraRecord.css';

class JiraRecord extends Component {
  
  render() {
    const record = this.props.record;
    const priorityCode = record.priority.name.charAt(0);

    let typeCode;
    let typeIcon;
    switch (record.type.id) {
      case '1':
        typeCode = 'bug';
        typeIcon = (<i className="material-icons">whatshot</i>);
        break;
      case '10000':
        typeCode = 'bug'; /* customer bug */
        typeIcon = (<i className="material-icons">bug_report</i>);
        break;
      case '3':
        typeCode = 'task';
        typeIcon = (<i className="material-icons">check</i>);
        break;
      case '41':
        typeCode = 'epic';
        typeIcon = (<i className="material-icons">flash_on</i>);
        break;
      case '42':
        typeCode = 'story';
        typeIcon = (<i className="material-icons">bookmark</i>);
        break;
      default:
        break;
    }

    let assignee;
    if (record.assignee) {
      assignee = (<img src={record.assignee.avatarUrl} alt="Avatar" className="JiraRecord-avatar"/>);
    }

    let bottomDetails = [];
    bottomDetails.push((<div key="created">created <span>{moment(record.created).fromNow()}</span></div>));
    if (record.creator) {
      bottomDetails.push((<div key="creator">by <span>{record.creator.shortName}</span></div>));
    }
    if (record.sprint) {
      bottomDetails.push((<div key="sprint">in sprint <span>{record.sprint.name}</span></div>));
    }
    if (record.assignee) {
      bottomDetails.push((<div key="assignee">assigned to <span>{record.assignee.shortName}</span></div>));
    }

    return (
      <div className={`JiraRecord JiraRecord-${typeCode}`}>
        <div className="JiraRecord-type-details">
          <div className={`JiraRecord-type `}>{typeIcon}</div>
          <div className={`JiraRecord-priority JiraRecord-priority-${priorityCode}`}>{priorityCode}</div>
        </div>
        <div className="JiraRecord-main">
          <div className="JiraRecord-key">{record.key}</div>
          <div className="JiraRecord-summary">{_.truncate(record.summary, { length: 150 })}</div>
          <div className="JiraRecord-bottom">
            {bottomDetails}
          </div>
        </div>
        <div className="JiraRecord-other-details">
          {assignee}
        </div>
      </div>
    );
  }
}

export default JiraRecord;