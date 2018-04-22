const _ = require('lodash');
const cron = require('node-schedule');
const Jira = require('./jira');
const JiraRecordListSlide = require('./slides/jiraRecordListSlide');
const JiraRecordSlide = require('./slides/jiraRecordSlide');
const StandUpSlide = require('./slides/standUpSlide');
const LunchSlide = require('./slides/lunchSlide');
const CountDownSlide = require('./slides/countDownSlide');

const RECENTLY_OPENED_FILTER_ID = 23344;
const BUG_TRACKER_FILTER_ID = 22947;
const IN_PROGRESS_FILTER_ID = 23345;
const FILTERS = [RECENTLY_OPENED_FILTER_ID, BUG_TRACKER_FILTER_ID, IN_PROGRESS_FILTER_ID];

class Scheduler {

    constructor(emitCallback) {
        this.deck = [];
        this.currentSlide;
        this.emitCallback = emitCallback;
    }

    start() {
    // prepare scheduled slides
        this.standUpJob = cron.scheduleJob('0 0 10 * * 1-5', () => this.showSlide(new StandUpSlide()));
        this.standUpFinalCountdown = cron.scheduleJob('0 55 9 * * 1-5', () =>
            this.showSlide(new CountDownSlide(new Date(this.standUpJob.nextInvocation()), 'standUp', 10 * 60 * 1000))
        );

        this.lunchJob = cron.scheduleJob('0 0 12 * * 1-5', () => this.showSlide(new LunchSlide()));

        // start the jira backend
        this.jira = new Jira(FILTERS);
    
        this.nextSlide();
    }

    prepareDeck() {
    // countdown to stand up
        this.deck.push(new CountDownSlide(new Date(this.standUpJob.nextInvocation()), 'standUp'));

        // records in progress
        this.deck.push(new JiraRecordListSlide('In progress', this.jira.filters[IN_PROGRESS_FILTER_ID]));

        // records in backlog
        this.deck.push(new JiraRecordListSlide('Bug tickets in backlog', this.jira.filters[BUG_TRACKER_FILTER_ID]));
    
        // recently opened records
        const recentRecords = this.jira.filters[RECENTLY_OPENED_FILTER_ID];
        if (recentRecords) {
            for (const record of recentRecords) {
                this.deck.push(new JiraRecordSlide('Recently created', record));
            }
        }
    }

    nextSlide() {
        const slide = this.deck.shift();

        // if no slide to display, prepare a new deck and call next
        if (!slide) {
            this.prepareDeck();

            // if after preparing the deck there is no displayable slide
            if (!_.some(this.deck, slide => slide.isDisplayable())) {
                // re prepare deck in 5 seconds
                setTimeout(() => this.nextSlide(), 5000);
            } else {
                // otherwise directly go to next slide
                this.nextSlide();
            }
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
        if (this.currentSlide) {
            emitCallback(this.currentSlide.getData());
        }
    }

}

module.exports = Scheduler;