
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
    if(result.type == "error") { alert(result.data); }
    callback(result);
  }

  function send(target, toSend) {
    return new Promise(function(resolve) {
      $.post("/api/send/"+target, toSend, function (data) {
        resolve(data)
      });
    });
  }

  this.send = async function (target, data, callback) {
    var result = await send(target, data);
    if(result.type == "error") { alert(result.data); }
    callback(result);
  }
}
