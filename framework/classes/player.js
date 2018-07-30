
const sha256 = require('sha256');
const Objectable = require('./objectable');

/*
 * <---> # Player class # <--->
 */

class Player extends Objectable {
  constructor(id, username, password, connect) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.username = username; // string username
    if(connect) { this.password = password; }
    else        { this.password = sha256(password); } // string sha256 hashed password
    this.islands = [];
    // TODO: Add player functions
  }
}

module.exports = Player;
