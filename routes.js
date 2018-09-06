
/* Importing
––––––––––––––––––––––––––––––––––––––– */

const sha256 = require('sha256');
const Player = require('./framework/classes/player');
const Kingdom = require('./framework/classes/kingdom');
const Treasury = require('./framework/classes/treasury');
const Harbour = require('./framework/classes/harbour');
const database = require('./database');

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

/**
 *
 * @function handleHomeRequest()
 *
 * @param {ExpressRequest} req
 *
 * @param {ExpressResponse} res
 *
 * @description handles a request for the home directory
 *
 **/

exports.handleHomeRequest = function(req, res) {
  res.cookie('failedReg', false, { // remove cookies to prevent front end alerts
    httpOnly: false
  });
  res.cookie('failedLog', false, {
    httpOnly: false
  });

  if (req.session.username && req.session.password) { // check that there is a user in session
    var tempAccount = new Player(0, req.session.username, req.session.password, null, true); // create a test account
    if (tempAccount.check()) { // validate the session
      res.cookie('username', tempAccount.username, { // remove cookies
        httpOnly: false
      });
      res.cookie('password', tempAccount.password, {
        httpOnly: false
      });
      res.sendFile(__dirname + '/front-end/index.html'); // send the game
    } else { // if the user has incorrect login details
      req.session.username = false; // remove session data
      req.session.password = false;
      res.cookie('failedLog', true, { // alert user of incorrect credentials
        httpOnly: false
      });
      res.sendFile(__dirname + '/front-end/login.html'); // send them to login
    }
  } else { // if the user is not in a session
    req.session.username = false; // remove session
    req.session.password = false;
    res.sendFile(__dirname + '/front-end/login.html'); // send them to login
  }
}

/**
 *
 * @function handleLogoutRequest()
 *
 * @param {ExpressRequest} req
 *
 * @param {ExpressResponse} res
 *
 * @description handles a request to logout
 *
 **/

exports.handleLogoutRequest = function (req, res) {
  res.cookie('failedReg', false, { // remove cookies
    httpOnly: false
  });
  res.cookie('failedLog', false, {
    httpOnly: false
  });
  req.session.username = false; // remove session
  req.session.password = false;
  res.sendFile(__dirname + '/front-end/login.html'); // send them to login
}

/**
 *
 * @function handleRegisterOrLoginRequest()
 *
 * @param {ExpressRequest} req
 *
 * @param {ExpressResponse} res
 *
 * @description handles a request to register/login
 *
 **/

exports.handleRegisterOrLoginRequest = function (req, res) {
  if (req.body.type == "login") {
    req.session.username = req.body.username;
    req.session.password = sha256(req.body.password);
    res.redirect('/');
  } else if (req.body.type == "register") {
    var treasury = new Treasury(0, 10, 10);
    treasury.balance = 500;
    var harbour = new Harbour(0, 19, 10);
    harbour.commodities[0].amount = 10;
    var kingdom = new Kingdom(0, req.body.kingdom, treasury, harbour);
    var newAccount = new Player(getNextIDOfAccounts(), req.body.username, req.body.password, kingdom, false);
    if (database.getAccount(newAccount.username)) {
      req.session.username = null;
      req.session.password = null;
      res.cookie('failedReg', true, {
        httpOnly: false
      });
      res.redirect('login.html');
    } else {
      req.session.username = newAccount.username;
      req.session.password = newAccount.password;
      newAccount.save();
      res.redirect('/');
    }
  }
}
