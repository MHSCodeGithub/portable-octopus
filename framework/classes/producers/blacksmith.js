
const Producer = require('../producer');

/*
 * <---> # Blacksmith class # <--->
 */

class Blacksmith extends Producer {
  constructor(id, x, y) {
    super(id, "blacksmith", x, y);
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Blacksmith;
