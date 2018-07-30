
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Producer extends Objectable {
  constructor(id, owner) {
    super();
    this.id = id; // unique integer id (starts at 0)
  }
}

module.exports = Producer;
