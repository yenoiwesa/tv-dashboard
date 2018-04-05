class Slide {

  constructor(id) {
    this.id = id;
    // default duration
    this.duration = 10000;
    this.timeoutId;
  }

  isDisplayable() {
    return true;
  }

  display(endCallback) {
    this.timeoutId = setTimeout(endCallback, this.duration);
  }

  getData() {
    return {
      slide: this.id
    };
  }

  stop() {
    clearTimeout(this.timeoutId);
  }

}

module.exports = Slide;