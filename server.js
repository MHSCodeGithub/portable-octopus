
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
  var accounts = database.read().accounts;
  var commodities = database.read().commodities;

  for (var i = 0; i < objectLength(accounts); i++) {
    var testAcc = new Player(0, accounts[i].username, accounts[i].password, null, true)
    if (testAcc.check()) {
      for (var j = 0; j < testAcc.kingdom.producers.length; j++) {
        var producer = testAcc.kingdom.producers[j];

        var amount = producer.yeild();
        var tier = producer.tier;
        var level = producer.level;

        if (producer.type == "house") {
          var fed = false;
          for (var k = 0; k < testAcc.kingdom.harbour.commodities.length; k++) {
            if (commodities[k].type == "Food") {
              if (amount) {
                if (testAcc.kingdom.harbour.commodities[k].amount >= amount) {
                  testAcc.kingdom.harbour.commodities[k].amount -= amount;
                  amount = 0;
                  break;
                } else {
                  amount -= testAcc.kingdom.harbour.commodities[k].amount;
                  testAcc.kingdom.harbour.commodities[k].amount = 0;
                }
              }
            }
          }

          if (amount > 0) {
            console.log(`left over ${amount}`);
            testAcc.kingdom.producers[j].citizens = testAcc.kingdom.producers[j].yeild() - amount;
            if (testAcc.kingdom.producers[j].citizens < 0) {
              testAcc.kingdom.producers[j].citizens = 0;
            }
          } else {
            testAcc.kingdom.producers[j].citizens = testAcc.kingdom.producers[j].yeild()
          }

          continue;
        }

      }

      var citizens = testAcc.kingdom.getCitizens();

      for (var j = 0; j < testAcc.kingdom.producers.length; j++) {
        var producer = testAcc.kingdom.producers[j];

        var amount = producer.yeild();
        var tier = producer.tier;
        var level = producer.level;

        if (producer.type != "house") {
          citizens -= producer.tier;

          if (citizens > 0) {
            testAcc.kingdom.producers[j].functioning = true;
            var data = database.read();
            for (var k = 0; k < data.commodities.length; k++) {
              if (data.commodities[k].name == cleanStr(producer.produce)) {
                for (var n = 0; n < testAcc.kingdom.harbour.commodities.length; n++) {
                  if (testAcc.kingdom.harbour.commodities[n].id == data.commodities[k].id) {
                    if (producer.intake != "None") {
                      for (var b = 0; b < data.commodities.length; b++) {
                        if (data.commodities[b].name == (producer.intake)) {
                          for (var c = 0; c < testAcc.kingdom.harbour.commodities.length; c++) {
                            if (testAcc.kingdom.harbour.commodities[c].id == data.commodities[b].id) {
                              if (testAcc.kingdom.harbour.commodities[c].amount >= amount) {
                                testAcc.kingdom.treasury.balance += (Number(tier) * 6) * Number(level);
                                testAcc.kingdom.harbour.commodities[n].amount += amount;
                                testAcc.kingdom.harbour.commodities[c].amount -= amount;
                              } else {
                                testAcc.kingdom.producers[j].functioning = false;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      testAcc.kingdom.treasury.balance += (Number(tier) * 6) * Number(level);
                      testAcc.kingdom.harbour.commodities[n].amount += amount;
                    }
                  }
                }
              }
            }
          } else {
            producer.functioning = false;
          }
        }
      }
      testAcc.update()
    }
  }
}, 3 * 60 * 1000);

/* Server Listening
––––––––––––––––––––––––––––––––––––––– */

http.listen(port, function() {
  console.log('listening on *:' + port);
});
