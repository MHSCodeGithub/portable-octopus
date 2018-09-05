
const fs = require('fs');

if (!fs.existsSync("./data.json")) { // check if the db is alive
  fs.writeFileSync("./data.json", fs.readFileSync("setup.json")); // if not create the db
}

/**
 *
 * @function exporsts.read()
 *
 * @description reads the database and returns it
 *
 **/

exports.read = function() {
  return JSON.parse(fs.readFileSync("./data.json"));
};

/**
 *
 * @function epxorts.write()
 *
 * @param {Object} data
 *
 * @description writes specified JSON data to the db
 *
 **/

exports.write = function(data) {
  return fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
};

/**
 *
 * @function epxorts.addAccount()
 *
 * @param {Object} account
 *
 * @description writes specified JSON accont to the db
 *
 **/

exports.addAccount = function(account) {
  var database = exports.read(); // read the db
  database.accounts[account.id] = account; // set the account
  exports.write(database); // update the db
};

/**
 *
 * @function epxorts.getAccount()
 *
 * @param {String} username
 *
 * @description returns the specified account
 *
 **/

exports.getAccount = function(username) {
  var data = exports.read(); // read the db
  for (var property in data.accounts) { // find the account
    if (data.accounts[property].username === username) {
      return data.accounts[property]; // return the account
    }
  }

  return false;
};

/**
 *
 * @function epxorts.addOrder()
 *
 * @param {Object} order
 *
 * @description writes specified JSON order to the db
 *
 **/

exports.addOrder = function(order) {
  var database = exports.read(); // read the db
  database.orders[order.id] = order; // add the order
  exports.write(database); // update the db
};

/**
 *
 * @function epxorts.getOrder()
 *
 * @param {Number} id
 *
 * @description returns the specified order
 *
 **/

exports.getOrder = function(id) {
  var data = exports.read(); // read the db
  for (var property in data.orders) { // find the order
    if (data.orders[property].id === id) {
      return data.orders[property]; // return the order
    }
  }

  return false;
};

/**
 *
 * @function epxorts.getItem()
 *
 * @param {Number} id
 *
 * @description returns the specified producer template
 *
 **/

exports.getItem = function(id) {
  var data = exports.read(); // read the db
  for (var property in data.items) { // find the item
    if (data.items[property].id === id) {
      return data.items[property]; // return the item
    }
  }

  return false;
};

/**
 *
 * @function epxorts.getCommodity()
 *
 * @param {String} name
 *
 * @description returns the specified JSON commodity template
 *
 **/

exports.getCommodity = function(name) {
  var data = exports.read(); // read the db
  for (var property in data.commodities) { // find the commodity
    if (data.commodities[property].name === name) {
      return data.commodities[property]; // return the commodity
    }
  }

  return false;
};

/**
 *
 * @function epxorts.getItems()
 *
 * @description returns the producer templates in the db
 *
 **/

exports.getItems = function() {
  return exports.read().items;
}

/**
 *
 * @function epxorts.getOrders()
 *
 * @description returns the orders in the db
 *
 **/


exports.getOrders = function() {
  return exports.read().orders;
}

/**
 *
 * @function epxorts.getCommodities()
 *
 * @description returns the commodities in the db
 *
 **/

exports.getCommodities = function() {
  return exports.read().commodities;
}
