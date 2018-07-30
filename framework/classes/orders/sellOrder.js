
const Objectable = require('./objectable');

/*
 * <---> # SellOrder class # <--->
 */

class SellOrder extends Objectable {
  constructor(id) {
    super();
    this.id = id; // unique integer id (starts at 0)
    // TODO: Add SellOrder functions
  }
}

module.exports = SellOrder;
