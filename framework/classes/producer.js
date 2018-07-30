
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Producer extends Objectable {
  constructor(id, kingdom) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.kingdom = kingdom; // owning kingdom of producer
  }
}

module.exports = Producer;
