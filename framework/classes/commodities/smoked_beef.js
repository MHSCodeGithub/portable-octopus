
const Commodity = require('../commodity');

/*
 * <---> # SmokedBeef class # <--->
 */

class SmokedBeef extends Commodity {
  constructor(id) {
    super(id, "smoked_beef", "food");
  }
}

module.exports = SmokedBeef;
