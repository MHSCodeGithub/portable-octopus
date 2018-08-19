
const Objectable = require('./objectable');

/*
 * <---> # SellOrder class # <--->
 */

class BuyOrder extends Objectable {
  constructor(id, commodity, price, amount, creatorName) {
    super(commodity, price, amount, creatorName);
    this.id = id; // unique integer id (starts at 0)
    this.type = "buy";
    this.creator = creatorName;
    // TODO: Add BuyOrder functions
  }
}

module.exports = BuyOrder;
