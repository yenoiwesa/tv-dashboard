const Slide = require('./slide');

class CountDownSlide extends Slide {

  constructor(date, event) {
    super('countDown');
    this.date = date;
    this.event = event;
  }

  getData() {
    let data = super.getData();
    data.date = this.date;
    data.event = this.event;
    return data;
  }

}

module.exports = CountDownSlide;