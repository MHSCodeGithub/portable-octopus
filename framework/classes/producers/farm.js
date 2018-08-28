
const Producer = require('../producer');

/*
 * <---> # Farm class # <--->
 */

class Farm extends Producer {
  constructor(id, type, x, y) {
    if(type == "cattle") { super(id, "farm", x, y, "beef", 1); }
    else                 { super(id, "farm", x, y, type, 1);   }
    this.subType = type;
    this.intake = "None";
  }

  yeild() {
    return this.level * 3;
  }
}

module.exports = Farm;
