
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Market extends Objectable {
  constructor() {
    super();
    this.commodities = []; // array container commodities of market
  }
}

module.exports = Harbour;
