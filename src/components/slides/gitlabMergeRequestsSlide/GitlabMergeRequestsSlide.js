import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MergeRequest from '../../mergeRequest/MergeRequest';
import './GitlabMergeRequestsSlide.css';
import '../slide.utils.css';

const MAX_ITEMS = 6;

class GitlabMergeRequestsSlide extends Component {
  
    render() {
        const slide = this.props.slide;
        const mergeRequests = [];
        for (const mergeRequest of slide.mergeRequests.slice(0, MAX_ITEMS)) {
            mergeRequests.push((
                <MergeRequest key={mergeRequest.id} mergeRequest={mergeRequest}/>
            ));
        }

        return (
            <div className="GitlabMergeRequestsSlide u-slide-container">
                <div className="GitlabMergeRequestsSlide-content">
                    <div className="GitlabMergeRequestsSlide-title">
                        <img src="assets/gitlab.svg" alt="Gitlab logo" className="GitlabMergeRequestsSlide-logo"></img>
                        Merge Requests
                    </div>
                    <div className="GitlabMergeRequestsSlide-items">
                        {mergeRequests}
                    </div>
                </div>
            </div>
        );
    }
}

GitlabMergeRequestsSlide.propTypes = {
    slide: PropTypes.object.isRequired
};

export default GitlabMergeRequestsSlide;