const cron = require('node-schedule');
const request = require('request-promise');

class Jira {

  constructor(filterIds) {
    this.filterIds = filterIds;
    this.filters = {};

    this.fetchRecords().then(() => {
      this.job = cron.scheduleJob('0 0/15 * * * 1-5', () => this.fetchRecords());
    });
  }

  fetchRecords() {
    const promises = this.filterIds.map(filterId => {
      request({
        uri: `https://jira.objective.com/rest/api/2/search?jql=filter=${filterId}`,
        json: true,
        auth: {
          user: 'matthieu',
          pass: 'Objective03?'
        }
      }).then(data => this.filters[filterId] = data.issues.map(Jira.mapRecord));
    });

    return Promise.all(promises);
  }

  static mapRecord(raw) {
    return {
      key: raw.key,
      summary: raw.fields.summary,
      assignee: Jira.mapUser(raw.fields.assignee),
      priority: Jira.mapPriority(raw.fields.priority),
      status: Jira.mapStatus(raw.fields.status)
    };
  }

  static mapUser(raw) {
    if (raw) {
      return {
        name: raw.displayName,
        emailAddress: raw.emailAddress,
        avatarUrl: raw.avatarUrls['48x48']
      };
    }
  }

  static mapPriority(raw) {
    if (raw) {
      return {
        id: raw.id,
        name: raw.name
      };
    }
  }

  static mapStatus(raw) {
    if (raw) {
      return {
        name: raw.name,
        id: raw.id,
        key: raw.statusCategory.key
      };
    }
  }

}

module.exports = Jira;