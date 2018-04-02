const io = require('socket.io')();

const slides = ['jiraFilterList', 'standUp'];
let currentSlideIndex = 0;

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
}

function buildEvent() {
  return { slide: slides[currentSlideIndex] };
}

io.on('connection', (client) => {
  console.log('client has connected');
  // synchronise straight away
  client.emit('next-slide', buildEvent())
});

module.exports.run = function (port) {
    io.listen(port);
    console.log(`static server listening on port ${port}`);

    setInterval(() => {
      nextSlide();
      io.sockets.emit('next-slide', buildEvent())
    }, 10000);
};
