import { EventEmitter } from 'events'

// create a global event emitter (could be replaced by redis, etc)
let eventEmitter: EventEmitter

// @ts-ignore
if (!global.eventEmitter) {
  eventEmitter = new EventEmitter()
  // @ts-ignore
  global.eventEmitter = eventEmitter
} else {
  // @ts-ignore
  eventEmitter = global.eventEmitter
}

export { eventEmitter }
