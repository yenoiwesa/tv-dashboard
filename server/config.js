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
        server: null,
        slides: []
    },
    gitlab: {
        token: null,
        projectId: null,
        server: null
    },
    transition: 'move-to-top-move-from-bottom',
    standUp: {
        time: '10:00',
        sound: true
    },
    lunch: {
        schedule: '0 0 12 * * 1-5'
    }
};
