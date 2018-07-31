
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Producer extends Objectable {
  constructor(id, type) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.type = type;
    this.level = 0; // level of producer, determines effectiveness
  }

  upgrade() {
    this.level += 1;
  }
}

module.exports = Producer;
