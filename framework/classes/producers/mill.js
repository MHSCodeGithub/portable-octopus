
const Producer = require('../producer');

/*
 * <---> # Mill class # <--->
 */

class Mill extends Producer {
  constructor(id, x, y) {
    super(id, "mill", x, y, "flour");
  }

  yeild() {
    return this.level * 2;
  }
}

module.exports = Mill;
