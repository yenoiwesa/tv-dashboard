const Slide = require('./slide');
const moment = require('moment');

class CountDownSlide extends Slide {

    constructor(date, event, duration = 10 * 1000) {
        super('countDown');
        this.date = date;
        this.event = event;
        this.duration = duration;
    }

    isDisplayable() {
    // only displayable 3 hours before event
        return moment().isSameOrAfter(moment(this.date).subtract(3, 'hours'));
    }

    getData() {
        const data = super.getData();
        data.date = this.date;
        data.event = this.event;
        return data;
    }

}

module.exports = CountDownSlide;