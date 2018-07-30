
const sha256 = require('sha256');
const Objectable = require('./objectable');

/*
 * <---> # Player class # <--->
 */

class Player extends Objectable {
  constructor(id, username, password) {
    this.id = id; // unique integer id (starts at 0)
    this.username = username; // string username
    this.password = sha256(password); // string sha256 hashed password
  }
}

module.exports = Producer;
