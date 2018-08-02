
const automaticRoute = require('automatic-routing');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const sha256 = require('sha256');
var port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Player = require('./framework/classes/player');
const database = require('./database');

function objectLength(target) {
  var i = 0;
  for (var property in target) {
    i++;
  }
  return Number(i);
};

app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8')
  next();
});

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
    var newAccount = new Player(objectLength(database.read().accounts), req.body.username, req.body.password, null, false);
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
