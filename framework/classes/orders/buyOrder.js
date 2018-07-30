
const Objectable = require('./objectable');

/*
 * <---> # SellOrder class # <--->
 */

class BuyOrder extends Objectable {
  constructor(id) {
    super();
    this.id = id; // unique integer id (starts at 0)
    // TODO: Add BuyOrder functions
  }
}

module.exports = BuyOrder;
