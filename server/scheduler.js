const cron = require('node-schedule');
const JiraFilterListSlide = require('./jiraFilterListSlide');
const JiraRecordSlide = require('./jiraRecordSlide');
const StandUpSlide = require('./standUpSlide');

class Scheduler {

  constructor(emitCallback) {
    this.deck = [];
    this.currentSlide;
    this.emitCallback = emitCallback;
  }

  start() {
    this.nextSlide();

    // prepare scheduled slides
    cron.scheduleJob('0 0 10 * * 1-5', () => this.showSlide(new StandUpSlide()));
  }

  prepareDeck() {
    this.deck.push(new JiraFilterListSlide());
    this.deck.push(new JiraRecordSlide());
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