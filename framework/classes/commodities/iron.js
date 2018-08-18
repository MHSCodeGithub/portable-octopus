
const Commodity = require('../commodity');

/*
 * <---> # Iron class # <--->
 */

class Iron extends Commodity {
  constructor(id) {
    super(id, "iron", "mineral");
  }
}

module.exports = Iron;
