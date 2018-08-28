
const Producer = require('../producer');

/*
 * <---> # Mine class # <--->
 */

class Mine extends Producer {
  constructor(id, type, x, y) {
    super(id, "mine", x, y, type, 1);
    this.subType = type;
    this.intake = "None";
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = Mine;
