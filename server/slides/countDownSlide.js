const Slide = require('./slide');
const moment = require('moment');

class CountDownSlide extends Slide {

    constructor(date, event, sound = false, duration = 10 * 1000) {
        super('countDown');
        this.date = date;
        this.event = event;
        this.sound = sound;
        this.duration = duration;
    }

    isDisplayable() {
        // only displayable 12 hours before event
        return moment().isSameOrAfter(moment(this.date).subtract(12, 'hours'));
    }

    getData() {
        const data = super.getData();
        data.date = this.date;
        data.event = this.event;
        data.sound = this.sound;
        return data;
    }

}

module.exports = CountDownSlide;