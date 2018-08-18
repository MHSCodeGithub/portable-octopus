
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Harbour extends Objectable {
  constructor(id, x, y) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = 600;
    this.commodities = [];
    // TODO: Add Harbour functions
  }

  addCommodity(commodity) {
    this.commodities.push(commodity);
  }
}

module.exports = Harbour;
