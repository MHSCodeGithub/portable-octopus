
const Objectable = require('./objectable');

/*
 * <---> # Producer class # <--->
 */

class Producer extends Objectable {
  constructor(id, type, x, y) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.type = type;
    this.level = 1; // level of producer, determines effectiveness
    this.x = x;
    this.y = y;
  }

  upgrade() {
    this.level += 1;
  }
}

module.exports = Producer;
