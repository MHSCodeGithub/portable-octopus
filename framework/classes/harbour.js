
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Harbour extends Objectable {
  constructor(id, x, y) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = 600;
    // TODO: Add Harbour functions
  }
}

module.exports = Harbour;
