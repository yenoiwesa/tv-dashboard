
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
        slides: []
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