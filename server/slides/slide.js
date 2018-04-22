function* idMaker() {
    let index = 0;
    while (true) {
        yield index++;
    }
}
const idGenerator = idMaker();

class Slide {

    constructor(type) {
        this.type = type;
        this.id = idGenerator.next();
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