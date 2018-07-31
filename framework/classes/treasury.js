
const Objectable = require('./objectable');

/*
 * <---> # Treasury class # <--->
 */

class Treasury extends Objectable {
  constructor(id) {
    super();
    this.id = id;
    this.balance = 0;
    this.health = 1000;
  }

  effectBalance(amount) {
    this.balance += amount;
  }

  damage(amount) {
    if(this.health - amount < 0) { this.health = 0;       }
    else                         { this.health -= amount; }
  }

  repair(amount) {
    if(this.health + amount < 1000) { this.health = 1000;    }
    else                            { this.health -= amount; }
  }

}

module.exports = Treasury;
