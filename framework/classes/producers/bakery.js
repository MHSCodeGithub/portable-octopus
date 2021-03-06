
const Producer = require('../producer');

/*
 * <---> # Bakery class # <--->
 */

class Bakery extends Producer {
  constructor(id, x, y) {
    super(id, "bakery", x, y, "bread", 3);
    this.intake = "Flour";
  }

  yeild() {
    return this.level * 1;
  }
}

module.exports = Bakery;
