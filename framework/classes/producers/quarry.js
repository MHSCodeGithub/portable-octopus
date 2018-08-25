
const Producer = require('../producer');

/*
 * <---> # Quarry class # <--->
 */

class Quarry extends Producer {
  constructor(id, x, y) {
    super(id, "quarry", x, y, "stone", 1);
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = Quarry;
