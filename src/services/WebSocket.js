import openSocket from 'socket.io-client';
import Config from './Config';

const socketPromise = Config
    .promise
    .then(config => {
        const location = window.location;
        return openSocket(`${location.protocol}//${location.hostname}:${config.server.port.websocket}`);
    });

function subscribeToSlideChange(callback) {
    socketPromise.then(socket => socket.on('next-slide', callback));
}

function unsubscribeToSlideChange(callback) {
    socketPromise.then(socket => socket.removeListener('next-slide', callback));
}

export default { subscribeToSlideChange, unsubscribeToSlideChange };