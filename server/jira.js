const cron = require('node-schedule');
const _ = require('lodash');
const request = require('request-promise');

const JIRA_SERVER = 'https://jira.objective.com';
const SPRINT_REGEX = /state=(CLOSED|ACTIVE|FUTURE),.*?name=(.*?),/;

class Jira {

  constructor(filterIds) {
    this.filterIds = filterIds;
    this.filters = {};

    this.fetchRecords().then(() => {
      this.job = cron.scheduleJob('0 0/15 * * * 1-5', () => this.fetchRecords());
    });
  }

  static get JIRA_SERVER() {
    return JIRA_SERVER;
  }

  fetchRecords() {
    const fields = [
      'issuetype',
      'summary',
      'priority',
      'created',
      'creator',
      'assignee',
      'status',
      'customfield_11611',
      'customfield_11612'
    ].map(field => `fields=${field}`).join('&');

    const promises = this.filterIds.map(filterId => {
      request({
        uri: `${JIRA_SERVER}/rest/api/2/search?jql=filter=${filterId}&${fields}`,
        json: true,
        auth: {
          user: 'matthieu',
          pass: 'Objective03?'
        }
      }).then(data => {
        this.filters[filterId] = data.issues.map(Jira.mapRecord);
        console.info(`Filter ${filterId} data retrieved.`);
      });
    });

    return Promise.all(promises);
  }

  static mapRecord(raw) {
    return {
      key: raw.key,
      type: Jira.mapType(raw.fields.issuetype),
      summary: raw.fields.summary,
      assignee: Jira.mapUser(raw.fields.assignee),
      priority: Jira.mapPriority(raw.fields.priority),
      status: Jira.mapStatus(raw.fields.status),
      created: raw.fields.created,
      creator: Jira.mapUser(raw.fields.creator),
      sprint: Jira.mapSprint(raw.fields.customfield_11611)
    };
  }

  static mapType(raw) {
    if (raw) {
      return {
        id: raw.id,
        name: raw.name
      }
    }
  }

  static mapUser(raw) {
    if (raw) {
      return {
        name: raw.displayName,
        shortName: raw.displayName.split(' ')[0],
        emailAddress: raw.emailAddress,
        avatarUrl: '/jira' + raw.avatarUrls['48x48'].substring(JIRA_SERVER.length)
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

  static mapSprint(raw) {
    if (raw) {
      const sprints = raw.map(rawSprint => {
        const matches = SPRINT_REGEX.exec(rawSprint);
        return { name: matches[2], state: matches[1].toLowerCase() };
      });

      return _.find(sprints, sprint => sprint.state !== 'closed');
    }
  }

}

module.exports = Jira;