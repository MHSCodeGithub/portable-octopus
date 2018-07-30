
const Objectable = require('./objectable');

/*
 * <---> # Kingdom class # <--->
 */

class Kingdom extends Objectable {
  constructor(id, name, treasury, harbour) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.name = name; // string name
    this.treasury = treasury; // treasury owned by kingdom
    this.producers = []; // array of producers
    this.harbour = harbour; // harbour that connects kingdom to market
  }

  public getID()        { return this.id;        }
  public getName()      { return this.name;      }
  public getHarbour()   { return this.harbour;   }
  public getTreasury()  { return this.treasury;  }
  public getProducers() { return this.producers; }

}

module.exports = Kingdom;
