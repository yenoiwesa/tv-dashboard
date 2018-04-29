const Slide = require('./slide');

class StandUpSlide extends Slide {

    constructor(sound = false) {
        super('standUp');
        this.duration = 10 * 60 * 1000;
        this.sound = sound;
    }

    getData() {
        const data = super.getData();
        data.sound = this.sound;
        return data;
    }

}

module.exports = StandUpSlide;