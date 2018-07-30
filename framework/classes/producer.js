
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Producer extends Objectable {
  constructor(id, owner, kingdom) {
    this.id = id; // unique integer id (starts at 0)
    this.owner = owner; // player class
    this.kingdom = kingdom; // kingdom class
  }
}

module.exports = Producer;
