//Creating event emitter using common js
// const EventEmitter= require('events');
// const myFirstEmitter=new EventEmitter();

//Creating event emitter using module js
import { EventEmitter } from 'events';

// Step 1: create an emitter object
const emitter = new EventEmitter();

// emit: emits an event (send a signal with some data).
// on: listen for an event (run a function when it happens).

// Step 2: listen for an event
emitter.on('bellRing', (period) => {
  console.log(`The bell rang! It's time for ${period} period.`);
});

// Step 3: emit the event
console.log("Waiting for the bell...");
setTimeout(() => {
  emitter.emit('bellRing', 'Math');
}, 2000);
