
const Producer = require('../producer');

/*
 * <---> # Butchery class # <--->
 */

class Butchery extends Producer {
  constructor(id, x, y) {
    super(id, "butchery", x, y);
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Butchery;
