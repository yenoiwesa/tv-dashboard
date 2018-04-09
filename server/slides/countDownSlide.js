const Slide = require('./slide');
const moment = require('moment');

class CountDownSlide extends Slide {

  constructor(date, event) {
    super('countDown');
    this.date = date;
    this.event = event;
  }

  isDisplayable() {
    // only displayable 3 hours before event
    return moment().isSameOrAfter(moment(this.date).subtract(3, 'hours'));
  }

  getData() {
    let data = super.getData();
    data.date = this.date;
    data.event = this.event;
    return data;
  }

}

module.exports = CountDownSlide;