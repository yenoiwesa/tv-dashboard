import openSocket from 'socket.io-client';

const location = window.location;
const socket = openSocket(`${location.protocol}//${location.hostname}:8001`);

function subscribeToSlideChange(callback) {
    socket.on('next-slide', callback);
}

function unsubscribeToSlideChange(callback) {
    socket.removeListener('next-slide', callback);
}

export default { subscribeToSlideChange, unsubscribeToSlideChange };