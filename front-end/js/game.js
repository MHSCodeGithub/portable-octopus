
/* Authentication
––––––––––––––––––––––––––––––––––––––– */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
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

var username = getCookie("username");
var password = getCookie("password");

if (!username || !password) {
  alert("Critical Error Please Login Again. (Reset session by re-opening browser)");
}

var me = {};

$(function() {

  /* Initialisations
  ––––––––––––––––––––––––––––––––––––––– */

  var API = new APIClass();
  var socket = io.connect('http://localhost:3000');

  updateMap();

  $(".producer-info").hide();

  /* Deprecated Stuff
  ––––––––––––––––––––––––––––––––––––––– */

  /* ## Depracted chat system ## (IGNORE)
  var now = new Date();
  $('#chat-input').submit(function(){
    if($('#message').val() != "") {
      socket.emit('chat message', {content: $('#message').val(), author: username, timeStamp: String(now.getUTCHours()+":"+now.getUTCMinutes()+":"+now.getUTCSeconds())});
      $('#message').val('');
    }
    return false;
  });*/

  // ## Depracted chat system ## (IGNORE)
  socket.on('chat message', function(msg) { // <-- Required for bug fix
    /*$('#chat-output').append($('<li>').text("["+msg.timeStamp+"] ["+msg.author+"] "+msg.content));
    $("#chat-output").animate({ scrollTop: $("#chat-output")[0].scrollHeight - $("#chat-output").height() }, 100);*/
  });

  socket.on('result', function(message) {
    alert(message);
  });

  /* Draw Functions
  ––––––––––––––––––––––––––––––––––––––– */

  function drawFarm(id, x, y, type, stage) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/farm-" + type + "-" + stage + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("farm"+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawMine(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/mine-" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("mine"+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawGrass(x, y) {
    $(".y-" + y + ".x-" + x).css("background", "url('../img/map/grass.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass("grass empty").addClass("y-" + y + " x-" + x);
  }

  function drawProducer(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".gif')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type+"-"+id+" built producer").addClass("y-" + y + " x-" + x);
  }

  function drawFeature(id, x, y, type) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/" + type + ".png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).removeClass().addClass(type+"-"+id+" built feature").addClass("y-" + y + " x-" + x);
  }

  function drawSelect(x, y, reason) {
    $(".y-" + y + ".x-" + x).css("background", "url('img/map/selected-tile.png')");
    $(".y-" + y + ".x-" + x).css("background-size", "contain");
    $(".y-" + y + ".x-" + x).addClass("selected "+reason);
  }

  function selectAvailiable() {
    for (var i = 0; i < 18; i++) {
      for (var j = 0; j < 18; j++) {
        if($(".y-" + (i+1) + ".x-" + (j+1)).hasClass("empty")) { drawSelect(j+1, i+1, "to-build"); }
      }
    }
  }

  function updateMap() {

    API.send("get-map", {username: username, password: password}, function (data) {
      for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 18; j++) {
          drawGrass(i+1, j+1);
        }
      }

      console.log(data);

      for (var i = 0; i < data.length; i++) {
        var producer = data[i];

        if(i == data.length-2) {
          drawFeature(producer.id, producer.y, producer.x, "treasury");
        } else if(i == data.length-1) {
          drawFeature(producer.id, producer.y, producer.x, "harbour");
        } else {
          if(producer.type == "farm") {
            drawFarm(producer.id, producer.y, producer.x, producer.subType, producer.growth);
          } else if(producer.type == "mine") {
            drawMine(producer.id, producer.y, producer.x, producer.subType)
          } else {
            drawProducer(producer.id, producer.y, producer.x, producer.type);
          }
        }
      }

      /* Block Interactions
      ––––––––––––––––––––––––––––––––––––––– */
      $('.built').unbind("click");
      $('.built').bind("click", function () {
        $(".producer-info").show()

        if($(this).attr("class").split(" ")[0].split("-")[0] == "harbour" ||
           $(this).attr("class").split(" ")[0].split("-")[0] == "treasury") {
          $(".producer-info").hide()
          return;
        }
        var id = $(this).attr("class").split(" ")[0].split("-")[1];
        var target = $(this).attr("class").split(" ")[0].split("-")[1];
        var another = $(this).attr("class").split(" ")[0];

        API.send("get-producer", {
          username: username,
          password: password,
          target: target
        }, function (data) {

          $(".hidden-id").text(id);
          $(".hidden-target").text(another);

          API.get("items", function (items) {
            if(data.subType) { data.type = data.subType + " " + data.type; }

            for (var i = 0; i < items.length; i++) {
              if(items[i].name == cleanStr(data.type)) {
                var price = items[i].price;
                API.send("get-yeild", {
                  username: username,
                  password: password,
                  target: $(".hidden-id").text()
                }, function (producerYeild) {
                  $(".producer-info-name").html(cleanStr(data.type) + " <span class='producer-info-level'></span>");
                  $(".producer-info-level").text("Lvl."+data.level);
                  $("#producer-upgrade-btn").text("Upgrade ($"+(price*(data.level+1))+")");
                  $("#producer-sell-btn").text("Sell ($"+((price*data.level)/2)+")");
                  $(".producer-info-gen").text(cleanStr(data.produce)+" "+(producerYeild.val*30)+"/hour");
                })
              }
            }
          })
        })
      });

      $(".producer-info-close").click(function () {
        $(".producer-info").hide()
      })
    });
    getBalance()
  }

  function updateCommodities() {
    API.send("get-commodities", {username: username, password, password}, function (data) {
      $("#commodities-table").html(`
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
        `);
      for (var i = 0; i < data.length; i++) {
        $("#commodities-table").append(
          `
            <tr>
              <td>${data[i].name}</td>
              <td>${data[i].type}</td>
              <td>${data[i].amount}</td>
            </tr>
          `
        );
      }
      console.log(data);
    });
  }

  /* Map Generation/Setups
  ––––––––––––––––––––––––––––––––––––––– */

  var total = 0;
  for (var i = 0; i < 18; i++) {
    for (var j = 0; j < 18; j++) {
      total++;
      $("#game-container").append("<div id='block-" + (total) + "' class='y-" + (i + 1) + " x-" + (j + 1) + " grass empty'> </div>");
    }
  }


  $(".modal-btn").click(function() {

    var target = $(this).attr('id').split('-')[0];
    if ($("#"+target+"-modal").css('display') == 'none') {
      $(".modal").css('display', 'none');
      $("#"+target+"-modal").css('display', 'block');

      $panzoom.panzoom("disable");

      API.get("items", function (items) {
        console.log(items);
        $("#shop-item-wrap").html("")
        for (var i = 0; i < items.length; i++) {
          var item = `
          <div class="shop-item" id="item-`+items[i].id+`">
            <h2 class="item-name">`+items[i].name+`</h2>
            <div class="item-desc-wrap">
              <img src="`+items[i].image+`" alt="" class="item-img">
              <p class="item-desc">`+items[i].description+`</p>
            </div>
            <button id="item-button-`+items[i].id+`" class="item-buy-btn">$`+items[i].price+`</button>
          </div>
          `
          $("#shop-item-wrap").append(item);
        }

        $(".modal-close-btn").unbind("click");
        $(".modal-close-btn").bind("click", function () {
          $("#"+target+"-modal").css('display', 'none');
          $panzoom.panzoom("enable")
        });

        $('.item-buy-btn').bind("click", function () {
          selectAvailiable();
          $panzoom.panzoom("enable")
          $(".modal").css('display', 'none');

          var pre = this;

          $(".to-build").bind("click", function () {
            console.log("PRODUCER PLACE");
            console.log($(this).attr("class"));
            if($(this).hasClass("selected")) {
              API.send("buy-producer", {
                username: username,
                password: password,
                target: $(pre).parent().attr('id').split("-")[1],
                x: Number($(this).attr("class").split(' ')[2].split("-")[1]),
                y: Number($(this).attr("class").split(' ')[3].split("-")[1])
              }, function (data) {
                console.log(data);
                $('.to-build').unbind("click");
                updateMap();
                getBalance()
              });
            }
          });
        });

      });
    } else {
      $panzoom.panzoom("enable")
      $("#"+target+"-modal").css('display', 'none');
    }
  });

  /*window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }*/

  /* Front-end JS
  ––––––––––––––––––––––––––––––––––––––– */
  $(document).ready(function() {
    $("#tabs").tabs();
  });

  /* Automatic Commodity Table Updater
  ––––––––––––––––––––––––––––––––––––––– */

  setInterval(function () {
    if($("#my-commodities").is(":visible")) {
      updateCommodities()
    }
  }, 10*1000);

  /*setInterval(function () {
    getBalance()
  }, 5*1000);*/

  function getBalance() {
    API.send("get-balance", {username: username, password: password}, function (balance) {
      $("#balance").text("$"+balance.data);
    });
  }

  $("#market-btn").click(function () {
    updateCommodities();
  });


  $("#producer-upgrade-btn").click(function () {
    API.send("upgrade-producer", {
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (data) {

      API.send("get-producer", {
        username: username,
        password: password,
        target: $(".hidden-id").text()
      }, function (data) {

        API.get("items", function (items) {
          if(data.subType) { data.type = data.subType + " " + data.type; }

          for (var i = 0; i < items.length; i++) {
            if(items[i].name == cleanStr(data.type)) {
              var price = items[i].price;
              API.send("get-yeild", {
                username: username,
                password: password,
                target: $(".hidden-id").text()
              }, function (producerYeild) {
                getBalance()
                $(".producer-info-name").html(cleanStr(data.type) + " <span class='producer-info-level'></span>");
                $(".producer-info-level").text("Lvl."+data.level);
                $("#producer-upgrade-btn").text("Upgrade ($"+(price*(data.level+1))+")");
                $("#producer-sell-btn").text("Sell ($"+((price*data.level)/2)+")");
                $(".producer-info-gen").text(cleanStr(data.produce)+" "+(producerYeild.val*30)+"/hour");
              })
            }
          }
        })
      })
    });
  });

  $("#producer-sell-btn").click(function () {
    API.send("sell-producer", {
      username: username,
      password: password,
      target: $(".hidden-id").text()
    }, function (data) {
      $(".producer-info").hide();
      $("."+$(".hidden-target").text()).unbind("click");
      getBalance()
      updateMap()
    });
  });

});
