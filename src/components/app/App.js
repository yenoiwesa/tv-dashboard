import React, { Component } from 'react';
import scaled from '../scaled/scaled';
import JiraFilterList from '../jiraFilterList/JiraFilterList';
import StandUp from '../standUp/StandUp';
import WebSocket from '../../services/WebSocket';
import ReactTransitions from 'react-transitions';
import './App.css';
import 'react-transitions/dist/animations.css';

const ScaledJiraFilterList = scaled(JiraFilterList);
const ScaledStandUp = scaled(StandUp);

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
    this.setState({ slide: event.slide });
  }

  componentWillUnmount() {
    WebSocket.unsubscribeToSlideChange(this.changeSlide);
  }

  render() {
    let slide;
    switch (this.state.slide) {
      case 'jiraFilterList':
        slide = (<ScaledJiraFilterList key={this.state.slide}/>)
        break;
      case 'standUp':
        slide = (<ScaledStandUp key={this.state.slide}/>)
        break;
      default:
        break;
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
