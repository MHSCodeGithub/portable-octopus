
const sha256 = require('sha256');

/*
 * <---> # Player class # <--->
 */

function Player(id, username, password) {
  this.id = id;
  this.username = username;
  this.password = sha256(password);
}
