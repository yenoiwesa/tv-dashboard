module.exports = {
    jira: {
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
    // gitlab: {
    //     projectId: 125
    // }
    gitlab: null
};