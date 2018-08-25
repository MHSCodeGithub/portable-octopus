
const Producer = require('../producer');

/*
 * <---> # House class # <--->
 */

class House extends Producer {
  constructor(id, x, y) {
    super(id, "house", x, y, "citizens", 1);
  }

  yeild() {
    return this.level * 5;
  }
}

module.exports = House;
