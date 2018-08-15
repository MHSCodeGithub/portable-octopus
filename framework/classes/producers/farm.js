
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, type) {
    super(id, "farm");
    this.growth = 0;
    this.subType = type;
  }

  yeild() {
    return this.level * 4;
  }
}

module.exports = Farm;
