
const sha256 = require('sha256');
const Objectable = require('./objectable');
const database = require('../../database');

function objectLength(target) {
  var i = 0;
  for (property in target) {
    i++;
  }
  return Number(i);
};

/*
 * <---> # Player class # <--->
 */

class Player extends Objectable {
  constructor(id, username, password, kingdom, connect) {
    super();
    this.id = id; // unique integer id (starts at 0)
    this.username = username; // string username
    if(connect) { this.password = password; }
    else        { this.password = sha256(password); } // string sha256 hashed password
    this.kingdom = kingdom; // kingdom managed by player
    console.log(this.toJSON);
    // TODO: Add player functions
  }

  check() {
    var data = database.read();

    for (var property in data.accounts) {
      if(   data.accounts[property].username === this.username
         && data.accounts[property].password === this.password) {

        this.id = data.accounts[property].id;
        // TODO: Load kingdom in
        return true;
      }
    }
    return false;
  }

  save() {
    this.id = objectLength(database.read().accounts) + 1;
    database.addAccount(this.toJSON());
  }
}

module.exports = Player;
