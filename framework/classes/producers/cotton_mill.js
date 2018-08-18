
const Producer = require('../producer');

/*
 * <---> # CottonMill class # <--->
 */

class CottonMill extends Producer {
  constructor(id, x, y) {
    super(id, "cotton_mill", x, y, "cotton_mill");
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = CottonMill;
