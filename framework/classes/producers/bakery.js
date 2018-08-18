
const Producer = require('../producer');

/*
 * <---> # Bakery class # <--->
 */

class Bakery extends Producer {
  constructor(id, x, y) {
    super(id, "bakery", x, y, "bread");
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Bakery;
