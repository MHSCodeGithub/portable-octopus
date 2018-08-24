
const Producer = require('../producer');

/*
 * <---> # Winery class # <--->
 */

class Winery extends Producer {
  constructor(id, x, y) {
    super(id, "winery", x, y, "wine");
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Winery;
