
const Commodity = require('../commodity');

/*
 * <---> # IronSword class # <--->
 */

class IronSword extends Commodity {
  constructor(id) {
    super(id, "iron_sword", "tool");
  }
}

module.exports = IronSword;
