function story(text){
  GID("story").innerHTML = text;
}

//Get the angle of object against object2
function return_angle(object_x, object_y, object2_x, object2_y){
    var dx = object_x - object2_x;
    var dy = object_y - object2_y;
    
    var angle = Math.atan2(dy, dx);
    return angle;
}
 
//Get the distance between object and object2
function return_distance(object_x, object_y, object2_x, object2_y){
    var dx = object_x - object2_x;
    var dy = object_y - object2_y;
    var d = Math.sqrt(dx * dx + dy * dy);

    return d;
}

//Make a random color
function randColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function get_rand_num_string(length){
  var numbers = "";
  for(var i = 0; i < length; i++){
    numbers += Math.round(randNum(0, 10)).toString();
  }
  return numbers;
}
//Random number Generator
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function format_numbers(num){
    var sending = "";
    var it = "";
    if(num >= 1000){
        var x = 0;
        sending = num.toString();
        for(var i = sending.length - 1; i >= 0; i--){
           it += sending[x];
           if((i % 3) === 0 && i >= 4){
               it += ",";
           }
           x++;
        }
        return it;
    } else {
        return num.toString();
    } 
}

function randVal(x, y){
  var rand = randNum(1, 3);
  if(rand < 2){
    return y;
  } else {
    return x;
  }
}

//Getting elements by ID for UI/UX
function GID(id){
  return document.getElementById(id);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var story_shown = false;
var story_text = ["It's cold, the space around you feels... empty. On your dashboard you see two buttons.", 
"[ A ] [ D ]", 
"Console: [Starting, please hold down...]",
"You hear a soft hum as an item pops up. It reveals the ship's energy.",
"As your energy rises another item pops up revealing the ship's parts.",
"Console: [Ship Management Online]",
"A words pop up next to the existing [Manual] navigation. You soon realize, the ship reveals more as your energy increases.",
"You continue holding down the two buttons.",
"Console: [Resource Management Online]",
"Console: [Failed to load all Management Systems, terminating start up sequence]",
"Player: Hello Console",
"Console: Hello Player",
"Player: Report System Status",
"Console: Major damage to the ship, Most vital Resources lost. Oxygen Levels below 12%. Ship Protection below 7%. Engine Offline. Less than 10lbs of food left. All weapons offline.",
"Player: 'Sighs', how many days has it been since the incident Console?",
"Console: I am unsure the collision reset my clock. I am unable to give you this information Player.",
"Now confused, you decide to get up, while taking small breath to reserve as much oxygen as possible.",
"Player: Console how's our energy converter?",
"Console: Fully operational",
"By the corner of your eyes you notice a small machine on the ground next to you. On its shell it reads [BOT].",
"Player: Console! Push all remaining power to the BOT project. We're getting this ship back online.",
"Console: [Stopping all operations...]",
"Console: [Redirecting energy...]",
"Console: [Preparing to transfer...]",
"Console: [Transferring energy 0%]",
"Console: [Transferring energy 10%]",
"Console: [Transferring energy 20%]",
"Console: [Transferring energy 30%]",
"Console: [Transferring energy 40%]",
"Console: [Transferring energy 50%]",
"Console: [Transferring energy 70%]",
"Console: [Transferring energy 80%]",
"Console: [Transferring energy 90%]",
"Console: [Transferring energy 97%]",
"The machine in your hands lights up as it comes to life.",
"Player: Console, let's get this ship running again.",
"Console: Of course Player",
"As machine jerks while rested on your hands, you quickly release it. As it drops to the ground the machine quickly finds its way out of the ship as it zips through space searching for resources.",
"Console: [BOT Management Online]",
"Console: [All energy transferred]",
"Console: [Go to the BOT Management tab and produce BOTs]"
]

var generator = {
    power:1,
    max_power:1000,
    output: 0.1,
}

var new_story = "";
var cur_story = 0;
function display(num){
  if(story_text[num] != new_story || story_text[num] == "undefined" && !story_shown){
    $("#story").prepend("<p id=\"msg" + num + "\">" + story_text[num] + "</p>");
    if(story_text[num][0] == "C"){
      $("#msg" + num).css("color", "rgba(230,90,90,1)");
    }
    if(story_text[num] != ""){
      cur_story = num;
    }
    //console.log(cur_story + " NUM: " + num);
    new_story = story_text[num];
    story_text.splice(num, 1, "");
  }
}

function console_display(text){
  $("#story").prepend("<p id=\"console_msg\">" + "Console: [" + text + "]</p>");
}

function player_display(text){
  $("#story").prepend("<p>" + "Player: " + text + "</p>");
}

//Console and You convo part 1//
var show_story = window.setInterval(function(){
  if(!story_shown){
    //console.log(cur_story);
    if(cur_story >= 8 && cur_story <= story_text.length && (left && right)){
      window.setTimeout(function(){
        display(cur_story + 1);
      }, 3);
    }
    if(cur_story >= (story_text.length - 3)){
      switch_tabs_to("bots");
      story_shown = true;
      $("#bots_nav").removeClass("not_displayed");
      resources.batteries.amount = 100;
      addNewBot(resourceBot);
      window.clearInterval(show_story);
    }
  }
}, 4000);

display(0);
window.setTimeout(function(){
  display(1);
}, 2000);

var story_interval = window.setInterval(function(){
  if(left && right){
    display(2);
  }

    if(generator.power >= generator.max_power){
        cell.energy += generator.output;
        $("#energy").removeClass("not_displayed");
        display(3);
    }

    if(cell.energy > 120){
      $("#parts").removeClass("not_displayed");
        display(4);
    }

    if(cell.energy > 140){
      $("#ship_nav").removeClass("not_displayed");
        display(5);
        $(".finds_container").css("color", "#222222");
        $(".finds_container").css("background-color", "#eeeeee");
    }

    if(cell.energy > 170){
        display(6);
        display(7);
    }

    if(cell.energy > 200){
      $("#resources_nav").removeClass("not_displayed");
        display(8);
    }
}, 10);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 var ship_names1 = ["Star", "Galaxy", 
    "Galactic", "Space", "Lord", 
    "Alien", "ET", "Ship", "1", "2", "3", "1st", "2nd", "3rd", "Ray", 
    "Niddle", "Meteor", "Apollo", "13", "Plane", "Craft", 
    "Light", "Death", "Star", "Wings", "X", "A", "Fighter",
    "Darth", "First", "Order", "Imperial", "Rebublic", 
    "Slow", "Speed", "Stealth", "Gunner", "Millennium", "Falcon", ""];

var ship_names2 = ["Star", "Galaxy", 
    "Galactic", "Space", "Lord", 
    "Alien", "ET", "Ship", "1", "2", "3", "1st", "2nd", "3rd", "Ray", 
    "Niddle", "Meteor", "Apollo", "13", "Plane", "Craft", 
    "Light", "Death", "Star", "Wings", "X", "A", "Fighter",
    "Darth", "First", "Order", "Imperial", "Rebublic", 
    "Slow", "Speed", "Stealth", "Gunner", "Millennium", "Falcon", ""];

var parts = {
  amount: 100,
  types:{ //Special parts found by Bots
    silicon:{
      amount:0,
    },
    chip:{
      amount:0,
    },
    sensors:{
      amount:0,
    },
    motors:{
      amount:0,
    },
    controller:{
      amount:0,
    },
    UV_detector:{
      amount:0,
    },
  }
}
function add_part(indx, amount){
  var i = 0;
  for(var key in parts.types){
    i++;
    if(parts.types.hasOwnProperty(key) && i == indx){
      parts.types[key].amount += amount;
    }
  }
  if(i >= indx){
    return 0;
  }
}

add_part(0, 400);

var click_delay = 0;
var autoClick = false;
var convertAll = false;
var left = false;
var right = false;

var resources = {
  batteries: {
    resource: "Battery",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:80,
    rarity:100,
    produce_rate:0.23,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"batteries",
  },

  wires: {
    resource: "Wires",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:0,
    rarity:80,
    produce_rate:0.554,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"wires",
  },

  lightbulbs: {
    resource: "Lightbulbs",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:0,
    rarity:75,
    produce_rate:1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"lightbulb",
  },

  water: {
    resource: "Water",
    types:{
      first: "resources",
      second: "life",
    },
    amount:10,
    rarity:16,
    produce_rate:10,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"water",
  },

  animals: {
    resource: "Animals",
    //Add more type later//
    types:{
      first: "resources",
      second: "life",
    },
    amount:0,//pounds//
    rarity:6,
    produce_rate:0.04,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"animals",
  },
}
var resources_ = [resources.batteries, resources.wires, resources.lightbulbs, resources.water, resources.animals];
function convert(object){
  if(object.types.second == "energy" && !convertAll){
    object.amount -= 1;
    parts.amount -= 0.7;
    cell.energy += object.produce_rate;
  } else if(convertAll){
    cell.energy += object.amount * object.produce_rate;
    parts.amount -= object.amount * 0.2;
    object.amount -= object.amount;
  }
}

function update_resources(){
  for(var i = 0; i < resources_.length; i++){
    var res = resources_[i];
    if(res.amount <= 0){
      res.amount = 0;
    }
    if(res.amount > 0 && res.progress.clicked){
      $("#" + res.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + res.id + "_bar").css("color", "rgb(246, 246, 246)");
      convert(res);
      res.progress.converting = true;
    }
    if(res.progress.clicked == false) {
      $("#" + res.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + res.id + "_bar").css("color", "rgb(246, 246, 246)");
    };

    if(res.amount <= 0) {
      res.progress.clicked = false;
      $("#" + res.id + "_bar").css("background-color", "transparent");
      $("#" + res.id + "_bar").css("color", "#222222");
    } else if(autoClick == true){
      res.progress.clicked = true;
    }

    if(res.type == "energy"){
      GID(res.id + "_bar").innerHTML = res.resource + ":"+ format_numbers(res.amount.toFixed(2));
    } else {
      GID(res.id + "_bar").innerHTML = res.resource + ":"+ format_numbers(res.amount.toFixed(2));
    }
  }
}

var engines = {
  generators: {
    resource: "Generator",
    amount:0,
    rarity:40,
    life_time:30,
    produce_rate:0.8,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"generators",
  },

  chargers: {
    resource: "Charger",
    amount:0,
    rarity:35,
    life_time:20,
    produce_rate:1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"chargers",
  },

  heaters: {
    resource: "Heat",
    amount:0,
    rarity:20,
    life_time:10,
    produce_rate:1.5,
    progress : {
      clicked : false, 
      converting : false,
    },
    id:"heaters",
  },
}

//These generate energy and dont die instantly//
var engines_ = [engines.generators, engines.chargers, engines.heaters];
function convert_engine(object){
  if(convertAll){
    cell.energy += (object.amount * object.life_time) * object.produce_rate;
    parts.amount -= object.amount * 0.2;
    object.amount -= object.amount;
  } else if(object.life_time <= 0){
    object.amount -= 1;
    parts.amount -= 0.7;
    object.life_time = 10;
  } else {
    cell.energy += object.produce_rate;
    object.life_time -= 0.2;
  }
}
function update_engines(){
  for(var i = 0; i < engines_.length; i++){
    var eng = engines_[i];
    if(eng.amount <= 0){
      eng.amount = 0;
    }
    if(eng.amount > 0 && eng.progress.clicked){
      $("#" + eng.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + eng.id + "_bar").css("color", "rgb(240, 240, 240)");
      convert_engine(eng);
      eng.progress.converting = true;
      //console.log(eng.amount);
    }
    if(eng.progress.clicked == false) {
      $("#" + eng.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + eng.id + "_bar").css("color", "rgb(240, 240, 240)");
    }

    if(eng.amount <= 0) {
      eng.progress.clicked = false;
      $("#" + eng.id + "_bar").css("background-color", "transparent");
      $("#" + eng.id + "_bar").css("color", "#222222");
    } else if(autoClick == true){
      eng.progress.clicked = true;
    }
    GID(eng.id + "_bar").innerHTML = eng.resource + ":"+ format_numbers(eng.amount.toFixed(2));
  }
}


var forms = {
  solars: {
    resource: "Solar Energy",
    amount:0,
    rarity:6,
    produce_rate:0.1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"solars",
  },

  thermal: {
    resource: "Thermal Energy",
    amount:0,
    rarity:4,
    produce_rate:0.22,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"thermal",
  },

  chemical: {
    resource: "Chemical Energy",
    amount:0,
    rarity:2,
    produce_rate:0.31,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"chemical",
  },

  electrical: {
    resource: "Electrical Energy",
    amount:0,
    rarity:1,
    produce_rate:0.38,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"electrical",
  },
}

//Forms of energy//
var forms_ = [forms.solars, forms.thermal, forms.chemical, forms.electrical];
function convert_form(object){
  cell.energy += object.amount * object.produce_rate;
}
function update_forms(){
  for(var i = 0; i < forms_.length; i++){
    var form = forms_[i];
    if(form.amount <= 0){
      form.amount = 0;
    }
    if(form.amount > 0 && form.progress.clicked){
      $("#" + form.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + form.id + "_bar").css("color", "rgb(240, 240, 240)");
      convert_form(form);
      form.progress.converting = true;
    } 
    if(form.progress.clicked == false) {
      $("#" + form.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + form.id + "_bar").css("color", "rgb(240, 240, 240)");
    };
    if(form.amount <= 0) {
      $("#" + form.id + "_bar").css("background-color", "transparent");
      $("#" + form.id + "_bar").css("color", "#222222");
    }
    GID(form.id + "_bar").innerHTML = form.resource + ":"+ format_numbers(form.amount.toFixed(2));
  }
}

var mouse = {
  display:"",
  toolTip:false,
  disableTooltip:false,
}

window.onmousemove = function(e){
    var d = GID('mouse');
    d.style.position = "absolute";
    e = e || window.event;
    var position = [e.clientX || e.pageX, e.clientY || e.pageY];
    
    var x = e.clientX;
    var y = e.clientY;
    d.style.left = (position[0] + 30) + "px";
    d.style.top = (position[1]) + "px";
    d.innerHTML = mouse.display;
   ////console.log("X: " + e.clientX + " Y: " + e.clientY);
};  

/*var FPS = 100;
var max_width = 300;
function progress(secs, progres, object){
  var time = object.secs*FPS;
    if(object.progress.progres >= time){
        object.progress.progres = 0;
        $("#" + object.id + "_bar").css("width", (((object.progress.progres/time) * max_width)) + "px");
        object.progress.clicked = false;
        object.progress.progressing = false;
        controlProgressBar(1000/FPS, object);
    } else {
        $("#" + object.id + "_bar").css("width", (((object.progress.progres/time) * max_width)) + "px");
        //object.progress.progressing = true;
        object.progress.progres += 1;
    }
}

var intervalID = null;
function controlProgressBar(frame, object) {
  if(object.progress.progressing){
    return 0;
  }
  if(object.progress.clicked){
    intervalID = setInterval(function(){
     progress(object);
    }, frame);
  } else{
    clearInterval(intervalID);
  }
}*/
