
const Producer = require('../producer');

/*
 * <---> # CottonMill class # <--->
 */

class CottonMill extends Producer {
  constructor(id) {
    super(id, "cotton_mill");
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = CottonMill;
