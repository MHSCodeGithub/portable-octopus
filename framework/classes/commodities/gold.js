
const Commodity = require('../commodity');

/*
 * <---> # Gold class # <--->
 */

class Gold extends Commodity {
  constructor(id) {
    super(id, "gold", "mineral");
  }
}

module.exports = Gold;
