
const Objectable = require('./objectable');

/*
 * <---> # Order class # <--->
 */

class Order extends Objectable {
  constructor(commodity, price, amount, creatorName) {
    super();
    this.commodity = commodity;
    this.price = price;
    this.amount = amount;
    this.fulfilment = 0;
    this.creator = creatorName;
    // TODO: Add order functions
  }
}

module.exports = Order;
