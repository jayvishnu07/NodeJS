const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(obj) {
        console.log(`your message is : ${obj}`);
        this.emit('emmitCalled',{data : 'Jaivishnu'})
    };
}
module.exports = Logger;