import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JiraRecord from '../../jiraRecord/JiraRecord';
import './JiraRecordListSlide.css';
import '../slide.utils.css';

const ITEMS_PER_COLUMN = 3;
const MAX_COLUMNS = 2;

class JiraRecordListSlide extends Component {
  
    render() {
        const slide = this.props.slide;

        // page number
        let pageCount;
        if (slide.totalPages > 1) {
            pageCount = (
                <span className="u-slide-page-nb">({slide.page}/{slide.totalPages})</span>
            );
        }

        // split in columns
        const columns = [];
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
                    <div className="JiraRecordListSlide-title u-slide-title">
                        <img src="assets/jira.svg" alt="Jira logo" className="JiraRecordListSlide-logo u-slide-logo"></img>
                        {slide.title} {pageCount}
                    </div>
                    <div className="JiraRecordListSlide-columns">
                        {columns}
                    </div>
                </div>
            </div>
        );
    }
}

JiraRecordListSlide.propTypes = {
    slide: PropTypes.object.isRequired
};

export default JiraRecordListSlide;