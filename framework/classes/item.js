
const Objectable = require('./objectable');

/*
 * <---> # Item class # <--->
 */

class Item extends Objectable {
  constructor(id, name, image, description, price) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.name = name;
    this.image = image;
    this.decription = description;
    this.price = price;
  }
}

module.exports = Item;
