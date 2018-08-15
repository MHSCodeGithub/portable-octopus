
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, type, x, y) {
    super(id, "farm", x, y);
    this.growth = 0;
    this.subType = type;
  }

  yeild() {
    return this.level * 4;
  }
}

module.exports = Farm;
