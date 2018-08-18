
const Objectable = require('./objectable');
const database = require('../../database');

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
    for (var i = 0; i < database.read().commodities.length; i++) {
      this.commodities.push({id: database.read().commodities[i].id, amount: 0});
    }
    // TODO: Add Harbour functions
  }

  addCommodity(commodity) {
    this.commodities.push(commodity);
  }
}

module.exports = Harbour;
