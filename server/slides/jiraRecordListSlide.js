const Slide = require('./slide');

class JiraRecordListSlide extends Slide {

  constructor(title, records) {
    super('jiraRecordList');
    this.title = title;
    this.records = records;
    this.duration = 30000;
  }

  isDisplayable() {
    return this.records && this.records.length;
  }

  getData() {
    let data = super.getData();
    data.title = this.title;
    data.records = this.records;
    return data;
  }

}

module.exports = JiraRecordListSlide;