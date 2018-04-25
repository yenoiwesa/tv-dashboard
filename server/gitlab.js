const request = require('request-promise');
const cron = require('node-schedule');
const colors = require('colors/safe');

class Gitlab {

    constructor(config) {
        this.config = config;
        this.mergeRequests = [];

        this.fetchMergeRequests().then(() => {
            this.job = cron.scheduleJob('0 */5 * * * 1-5', () => this.fetchMergeRequests());
        });
    }

    fetch(uri) {
        return request({
            uri: `${this.config.server}/api/v4/projects/${this.config.projectId}/${uri}`,
            json: true,
            headers: {
                'Private-Token': this.config.token
            }
        });
    }

    fetchMergeRequests() {
        return this
            .fetch('merge_requests?state=opened')
            .then(mergeRequests => Promise.all(mergeRequests.map(mr => this
                // retrieve associated pipelines
                .fetch(`merge_requests/${mr.iid}/pipelines`)
                // retrieve full latest pipeline details
                .then(pipelines => pipelines.length ? this.fetch(`pipelines/${pipelines[0].id}`) : undefined)
                .then(pipeline => {
                    const mergeRequest = this.mapMergeRequest(mr);
                    mergeRequest.pipeline = this.mapPipeline(pipeline);
                    return mergeRequest;
                })
            )))
            .then(mergeRequests => {
                this.mergeRequests = mergeRequests;
                console.info(`${colors.yellow.bold(' Gitlab')} - Merge Requests retrieved at ${new Date()}: ${mergeRequests.length} requests.`);
            });
    }

    mapMergeRequest(raw) {
        if (raw) {
            return {
                id: raw.id,
                title: raw.title,
                state: raw.state,
                created: raw.created_at,
                updated: raw.updated_at,
                targetBranch: raw.target_branch,
                sourceBranch: raw.source_branch,
                upvotes: raw.upvotes,
                notesCount: raw.user_notes_count,
                author: this.mapUser(raw.author),
                assignee: this.mapUser(raw.assignee),
                workInProgress: raw.work_in_progress,
                mergeStatus: raw.merge_status
            };
        }
    }

    mapUser(raw) {
        if (raw) {
            const user = {
                id: raw.id,
                name: raw.name,
                username: raw.username
            };
            // avatar can come from gitlab or be external (i.e. gravatar)
            if (raw.avatar_url.startsWith(this.config.server)) {
                user.avatarUrl = '/gitlab' + raw.avatar_url.substring(this.config.server.length);
            } else {
                user.avatarUrl = raw.avatar_url;
            }
    
            return user;
        }
    }

    mapPipeline(raw) {
        if (raw) {
            return {
                status: raw.status,
                duration: raw.duration,
                coverage: raw.coverage
            };
        }
    }

}

module.exports = Gitlab;