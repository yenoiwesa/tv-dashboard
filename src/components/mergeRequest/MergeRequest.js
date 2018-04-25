import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MergeRequest.css';

class MergeRequest extends Component {
  
    render() {
        const mr = this.props.mergeRequest;

        return (
            <div className="MergeRequest">
                <div className="MergeRequest-main">
                    <div className="MergeRequest-title">{mr.title}</div>
                    <div className="MergeRequest-branches">
                        <span className="MergeRequest-branch">{mr.sourceBranch}</span>
                        <i className="material-icons">keyboard_arrow_right</i>
                        <span className="MergeRequest-branch">{mr.targetBranch}</span>
                    </div>
                </div>
                <div className="MergeRequest-side">
                    <img src={mr.author.avatarUrl} alt="Avatar" className="MergeRequest-avatar"/>
                    <div className="MergeRequest-upvotes">
                        <i className="material-icons">thumb_up</i> {mr.upvotes}
                    </div>
                    <div className="MergeRequest-comments">
                        <i className="material-icons">mode_comment</i> {mr.notesCount}
                    </div>
                </div>
            </div>
        );
    }
}

MergeRequest.propTypes = {
    mergeRequest: PropTypes.object.isRequired
};

export default MergeRequest;