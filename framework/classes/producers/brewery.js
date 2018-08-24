
const Producer = require('../producer');

/*
 * <---> # Brewery class # <--->
 */

class Brewery extends Producer {
  constructor(id, x, y) {
    super(id, "brewery", x, y, "beer", 2);
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Brewery;
