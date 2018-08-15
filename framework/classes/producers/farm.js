
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, type) {
    super(id, "farm");
    this.growth = 0;
    this.subType = type;
    this.yield = Math.floor(Math.pow(this.level, 2) + (Math.pow(this.level, 2) / 3));
  }
}

module.exports = Farm;
