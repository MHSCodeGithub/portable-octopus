
const automaticRoute = require('automatic-routing');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const sha256 = require('sha256');
const api = require('./api');
var port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Player = require('./framework/classes/player');
const Kingdom = require('./framework/classes/kingdom');
const Treasury = require('./framework/classes/treasury');
const Harbour = require('./framework/classes/harbour');

const database = require('./database');

function objectLength(target) {
  var i = 0;
  for (var property in target) {
    i++;
  }
  return Number(i);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function cleanStr(string) {
  string = string.replace("_", " ");

  var words = string.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i])
  }

  string = words.join(" ");

  return string;
}

app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8')
  next();
});

var apiGets = {
  // # items
  items: database.getItems(),
  // # ping
  ping: "pong"
}

api.setup(app, apiGets);

app.get('/', function(req, res){
  res.cookie('failedReg', false, {httpOnly: false});
  res.cookie('failedLog', false, {httpOnly: false});

  if(req.session.username && req.session.password) {
    var tempAccount = new Player(objectLength(database.read().accounts), req.session.username, req.session.password, null, true);
    if(tempAccount.check()) {
      res.cookie('username', tempAccount.username, {httpOnly: false});
      res.cookie('password', tempAccount.password, {httpOnly: false});
      res.sendFile(__dirname + '/front-end/index.html');
    } else {
      req.session.username = false;
      req.session.password = false;
      res.cookie('failedLog', true, {httpOnly: false});
      res.sendFile(__dirname + '/front-end/login.html');
    }
  } else {
    req.session.username = false;
    req.session.password = false;
    res.sendFile(__dirname + '/front-end/login.html');
  }
});

app.get("/logout", function (req, res) {
  res.cookie('failedReg', false, {httpOnly: false});
  res.cookie('failedLog', false, {httpOnly: false});
  req.session.username = false;
  req.session.password = false;
  res.sendFile(__dirname + '/front-end/login.html');
})

app.get('/index.html', function(req, res){
  res.cookie('failedReg', false, {httpOnly: false});
  res.cookie('failedLog', false, {httpOnly: false});

  if(req.session.username && req.session.password) {
    var tempAccount = new Player(objectLength(database.read().accounts), req.session.username, req.session.password, null, true);
    if(tempAccount.check()) {
      res.cookie('username', tempAccount.username, {httpOnly: false});
      res.cookie('password', tempAccount.password, {httpOnly: false});
      res.sendFile(__dirname + '/front-end/index.html');
    } else {
      req.session.username = false;
      req.session.password = false;
      res.cookie('failedLog', true, {httpOnly: false});
      res.sendFile(__dirname + '/front-end/login.html');
    }
  } else {
    req.session.username = false;
    req.session.password = false;
    res.sendFile(__dirname + '/front-end/login.html');
  }
});

app.post('/', function (req, res) {
  if(req.body.type == "login") {
    req.session.username = req.body.username;
    req.session.password = sha256(req.body.password);
    res.redirect('/');
  } else if(req.body.type == "register") {
    var treasury = new Treasury(0, 10, 10); treasury.balance = 500;
    var harbour = new Harbour(0, 19, 10);
    var kingdom = new Kingdom(0, req.body.kingdom, treasury, harbour);
    var newAccount = new Player(objectLength(database.read().accounts), req.body.username, req.body.password, kingdom, false);
    if(database.getAccount(newAccount.username)) {
      req.session.username = null;
      req.session.password = null;
      res.cookie('failedReg', true, {httpOnly: false});
      res.redirect('login.html');
    } else {
      req.session.username = newAccount.username;
      req.session.password = newAccount.password;
      newAccount.save();
      res.redirect('/');
    }
  }
});

setInterval(function () {
  var accounts = database.read().accounts;

  for (var i = 1; i < objectLength(accounts)+1; i++) {
    var testAcc = new Player(0, accounts[i].username, accounts[i].password, null, true)
    if(testAcc.check()) {
      for (var j = 0; j < testAcc.kingdom.producers.length; j++) {
        var producer = testAcc.kingdom.producers[j];

        var amount = producer.yeild();
        var tier = producer.tier;
        var level = producer.level;

        if(producer.type == "house") { continue; }

        var data = database.read();

        for (var k = 0; k < data.commodities.length; k++) {
          if(data.commodities[k].name == cleanStr(producer.produce)) {
            for (var n = 0; n < testAcc.kingdom.harbour.commodities.length; n++) {
              if(testAcc.kingdom.harbour.commodities[n].id == data.commodities[k].id) {
                testAcc.kingdom.treasury.balance += (Number(tier)*6)*Number(level);
                testAcc.kingdom.harbour.commodities[n].amount += amount;
              }
            }
          }
        }

      }
      testAcc.update()
    }
  }
}, 60*5*1000);

app.get("*", function (req, res) {
  automaticRoute(__dirname+"/front-end/", req, res);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
