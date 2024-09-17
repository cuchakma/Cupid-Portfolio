const logger = require('./eventEmitterModule');
const EventsEmitter = require('events');

class CustomEmitter extends EventsEmitter{}

const emitter = new CustomEmitter();

emitter.on('log', (msg) => {
    logger(msg);
})

setTimeout(() => {
    emitter.emit('log', 'Log event emitted');
}, 2000);