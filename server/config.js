
module.exports = {
    server: {
        port: {
            web: 8000,
            websocket: 8001
        }
    },
    jira: {
        user: null,
        password: null,
        server: 'https://jira.objective.com',
        slides: []
    },
    gitlab: {
        token: null,
        projectId: null,
        server: 'https://git.objective.com'
    },
    transition: 'move-to-top-move-from-bottom',
    standUp: {
        schedule: '0 0 10 * * 1-5',
        continuousCountdownFrom: '0 55 9 * * 1-5'
    },
    lunch: {
        schedule: '0 0 12 * * 1-5'
    }
};