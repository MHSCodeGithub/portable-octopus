
const Producer = require('../producer');

/*
 * <---> # Mill class # <--->
 */

class Mill extends Producer {
  constructor(id, x, y) {
    super(id, "mill", x, y);
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = Mill;
