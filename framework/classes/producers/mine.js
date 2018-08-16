
const Producer = require('../producer');

/*
 * <---> # Mine class # <--->
 */

class Mine extends Producer {
  constructor(id, type, x, y) {
    super(id, "mine", x, y);
    this.subType = type;
  }

  yeild() {
    return this.level * 4;
  }
}

module.exports = Mine;
