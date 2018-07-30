
const Objectable = require('./objectable');

/*
 * <---> # Order class # <--->
 */

class Order extends Objectable {
  constructor(id) {
    super();
    this.id = id; // unique integer id (starts at 0)
    // TODO: Add order functions
  }
}

module.exports = Order;
