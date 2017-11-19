'use strict';

 /**
 * Server Event
 * @module ServerEvent
 * @requires events
 * @yield Init an event emitter 
 */
 
let EventEmitter  = require('events').EventEmitter;
let ServerEvent	  = new EventEmitter();

module.exports = ServerEvent;