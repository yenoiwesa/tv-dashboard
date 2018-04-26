const _ = require('lodash');
const cron = require('node-schedule');
const Config = require('./config');
const Jira = require('./jira');
const Gitlab = require('./gitlab');
const JiraRecordListSlide = require('./slides/jiraRecordListSlide');
const JiraRecordSlide = require('./slides/jiraRecordSlide');
const StandUpSlide = require('./slides/standUpSlide');
const LunchSlide = require('./slides/lunchSlide');
const CountDownSlide = require('./slides/countDownSlide');
const GitlabMergeRequestsSlide = require('./slides/gitlabMergeRequestsSlide');

const MAX_TIMEOUT = 2147483647;
const RECORDS_PER_PAGE = 6;

class Scheduler {

    constructor(emitCallback) {
        this.deck = [];
        this.deckPreparator = [];
        this.currentSlide;
        this.emitCallback = emitCallback;
    }

    start() {
        this.setupStandUp(Config.standUp);
        this.setupLunch(Config.lunch);
        this.setupJira(Config.jira);
        this.setupGitlab(Config.gitlab);
    
        this.nextSlide();
    }

    setupStandUp(config) {
        if (!config) { return; }

        const standUp = cron.scheduleJob(config.schedule, () => this.showSlide(new StandUpSlide()));
        
        cron.scheduleJob(config.continuousCountdownFrom, () =>
            this.showSlide(new CountDownSlide(new Date(standUp.nextInvocation()), 'standUp', MAX_TIMEOUT))
        );

        // countdown to stand up
        this.deckPreparator.push(deck => {
            deck.push(new CountDownSlide(new Date(standUp.nextInvocation()), 'standUp'));
        });
    }

    setupLunch(config) {
        if (!config) { return; }

        cron.scheduleJob(config.schedule, () => this.showSlide(new LunchSlide()));
    }

    setupJira(config) {
        if (!config) { return; }

        // start the jira backend
        const jira = new Jira(config);

        // setup slides
        for (const slide of config.slides) {
            this.deckPreparator.push(deck => {
                const records = jira.filters[slide.jql];
                if (!_.size(records)) { return; }

                // record list
                if (slide.type === 'list') {
                    const nbPages = Math.ceil(records.length / RECORDS_PER_PAGE);
                    for (let page = 0; page < nbPages; page++) {
                        const pageRecords = records.slice(page * RECORDS_PER_PAGE, (page + 1) * RECORDS_PER_PAGE);

                        deck.push(new JiraRecordListSlide(slide.title, pageRecords, page + 1, nbPages));
                    }

                }
                // single records
                else {
                    for (const record of records) {
                        deck.push(new JiraRecordSlide(slide.title, record));
                    }
                }
            });
        }
    }

    setupGitlab(config) {
        if (!config) { return; }

        // start the gitlab backend
        const gitlab = new Gitlab(config);

        // merge requests
        this.deckPreparator.push(deck => {
            deck.push(new GitlabMergeRequestsSlide(gitlab.mergeRequests));
        });
    }

    prepareDeck() {
        for (const preparator of this.deckPreparator) {
            preparator(this.deck);
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