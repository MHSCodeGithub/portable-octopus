
const Producer = require('../producer');

/*
 * <---> # House class # <--->
 */

class House extends Producer {
  constructor(id, x, y, citizens) {
    super(id, "house", x, y, "citizens", 1);
    this.citizens = citizens;
  }

  yeild() {
    return this.level * 5;
  }
}

module.exports = House;
