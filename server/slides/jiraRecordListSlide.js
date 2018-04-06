const Slide = require('./slide');

class JiraRecordListSlide extends Slide {

  constructor(records) {
    super('jiraRecordList');
    this.records = records;
  }

  isDisplayable() {
    return this.records && this.records.length;
  }

  getData() {
    let data = super.getData();
    data.records = this.records;
    return data;
  }

}

module.exports = JiraRecordListSlide;