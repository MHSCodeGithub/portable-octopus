
/* Initialisations
––––––––––––––––––––––––––––––––––––––– */

const automaticRoute = require('automatic-routing');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = require('express')();
const http = require('http').Server(app);
const sha256 = require('sha256');
const api = require('./api');
const Player = require('./framework/classes/player');
const Kingdom = require('./framework/classes/kingdom');
const Treasury = require('./framework/classes/treasury');
const Harbour = require('./framework/classes/harbour');
const database = require('./database');
const routes = require('./routes');

var port = process.env.PORT || 3000; // set the port

// initialise cookies/sessions
app.use(cookieParser());
app.use(session({
  secret: "Shh, its a secret!"
}));

// setup post data handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set the charset
app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8')
  next();
});

// set the gets
var apiGets = {
  // # items
  items: database.getItems(),
  // # ping
  ping: "pong"
}

// setup API
api.setup(app, apiGets);

/* Functions
––––––––––––––––––––––––––––––––––––––– */

/**
 *
 * @function getNextIDOfAccounts()
 *
 * @description returns the ID + 1 from the latest account
 *
 **/

function getNextIDOfAccounts() {
  var accounts = database.read().accounts; // get accounts in db
  current = -1; // set id, which will always be overwritten
  for (var account in accounts) { // for each account
    if (accounts[account].id > current) { // if teh account's ID is larger than the current id
      current = accounts[account].id // set the current id to their ID
    }
  }
  return current + 1; // add 1 to the highest ID (giving us a unique ID)
}

/**
 *
 * @function objectLength()
 *
 * @param {Object} target
 *
 * @description returns the amount of properties in the specified object
 *
 **/

function objectLength(target) {
  var i = 0;
  for (var property in target) {
    i++;
  }
  return Number(i);
};

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
 * @function cleanStr()
 *
 * @param {String} string
 *
 * @description returns the specified string however underscores are replaced with spaces
 *              and all word's first letter is capitalized
 *
 **/

function cleanStr(string) {
  string = string.replace("_", " "); // replace underscores with spaces

  var words = string.split(" "); // split the string up by spaces

  for (var i = 0; i < words.length; i++) { // for each word
    words[i] = capitalizeFirstLetter(words[i]) // capitalize the first letter
  }

  string = words.join(" "); // join string back together

  return string;
}

/* Routing
––––––––––––––––––––––––––––––––––––––– */

app.get('/', function(req, res) { // if a client requests for the home directory
  routes.handleHomeRequest(req, res); // send request to routes.js
});

app.get('/index.html', function(req, res) {
  routes.handleHomeRequest(req, res); // send request to routes.js
});

app.get("/logout", function(req, res) { // if a client wishes to logout
  routes.handleLogoutRequest(req, res); // send request to routes.js
});

app.post('/', function(req, res) {
  routes.handleRegisterOrLoginRequest(req, res); // send request to routes.js
});

app.get("*", function(req, res) {
  automaticRoute(__dirname + "/front-end/", req, res); // automatically route to the front-end/ file
});

/* Game Functions
––––––––––––––––––––––––––––––––––––––– */

/**
 *
 * @function anonymous
 *
 * @param {String} string
 *
 * @description Every 3 minutes the server pays every user their according taxes,
 *              makes their producers produce and feeds their citizens
 *
 **/

setInterval(function() {
  var accounts = database.read().accounts; // get accounts in db
  var commodities = database.read().commodities; // get commodities in db

  for (var i = 0; i < objectLength(accounts); i++) { // go through all accounts
    var testAcc = new Player(0, accounts[i].username, accounts[i].password, null, true) // create test account
    if (testAcc.check()) { // check validity
      for (var j = 0; j < testAcc.kingdom.producers.length; j++) { // go through user's producers
        var producer = testAcc.kingdom.producers[j]; // select the current producer

        // general info on teh producer at hand
        var amount = producer.yeild();
        var tier = producer.tier;
        var level = producer.level;

        if (producer.type == "house") { // if the producer is a house
          for (var k = 0; k < testAcc.kingdom.harbour.commodities.length; k++) { // for each commodity in the harbour
            if (commodities[k].type == "Food") { // if the commodity is food (yum, I need breakfast)
              if (amount) { // if the user has some food (k, back from breakfast)
                if (testAcc.kingdom.harbour.commodities[k].amount >= amount) { // if the user has enough food to feed the citizens
                  testAcc.kingdom.harbour.commodities[k].amount -= amount; // reduce food (feed citizens)
                  amount = 0; // reduce amount to prevent more feeding (we dont want fat citizens)
                  break; // end the loop
                } else { // if the user does not have enough of this commodity to feel the citizens
                  amount -= testAcc.kingdom.harbour.commodities[k].amount; // take remaining food from this commodity
                  testAcc.kingdom.harbour.commodities[k].amount = 0;
                }
              }
            }
          }

          if (amount > 0) { // if the user has not fed some citizens
            testAcc.kingdom.producers[j].citizens = testAcc.kingdom.producers[j].yeild() - amount; // kill dead citizens (damn, thats the worst sentence I've ever written)
            if (testAcc.kingdom.producers[j].citizens < 0) { // ensure that citizens are always at 0 (not below) (that would mean we get undead citizens)
              testAcc.kingdom.producers[j].citizens = 0;
            }
          } else { // if the user has fed the citizens
            testAcc.kingdom.producers[j].citizens = testAcc.kingdom.producers[j].yeild() // bring all dead people back to life
          }

          continue;
        }

      }

      var citizens = testAcc.kingdom.getCitizens(); // get citizen count

      for (var j = 0; j < testAcc.kingdom.producers.length; j++) { // for each producer in kingdom
        // general info on teh producer at hand
        var producer = testAcc.kingdom.producers[j];

        var amount = producer.yeild();
        var tier = producer.tier;
        var level = producer.level;

        if (producer.type != "house") { // make sure producer is not a house (im not housist)
          citizens -= producer.tier; // reduce citizens by the tier (e.g: 1 person works at a farm, but 2 people work at a mill)

          // my eyes are bleeding at whats ahead

          if (citizens > 0) { // check that there are some available citizens
            testAcc.kingdom.producers[j].functioning = true; // make producer funtion

            var data = database.read(); // get db

            for (var k = 0; k < data.commodities.length; k++) { // for each commodity template
              if (data.commodities[k].name == cleanStr(producer.produce)) { // match with producer producer

                for (var n = 0; n < testAcc.kingdom.harbour.commodities.length; n++) { // for user's commodities
                  if (testAcc.kingdom.harbour.commodities[n].id == data.commodities[k].id) { // match commodities with the commodity template which matches with the producer's produce (kill me please)

                    if (producer.intake != "None") { // if the producer does intake resources

                      for (var b = 0; b < data.commodities.length; b++) { // for each commodity template
                        if (data.commodities[b].name == (producer.intake)) { // if the commodity matches the producer's intake

                          for (var c = 0; c < testAcc.kingdom.harbour.commodities.length; c++) { // go through the users commodities
                            if (testAcc.kingdom.harbour.commodities[c].id == data.commodities[b].id) { // match the user's commodities with the commodity template

                              if (testAcc.kingdom.harbour.commodities[c].amount >= amount) { // if the user has enough commodities to intake
                                testAcc.kingdom.treasury.balance += (Number(tier) * 6) * Number(level); // pay user taxes
                                testAcc.kingdom.harbour.commodities[n].amount += amount; // give user produce
                                testAcc.kingdom.harbour.commodities[c].amount -= amount; // take away intake
                              } else { // if the user cannot provide intake
                                testAcc.kingdom.producers[j].functioning = false; // prevent producer from producing
                              }

                            }
                          }

                        }
                      }

                    } else { // if the producer does not intake
                      testAcc.kingdom.treasury.balance += (Number(tier) * 6) * Number(level); // pay user taxes
                      testAcc.kingdom.harbour.commodities[n].amount += amount; // give user produce
                    }

                  }
                }

              }
            }

          } else { // if there are no citizens to work
            producer.functioning = false; // prevent the producer from producing
          }
        }
      }
      testAcc.update() // update the user in the db
    }
  }
}, 3 * 60 * 1000); // set set interval for 3m

/* Server Listening
––––––––––––––––––––––––––––––––––––––– */

http.listen(port, function() {
  console.log('listening on *:' + port);
});
