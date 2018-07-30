
const Objectable = require('./objectable');

/*
 * <---> # Order class # <--->
 */

class Order extends Objectable {
  constructor(commodity, price, amount) {
    super();
    this.commodity = commodity;
    this.price = price;
    this.amount = amount;
    this.fulfilment = 0;
    // TODO: Add order functions
  }
}

module.exports = Order;
