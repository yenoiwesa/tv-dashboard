class Slide {

  constructor(type) {
    this.type = type;
    this.id = (new Date).getTime();
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
      id: this.id,
      type: this.type
    };
  }

  stop() {
    clearTimeout(this.timeoutId);
  }

}

module.exports = Slide;