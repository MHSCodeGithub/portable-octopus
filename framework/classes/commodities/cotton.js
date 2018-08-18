
const Commodity = require('../commodity');

/*
 * <---> # Cotton class # <--->
 */

class Cotton extends Commodity {
  constructor(id) {
    super(id, "cotton", "textile");
  }
}

module.exports = Cotton;
