
const framework = require('./framework');

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

/**
 *
 * @function exports.setup()
 *
 * @param {Express} app
 *
 * @param {Object} gets
 *
 * @description sets listeners for front end API calls and responds accordingly
 *
 **/

exports.setup = function(app, gets) { // when the API is setup
  app.get("/api/get/:type", function(req, res) { // when a simple API get is called
    var type = req.params.type; // find the type of get needed
    console.log("--- ## API Get ## ---");
    console.log(type);

    if (gets[type]) {
      res.send(gets[type]);
    } // if the get type is known return with the pre-defined static value
    else if (type == "orders") {
      res.send(framework.database.getOrders());
    } // if the get type is a pre-defined get, but has a dynamic response (specifically 'orders')
    else {
      res.send({
        type: "error",
        data: "No API Answer, please contact developers!"
      });
    } // if the get type is unkown return an error
  });

  app.post("/api/send/:type", function(req, res) { // when a API post with incoming data is called
    var type = req.params.type; // determine post type
    var data = req.body; // determine sent data
    console.log("--- ## API Post ## ---");
    console.log(type);
    console.log(data);

    if (type == "buy-producer") {

      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account to check validity and get the real account
      if (testAcc.check()) { // check the validity of the account and fill in the real accounts data
        var kingdom = testAcc.kingdom; // get the
        var current = getNextIDOfProducers(testAcc); // get the next producer ID
        var result = getItemByID(data.target); // get the database defaults for the producer the user wants to buy

        if (result) { // if the target producer exists
          console.log(result);

          // set producer defaults
          var price;
          var producer;

          switch (result.name) { // go though switch statement to determine the target producer
            case "Gold Mine":
              producer = new framework.producers.Mine(current, "gold", Number(data.x), Number(data.y));

              price = getItem("Gold Mine").price;
              break;
            case "Iron Mine":
              producer = new framework.producers.Mine(current, "iron", Number(data.x), Number(data.y));

              price = getItem("Iron Mine").price;
              break;
            case "Gem Mine":
              producer = new framework.producers.Mine(current, "gem", Number(data.x), Number(data.y));

              price = getItem("Gem Mine").price;
              break;
            case "Wheat Farm":
              producer = new framework.producers.Farm(current, "wheat", Number(data.x), Number(data.y));

              price = getItem("Wheat Farm").price;
              break;
            case "Hop Farm":
              producer = new framework.producers.Farm(current, "hop", Number(data.x), Number(data.y));

              price = getItem("Hop Farm").price;
              break;
            case "Grape Farm":
              producer = new framework.producers.Farm(current, "grape", Number(data.x), Number(data.y));

              price = getItem("Grape Farm").price;
              break;
            case "Brewery":
              producer = new framework.producers.Brewery(current, Number(data.x), Number(data.y));

              price = getItem("Brewery").price;
              break;
            case "House":
              producer = new framework.producers.House(current, Number(data.x), Number(data.y), 5);

              price = getItem("House").price;
              break;
            case "Winery":
              producer = new framework.producers.Winery(current, Number(data.x), Number(data.y));

              price = getItem("Winery").price;
              break;
            case "Cotton Farm":
              producer = new framework.producers.Farm(current, "cotton", Number(data.x), Number(data.y));

              price = getItem("Cotton Farm").price;
              break;
            case "Wood Farm":
              producer = new framework.producers.Farm(current, "wood", Number(data.x), Number(data.y));

              price = getItem("Wood Farm").price;
              break;
            case "Quarry":
              producer = new framework.producers.Quarry(current, Number(data.x), Number(data.y));

              price = getItem("Quarry").price;
              break;
            case "Cattle Farm":
              producer = new framework.producers.Farm(current, "cattle", Number(data.x), Number(data.y));

              price = getItem("Cattle Farm").price;
              break;
            case "Mill":
              producer = new framework.producers.Mill(current, Number(data.x), Number(data.y));

              price = getItem("Mill").price;
              break;
            case "Bakery":
              producer = new framework.producers.Bakery(current, Number(data.x), Number(data.y));

              price = getItem("Bakery").price;
              break;
            case "Blacksmith":
              producer = new framework.producers.Blacksmith(current, Number(data.x), Number(data.y));

              price = getItem("Blacksmith").price;
              break;
            case "Cotton Mill":
              producer = new framework.producers.CottonMill(current, Number(data.x), Number(data.y));

              price = getItem("Cotton Mill").price;
              break;
            case "Butchery":
              producer = new framework.producers.Butchery(current, Number(data.x), Number(data.y));

              price = getItem("Butchery").price;
              break;
          }

          if ((testAcc.kingdom.treasury.balance - price) < 0) { // check that the user can afford the producer
            res.send({
              type: "error",
              data: "You do not have enough money!"
            }); // if not alert the user
            return;
          }

          testAcc.charge(price); // charge the user
          kingdom.producers.push(producer); // add the producer to the users kingdom

          testAcc.kingdom = kingdom; // update the kingdom

          testAcc.update(); // update the user to the database
          res.send("Updated!")
        } else {
          res.send({
            type: "error",
            data: "Invalid Item!"
          })
        }
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-map") { // if the post type is get map
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if (testAcc.check()) { // check the account is valid and load in user data
        var kingdom = testAcc.toJSON(testAcc).kingdom; // get JSON version of user's kingdom

        var target = kingdom.producers;
        target.push(kingdom.treasury);
        target.push(kingdom.harbour);

        res.send(kingdom.producers); // send all producers in kingdom
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-commodities") { // if the post type is get commodities
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if (testAcc.check()) { // the the account is valid
        var data = framework.database.getCommodities(); // all commodity templates

        for (var i = 0; i < data.length; i++) { // for each commodity template
          data[i].amount = testAcc.getCommodityAmount(data[i].id); // set the amount of each commodity

          resourceProduction = 0; // create counter

          for (var j = 0; j < testAcc.kingdom.producers.length; j++) { // for each producer in user's kingdom
            if(testAcc.kingdom.producers[j].functioning) {
              if(cleanStr(testAcc.kingdom.producers[j].produce) == data[i].name) { // if it produces target commodity
                resourceProduction += testAcc.kingdom.producers[j].yeild() * 12; // update total production
              }
            }
          }

          data[i].production = resourceProduction; // update production to display front end
        }

        res.send(data); // send the users commodities w/amounts
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-info") {
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if (testAcc.check()) { // the the account is valid

        var info = {
          aliveCitizens: 0,
          potentialCitizens: 0
        }

        for (var j = 0; j < testAcc.kingdom.producers.length; j++) { // for each producer in user's kingdom
          if(testAcc.kingdom.producers[j].type == "house") { // if it produces target commodity
            info.aliveCitizens += testAcc.kingdom.producers[j].citizens;
            info.potentialCitizens += testAcc.kingdom.producers[j].level * 5;
          }
        }

        res.send(info);

      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "upgrade-producer") { // if the post type is upgrade producer
      var testAcc = new framework.Player(0, data.username, data.password, null, true);
      if (testAcc.check()) { // validate the user's account

        for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // go through the user's producers
          if (testAcc.kingdom.producers[i].id == data.target) { // if the selected producer is the producer the user wants to upgrade
            var items = framework.database.getItems(); // get all producer templates

            var name = testAcc.kingdom.producers[i].type; // get the name of the target producer

            if (testAcc.kingdom.producers[i].subType) {
              name = testAcc.kingdom.producers[i].subType + " " + name;
            }

            name = cleanStr(name); // clean the name of the producer to make user friendly

            for (var k = 0; k < items.length; k++) { // for each producer template
              if (items[k].name == name) { // find the correct template
                var price = items[k].price * (testAcc.kingdom.producers[i].level + 1); // generate the price of upgrade

                if (testAcc.kingdom.treasury.balance - price < 0) { // check if the user has enough money
                  res.send({
                    type: "error",
                    data: "You do not have enough money!"
                  });
                  return;
                } else { // if the user has enough money
                  testAcc.kingdom.producers[i].upgrade(); // upgrade the target producer
                  testAcc.charge(price); // charge the user for the upgrade
                  testAcc.update(); // update the user's account in db
                  res.send("Updated!");
                  return;
                }
              }
            }
          }
        }

        res.send({
          type: "error",
          data: "Request for non-existant producer, please contact developers!"
        });
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "sell-producer") { // if the post type is sell producer
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account

        for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // for each producer that the user owns
          if (testAcc.kingdom.producers[i].id == data.target) { // if the producer matches the target's ID
            var items = framework.database.getItems(); // get all producer templates

            for (var k = 0; k < items.length; k++) { // match the template with the target producer
              if (items[k].id == data.target) {
                var price = (items[k].price * testAcc.kingdom.producers[i].level) / 2; // calaculate the sell price

                testAcc.charge(-price); // pay the user accordingly
                testAcc.kingdom.producers.splice(i, 1); // remove the producer from their kingdom
                testAcc.update(); // update the actions to the db
                res.send("Updated!");
                return;
              }
            }
          }
        }

        res.send({
          type: "error",
          data: "Request for non-existant producer, please contact developers!"
        });
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-balance") { // if the post type is get balance
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account
        res.send({
          data: testAcc.kingdom.treasury.balance
        }); // send the user back their balance
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "create-order") { // if the post type is create order
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validatet the account
        delete data.password; // remove the users pasword
        data.author = data.username; // rename data.username to data.author
        delete data.username;

        data.id = getNextIDOfOrders(); // generate the ID of the order

        data.fulfillment = 0; // ste fulfillment to 0

        framework.database.addOrder(data); // add order to db
        res.send("OK");
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "cancel-order") { // if the psot type s cancel order

      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account
        var db = framework.database.read(); // get the database

        for (var i = 0; i < db.orders.length; i++) { // get the orders from the db
          if (db.orders[i].id == data.targetID) { // if the target order matches the order's ID
            db.orders.splice(i, 1); // remove the order from the db
          }
        }

        framework.database.write(db); // save the db
        res.send("OK");
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-order") { // if the post type is get order
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account
        res.send(framework.database.getOrder(Number(data.id))); // send the specified order back
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "fulfill-order") { // if the post type is fulfill order
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
    } else if (type == "get-producer") { // if the post type is get producer
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account

        for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // go through the user's producers
          if (testAcc.kingdom.producers[i].id == data.target) { // if the target producer matches the producer
            res.send(testAcc.toJSON(testAcc).kingdom.producers[i]); // send JSON version of the producer
            return;
          }
        }

        res.send({
          type: "error",
          data: "Request for non-existant producer, please contact developers!"
        });
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else if (type == "get-yeild") { // if the post type is get yeild
      var testAcc = new framework.Player(0, data.username, data.password, null, true); // create a test account
      if (testAcc.check()) { // validate the account


        for (var i = 0; i < testAcc.kingdom.producers.length; i++) { // for each producer the user owns
          if (testAcc.kingdom.producers[i].id == data.target) { // check if producer is target
            res.send({
              val: testAcc.kingdom.producers[i].yeild()
            }); // send the yeild of the producer
            return; // prevent double sending
          }
        }

        res.send({
          type: "error",
          data: "Request for non-existant producer, please contact developers!"
        }); // will run if no producer is matched
      } else {
        res.send({
          type: "error",
          data: "Invalid Username/Password"
        })
      }
    } else {
      res.send({
        type: "error",
        data: "No API Answer, please contact developers!"
      });
    }
  });
}
