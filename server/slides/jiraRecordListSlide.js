const _ = require('lodash');
const Slide = require('./slide');

class JiraRecordListSlide extends Slide {

    constructor(title, records, page, totalPages) {
        super('jiraRecordList');
        this.title = title;
        this.records = records;
        this.page = page;
        this.totalPages = totalPages;
        this.duration = (_.size(this.records) * 3 + 6) * 1000;
    }

    isDisplayable() {
        return !_.isEmpty(this.records);
    }

    getData() {
        const data = super.getData();
        data.title = this.title;
        data.records = this.records;
        data.page = this.page;
        data.totalPages = this.totalPages;
        return data;
    }

}

module.exports = JiraRecordListSlide;