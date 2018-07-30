
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Treasury extends Objectable {
  constructor(id) {
    super();
    this.id = id;
    this.balance = 0;
    this.health = 1000;
    // TODO: Add Treasury functions
  }
}

module.exports = Treasury;
