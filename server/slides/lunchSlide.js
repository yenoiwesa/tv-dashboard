const Slide = require('./slide');

class LunchSlide extends Slide {

  constructor() {
    super('lunch');
    this.duration = 30 * 60 * 1000;
  }

}

module.exports = LunchSlide;