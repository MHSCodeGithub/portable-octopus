
const sha256 = require('sha256');
const Objectable = require('./objectable');
const database = require('../../database');

const Treasury = require('./treasury');
const Producer = require('./producer');
const Harbour = require('./harbour');
const Kingdom = require('./kingdom');

function objectLength(target) {
  var i = 0;
  for (var property in target) {
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
    // TODO: Add player functions
  }

  check() {
    var data = database.read();

    for (var property in data.accounts) {
      if(   data.accounts[property].username === this.username
         && data.accounts[property].password === this.password) {

        this.id = data.accounts[property].id;

        try {
          var tre = new Treasury(data.accounts[property].kingdom.treasury.id);
          tre.health = data.accounts[property].kingdom.treasury.health;
          var har = new Harbour(data.accounts[property].kingdom.harbour.id);
          har.health = data.accounts[property].kingdom.harbour.health;

          var king = new Kingdom(data.accounts[property].kingdom.id, data.accounts[property].kingdom.name, tre, har);

          this.kingdom = king;
        } catch (e) {
          this.kingdom = null;
        }
        // TODO: Load kingdom producers in
        return true;
      }
    }
    return false;
  }

  save() {
    this.id = objectLength(database.read().accounts) + 1;
    database.addAccount(this.toJSON(this));
  }
}

module.exports = Player;
