
const Objectable = require('./objectable');

/*
 * <---> # SellOrder class # <--->
 */

class SellOrder extends Objectable {
  constructor(id, commodity, price, amount, creatorName) {
    super(commodity, price, amount, creatorName);
    this.id = id; // unique integer id (starts at 0)
    this.type = "sell";
    // TODO: Add BuyOrder functions
  }
}

module.exports = SellOrder;
