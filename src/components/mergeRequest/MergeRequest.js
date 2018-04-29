import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './MergeRequest.css';

class MergeRequest extends Component {
    render() {
        const mr = this.props.mergeRequest;
        const status = new Status();

        // merge conflicts
        if (mr.mergeConflicts) {
            status.error();
        }

        // upvotes
        const reviewStatus = new Status();
        if (mr.upvotes < 2) {
            reviewStatus.warn();
        }

        // work in progress
        if (mr.workInProgress) {
            status.warn();
        }

        // pipeline
        let pipeline;
        if (mr.pipeline) {
            pipeline = (
                <div className={`MergeRequest-pipeline MergeRequest-pipeline-${mr.pipeline.status}`}>
                    Pipeline | {mr.pipeline.status}
                </div>
            );
            if (['failed', 'canceled', 'skipped'].includes(mr.pipeline.status)) {
                status.error();
            }
        } else {
            status.warn();
        }

        const bottomDetails = [];
        bottomDetails.push(
            <div key="created">
                created <span>{moment(mr.created).fromNow()}</span>
            </div>
        );
        bottomDetails.push(
            <div key="author">
                by <span>{mr.author.shortName}</span>
            </div>
        );
        if (mr.pipeline && mr.pipeline.coverage) {
            bottomDetails.push(
                <div key="coverage">
                    coverage <span>{mr.pipeline.coverage}%</span>
                </div>
            );
        }

        return (
            <div className={`MergeRequest MergeRequest-${status.value}`}>
                <div className="MergeRequest-main">
                    <div className="MergeRequest-branches">
                        <span className="MergeRequest-branch">{mr.sourceBranch}</span>
                        <i className="material-icons">chevron_right</i>
                        <span className="MergeRequest-branch">{mr.targetBranch}</span>
                    </div>
                    <div className="MergeRequest-title">{mr.title}</div>
                    {pipeline}
                    <div className="JiraRecord-bottom u-slide-bottom">{bottomDetails}</div>
                </div>
                <div className="MergeRequest-side">
                    <img src={mr.author.avatarUrl} alt="Avatar" className="MergeRequest-avatar" />
                    <div className={`MergeRequest-upvotes MergeRequest-upvotes-${reviewStatus.value}`}>
                        <i className="material-icons">thumb_up</i>
                        <span>{mr.upvotes}</span>
                    </div>
                    <div className="MergeRequest-comments">
                        <i className="material-icons">mode_comment</i>
                        <span>{mr.notesCount}</span>
                    </div>
                </div>
            </div>
        );
    }
}

MergeRequest.propTypes = {
    mergeRequest: PropTypes.object.isRequired
};

class Status {
    constructor() {
        this.value = 'ok';
    }

    warn() {
        if (this.value === 'ok') {
            this.value = 'warn';
        }
    }

    error() {
        this.value = 'error';
    }

    apply(otherStatus) {
        if (otherStatus.value === 'error') {
            this.error();
        } else if (otherStatus.value === 'warn') {
            this.warn();
        }
    }
}

export default MergeRequest;
