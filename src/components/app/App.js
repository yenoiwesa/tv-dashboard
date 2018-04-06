import React, { Component } from 'react';
import scaleSlide from '../slides/scaleSlide';
import JiraRecordList from '../slides/jiraRecordList/JiraRecordList';
import JiraRecord from '../slides/jiraRecord/JiraRecord';
import StandUp from '../slides/standUp/StandUp';
import CountDown from '../slides/countDown/CountDown';
import WebSocket from '../../services/WebSocket';
import ReactTransitions from 'react-transitions';
import './App.css';
import 'react-transitions/dist/animations.css';

const ScaledJiraRecordList = scaleSlide(JiraRecordList);
const ScaledJiraRecord = scaleSlide(JiraRecord);
const ScaledStandUp = scaleSlide(StandUp);
const ScaledCountDown = scaleSlide(CountDown);

class App extends Component {

  constructor(props) {
    super(props);
    this.changeSlide = this.changeSlide.bind(this);
    this.state = {
      slide: null
    };

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
        case 'countDown':
          slide = (<ScaledCountDown key={this.state.slide.id} slide={this.state.slide}/>);
          break;
        default:
          break;
      }
    }

    return (
      <div className="App">
        <ReactTransitions transition="fade-move-from-right" width={'100%'} height={'100%'}>
          {slide}
        </ReactTransitions>
      </div>
    );
  }

}

export default App;
