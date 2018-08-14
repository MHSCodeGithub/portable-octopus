
function APIClass() {
  function get(target) {
    return new Promise(function(resolve) {
      $.get("/api/get/"+target, function (data) {
        resolve(data)
      });
    });
  }

  this.get = async function (target, callback) {
    var result = await get(target);
    callback(result);
  }

  function send(target, toSend) {
    return new Promise(function(resolve) {
      $.post("/api/get/"+target, toSend, function (data) {
        resolve(data)
      });
    });
  }

  this.send = async function (target, data, callback) {
    var result = await get(target, data);
    callback(result);
  }
}
