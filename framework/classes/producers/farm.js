
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, kingdom) {
    super(id, kingdom);
    this.type = "farm";
    this.growth = [[],[],[],[],[]];
    this.yeild = Math.floor(Math.pow(this.level, 2) + (Math.pow(this.level, 2) / 3));
    // TODO: Add Treasury functions
  }
}

module.exports = Farm;
