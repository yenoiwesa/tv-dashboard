const Slide = require('./slide');

class JiraRecordSlide extends Slide {

  constructor(title, record) {
    super('jiraRecord');
    this.title = title;
    this.record = record;
    this.duration = 20*1000;
  }

  getData() {
    let data = super.getData();
    data.title = this.title;
    data.record = this.record;
    return data;
  }

}

module.exports = JiraRecordSlide;