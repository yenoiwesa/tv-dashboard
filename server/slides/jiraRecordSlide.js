const Slide = require('./slide');

class JiraRecordSlide extends Slide {

    constructor(title, record) {
        super('jiraRecord');
        this.title = title;
        this.record = record;
        this.duration = 10 * 1000;
    }

    getData() {
        const data = super.getData();
        data.title = this.title;
        data.record = this.record;
        return data;
    }

}

module.exports = JiraRecordSlide;