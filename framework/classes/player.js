
const sha256 = require('sha256');
const Objectable = require('./objectable');
const database = require('../../database');

const framework = require('../');

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
          tre.balance = data.accounts[property].kingdom.treasury.balance;
          tre.x = data.accounts[property].kingdom.treasury.x;
          tre.y = data.accounts[property].kingdom.treasury.y;
          var har = new Harbour(data.accounts[property].kingdom.harbour.id);
          har.health = data.accounts[property].kingdom.harbour.health;
          har.commodities = data.accounts[property].kingdom.harbour.commodities;
          har.x = data.accounts[property].kingdom.harbour.x;
          har.y = data.accounts[property].kingdom.harbour.y;

          var king = new Kingdom(data.accounts[property].kingdom.id, data.accounts[property].kingdom.name, tre, har);

          for (var i = 0; i < data.accounts[property].kingdom.producers.length; i++) {
            switch (data.accounts[property].kingdom.producers[i].type) {
              case "mine":
                var producer = new framework.producers.Mine(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].subType, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "farm":
                var producer = new framework.producers.Farm(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].subType, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "mill":
                var producer = new framework.producers.Mill(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "bakery":
                var producer = new framework.producers.Bakery(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "quarry":
                var producer = new framework.producers.Quarry(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "blacksmith":
                var producer = new framework.producers.Blacksmith(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "cotton_mill":
                var producer = new framework.producers.CottonMill(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "butchery":
                var producer = new framework.producers.Butchery(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "brewery":
                var producer = new framework.producers.Brewery(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "house":
                var producer = new framework.producers.House(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
              case "winery":
                var producer = new framework.producers.Winery(data.accounts[property].kingdom.producers[i].id, data.accounts[property].kingdom.producers[i].x, data.accounts[property].kingdom.producers[i].y);
                producer.level = data.accounts[property].kingdom.producers[i].level;

                king.producers.push(producer);
                break;
            }
          }

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

  getCommodityAmount(id) {
    for (var i = 0; i < this.kingdom.harbour.commodities.length; i++) {
      if(this.kingdom.harbour.commodities[i].id == id) {
        return this.kingdom.harbour.commodities[i].amount;
      }
    }
    return 0;
  }

  charge(amount) {
    if(this.kingdom.treasury.balance - amount < 0) { this.kingdom.treasury.balance = 0; }
    else {
      this.kingdom.treasury.balance -= amount;
    }
  }

  pay(amount) {
    this.kingdom.treasury.balance += amount;
  }

  save() {
    this.id = objectLength(database.read().accounts) + 1;
    database.addAccount(this.toJSON(this));
  }

  update() {
    database.addAccount(this.toJSON(this));
  }
}

module.exports = Player;
