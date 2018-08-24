
const Producer = require('../producer');

/*
 * <---> # CottonMill class # <--->
 */

class CottonMill extends Producer {
  constructor(id, x, y) {
    super(id, "cotton_mill", x, y, "cotton", 2);
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = CottonMill;
