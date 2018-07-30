
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, kingdom) {
    super(id, kingdom, "farm");
    this.growth = [[],[],[],[],[]];
    this.yield = Math.floor(Math.pow(this.level, 2) + (Math.pow(this.level, 2) / 3));
    // TODO: Add Treasury functions
  }
}

module.exports = Farm;
