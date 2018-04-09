const Slide = require('./slide');

class StandUpSlide extends Slide {

  constructor() {
    super('standUp');
    this.duration = 5 * 60 * 1000;
  }

}

module.exports = StandUpSlide;