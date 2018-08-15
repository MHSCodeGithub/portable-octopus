
const Producer = require('../producer');

/*
 * <---> # Bakery class # <--->
 */

class Bakery extends Producer {
  constructor(id) {
    super(id, "bakery");
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Bakery;
