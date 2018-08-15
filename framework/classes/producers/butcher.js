
const Producer = require('../producer');

/*
 * <---> # Butcher class # <--->
 */

class Butcher extends Producer {
  constructor(id, x, y) {
    super(id, "butcher", x, y);
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Butcher;
