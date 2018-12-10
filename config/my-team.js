// sample configuration overriding default ./server/config.js values
module.exports = {
    jira: {
        server: 'https://jira.objective.com',
        slides: [
            {
                title: 'In progress',
                type: 'list',
                jql: 'filter=23345'
            },
            {
                title: 'Bug tickets in backlog',
                type: 'list',
                jql: 'filter=22947'
            },
            {
                title: 'Recently created',
                type: 'single',
                jql: 'filter=23344'
            }
        ]
    },
    gitlab: {
        server: 'https://git.objective.com',
        projectId: 125
    }
};
