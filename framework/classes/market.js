
const Objectable = require('./objectable');

/*
 * <---> # Market class # <--->
 */

class Market extends Objectable {
  constructor() {
    super();
    this.commodities = []; // array container commodities of market
  }
}

module.exports = Market;
