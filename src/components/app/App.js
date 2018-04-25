import React, { Component } from 'react';
import WebSocket from '../../services/WebSocket';
import Config from '../../services/Config';
import ReactTransitions from 'react-transitions';
import scaleSlide from '../slides/scaleSlide';

import JiraRecordListSlide from '../slides/jiraRecordListSlide/JiraRecordListSlide';
import JiraRecordSlide from '../slides/jiraRecordSlide/JiraRecordSlide';
import StandUpSlide from '../slides/standUpSlide/StandUpSlide';
import LunchSlide from '../slides/lunchSlide/LunchSlide';
import CountDownSlide from '../slides/countDownSlide/CountDownSlide';
import GitlabMergeRequestsSlide from '../slides/gitlabMergeRequestsSlide/GitlabMergeRequestsSlide';

import './App.css';
import 'react-transitions/dist/animations.css';

const ScaledJiraRecordList = scaleSlide(JiraRecordListSlide);
const ScaledJiraRecord = scaleSlide(JiraRecordSlide);
const ScaledStandUp = scaleSlide(StandUpSlide);
const ScaledLunch = scaleSlide(LunchSlide);
const ScaledCountDown = scaleSlide(CountDownSlide);
const ScaledGitlabMergeRequests = scaleSlide(GitlabMergeRequestsSlide);

class App extends Component {

    constructor(props) {
        super(props);
        this.changeSlide = this.changeSlide.bind(this);
        this.state = {
            slide: null,
            transition: 'move-to-left-move-from-right'
        };

        Config.promise.then(config => this.setState({ transition: config.transition }));

        WebSocket.subscribeToSlideChange(this.changeSlide);
    }

    changeSlide(event) {
        this.setState({ slide: event });
    }

    componentWillUnmount() {
        WebSocket.unsubscribeToSlideChange(this.changeSlide);
    }

    render() {
        let slide;
        if (this.state.slide) {
            switch (this.state.slide.type) {
                case 'jiraRecordList':
                    slide = (<ScaledJiraRecordList key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                case 'jiraRecord':
                    slide = (<ScaledJiraRecord key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                case 'standUp':
                    slide = (<ScaledStandUp key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                case 'lunch':
                    slide = (<ScaledLunch key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                case 'countDown':
                    slide = (<ScaledCountDown key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                case 'gitlabMergeRequests':
                    slide = (<ScaledGitlabMergeRequests key={this.state.slide.id} slide={this.state.slide}/>);
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="App">
                <ReactTransitions transition={this.state.transition} width={'100%'} height={'100%'}>
                    {slide}
                </ReactTransitions>
            </div>
        );
    }

}

export default App;
