
const Producer = require('../producer');

/*
 * <---> # Blacksmith class # <--->
 */

class Blacksmith extends Producer {
  constructor(id, x, y) {
    super(id, "blacksmith", x, y, "iron_sword", 2);
    this.intake = "Iron";
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Blacksmith;
