
const framework = require('../');


/**
 *
 * @function getItem()
 *
 * @param {String} name
 *
 * @description returns the specified item, if it does not exist, it return false
 *
 **/

function getItem(name) {
  var items = framework.database.getItems(); // get all producers from database

  for (var i = 0; i < items.length; i++) { // for each producer in db
    if (items[i].name == name) {
      return items[i];
    } // if producer fits parameters
  }

  return false;
}

/**
 *
 * @function getItem()
 *
 * @param {Number} id
 *
 * @description returns the specified item, if it does not exist, it return false
 *
 **/

function getItemByID(id) {
  var items = framework.database.getItems(); // get all producers from database

  for (var i = 0; i < items.length; i++) { // for each producer in db
    if (items[i].id == id) {
      return items[i];
    } // if producer fits parameters
  }

  return false;
}

/**
 *
 * @function getNextIDOfProducers()
 *
 * @param {Account} acc
 *
 * @description returns the highest ID + 1 from the latest account's producer
 *
 **/

function getNextIDOfProducers(acc) {
  current = -1;
  for (var i = 0; i < acc.kingdom.producers.length; i++) { // for each producer in accounts kingdom
    if (acc.kingdom.producers[i].id > current) {
      current = acc.kingdom.producers[i].id
    } // if target ID is the largest seen set current to that ID
  }
  return current + 1; // return the highest ID + 1
}

/**
 *
 * @function getNextIDOfOrders()
 *
 * @description returns the ID + 1 from the latest order
 *
 **/

function getNextIDOfOrders() {
  current = -1;
  for (var i = 0; i < framework.database.read().orders.length; i++) { // for each order in db
    if (framework.database.read().orders[i].id > current) {
      current = framework.database.read().orders[i].id
    } // if target ID is the largest seen set current to that ID
  }
  return current + 1; // return the highest ID + 1
}

/**
 *
 * @function capitalizeFirstLetter()
 *
 * @param {String} string
 *
 * @description returns the specified string however the first character is capitalized
 *
 **/

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @function capitalizeFirstLetter()
 *
 * @param {String} string
 *
 * @description returns the specified string however the first character is capitalized
 *
 **/

function cleanStr(string) {
  string = string.replace("_", " "); // replace all underscores with spaces

  var words = string.split(" "); // split all words up

  for (var i = 0; i < words.length; i++) { // for each word
    words[i] = capitalizeFirstLetter(words[i]); // capitalize the first letter of the word and update the word list
  }

  string = words.join(" "); // join the words back into a sentence

  return string;
}

exports.fulfillOrder = function (data, req, res) {
  var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
  if (testAcc.check()) { // validate the account
    var order = framework.database.getOrder(Number(data.id)); // get the target order

    var otherAccount = framework.database.getAccount(order.author); // get the second account in the transaction
    var other = new framework.Player(0, otherAccount.username, otherAccount.password, null, true); // create a second test account
    if (other.check()) { // validate the account

      if (order.type == "sell") { // if the order type is sell
        var balance = testAcc.kingdom.treasury.balance; // get the balance of the buyer

        if (balance >= order.price * data.amount) { // check that their balance is larger than or equal to the transaction cost
          if (other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount >= Number(data.amount)) { // if the seller has the commodities needed to sell
            testAcc.charge(order.price * data.amount); // apply transaction
            other.pay(order.price * data.amount);

            testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount += Number(data.amount); // send commodities across
            other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount -= Number(data.amount);
            res.send("SUCCESS!")
          } else {
            res.send({
              type: "error",
              data: "Seller does not have enough commodities to sell!"
            })
            return;
          }
        } else {
          res.send({
            type: "error",
            data: "Not Enough Money in Balance!"
          })
          return;
        }
      } else if (order.type == "buy") { // if the order type is buy
        var balance = other.kingdom.treasury.balance;

        if (balance >= order.price * data.amount) { // check the buyer has enough money to buy the commodities
          if (testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount >= Number(data.amount)) { // check the seller has enough commodities to sell
            other.charge(order.price * data.amount); // apply transaction
            testAcc.pay(order.price * data.amount);

            other.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount += Number(data.amount); // send commodities across
            testAcc.kingdom.harbour.commodities[framework.database.getCommodity(order.commodity).id].amount -= Number(data.amount);
            res.send("SUCCESS!")
          } else {
            res.send({
              type: "error",
              data: "You do not have enough commodities to sell!"
            })
            return;
          }
        } else {
          res.send({
            type: "error",
            data: "Not Enough Money in Seller's Balance!"
          })
          return;
        }
      }

      var db = framework.database.read(); // get the db

      for (var i = 0; i < db.orders.length; i++) { // for each order in db
        if (db.orders[i].id == data.id) { // check that the target order matches the order
          db.orders[i].fulfillment += Number(data.amount); // fulfill the order
          if (db.orders[i].fulfillment == Number(db.orders[i].amount)) { // check whether the order is complete and can be removed
            db.orders.splice(i, 1); // remove the order
          }
        }
      }
      framework.database.write(db); // update the db

      other.update() // update the accounts to the db
      testAcc.update()
    } else {
      res.send({
        type: "error",
        data: "Author of Order Does Not Exist!"
      })
    }
  } else {
    res.send({
      type: "error",
      data: "Invalid Username/Password"
    })
  }
};
