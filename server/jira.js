const cron = require('node-schedule');
const _ = require('lodash');
const request = require('request-promise');
const colors = require('colors/safe');

const SPRINT_REGEX = /state=(CLOSED|ACTIVE|FUTURE),.*?name=(.*?),/;

class Jira {

    constructor(config) {
        this.config = config;
        this.filters = {};

        this.fetchRecords().then(() => {
            this.job = cron.scheduleJob('0 */5 * * * 1-5', () => this.fetchRecords());
        });
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

        const promises = this.config.slides.map(slide => {
            request({
                uri: `${this.config.server}/rest/api/2/search?jql=${slide.jql}&${fields}`,
                json: true,
                auth: {
                    user: this.config.user,
                    pass: this.config.password
                }
            }).then(data => {
                const records = data.issues.map(issue => this.mapRecord(issue));
                this.filters[slide.jql] = records;
                console.info(`${colors.cyan.bold(' Jira')} - Filter ${slide.jql} data retrieved at ${new Date()}: ${records.length} records.`);
            });
        });

        return Promise.all(promises);
    }

    mapRecord(raw) {
        return {
            key: raw.key,
            type: this.mapType(raw.fields.issuetype),
            summary: raw.fields.summary,
            assignee: this.mapUser(raw.fields.assignee),
            priority: this.mapPriority(raw.fields.priority),
            status: this.mapStatus(raw.fields.status),
            created: raw.fields.created,
            creator: this.mapUser(raw.fields.creator),
            sprint: this.mapSprint(raw.fields.customfield_11611)
        };
    }

    mapType(raw) {
        if (raw) {
            return {
                id: raw.id,
                name: raw.name
            };
        }
    }

    mapUser(raw) {
        if (raw) {
            return {
                name: raw.displayName,
                shortName: raw.displayName.split(' ')[0],
                emailAddress: raw.emailAddress,
                avatarUrl: '/jira' + raw.avatarUrls['48x48'].substring(this.config.server.length)
            };
        }
    }

    mapPriority(raw) {
        if (raw) {
            return {
                id: raw.id,
                name: raw.name
            };
        }
    }

    mapStatus(raw) {
        if (raw) {
            return {
                name: raw.name,
                id: raw.id,
                key: raw.statusCategory.key
            };
        }
    }

    mapSprint(raw) {
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