
const Commodity = require('../commodity');

/*
 * <---> # Beer class # <--->
 */

class Beer extends Commodity {
  constructor(id) {
    super(id, "beer", "food");
  }
}

module.exports = Beer;
