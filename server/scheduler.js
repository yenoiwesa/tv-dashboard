const cron = require('node-schedule');
const Jira = require('./jira');
const JiraRecordListSlide = require('./slides/jiraRecordListSlide');
const JiraRecordSlide = require('./slides/jiraRecordSlide');
const StandUpSlide = require('./slides/standUpSlide');
const CountDownSlide = require('./slides/countDownSlide');

const BUG_TRACKER_FILTER_ID = 22947;

class Scheduler {

  constructor(emitCallback) {
    this.deck = [];
    this.currentSlide;
    this.emitCallback = emitCallback;
  }

  start() {
    // prepare scheduled slides
    this.standUpJob = cron.scheduleJob('0 0 10 * * 1-5', () => this.showSlide(new StandUpSlide()));
    this.lunchJob = cron.scheduleJob('0 0 12 * * 1-5', () => this.showSlide(new StandUpSlide()));

    // start the jira backend
    this.jira = new Jira([BUG_TRACKER_FILTER_ID]);
    
    this.nextSlide();
  }

  prepareDeck() {
    this.deck.push(new JiraRecordListSlide(this.jira.filters[BUG_TRACKER_FILTER_ID]));
    this.deck.push(new JiraRecordSlide());
    // countdown to stand up
    this.deck.push(new CountDownSlide(this.standUpJob.nextInvocation(), 'standUp'));
    // countdown to stand up
    this.deck.push(new CountDownSlide(this.lunchJob.nextInvocation(), 'lunch'));
  }

  nextSlide() {
    const slide = this.deck.shift();

    // if no slide to display, prepare a new deck and call next
    if (!slide) {
      this.prepareDeck();
      this.nextSlide();
      return;
    }

    // check whether the slide is displayable
    if (!slide.isDisplayable()) {
      this.nextSlide();
      return;
    }

    this.showSlide(slide);
  }

  showSlide(slide) {
    // if there is an existing slide, stop it
    if (this.currentSlide) {
      this.currentSlide.stop();
    }

    this.currentSlide = slide;
    this.currentSlide.display(() => this.nextSlide());
    this.emitCallback(this.currentSlide.getData());
  }

  syncClient(emitCallback) {
    emitCallback(this.currentSlide.getData());
  }

}

module.exports = Scheduler;