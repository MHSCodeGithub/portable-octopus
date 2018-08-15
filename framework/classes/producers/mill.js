
const Producer = require('../producer');

/*
 * <---> # Mill class # <--->
 */

class Mill extends Producer {
  constructor(id) {
    super(id, "mill");
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = Mill;
