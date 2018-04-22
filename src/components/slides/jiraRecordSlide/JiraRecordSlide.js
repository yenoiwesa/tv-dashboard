import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

JiraRecordSlide.propTypes = {
    slide: PropTypes.object.isRequired
};

export default JiraRecordSlide;