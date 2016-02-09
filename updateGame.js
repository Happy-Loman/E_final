 //Star's//
var stars = [];
//Push 10 stars into the array
for(var i = 0; i < 5000; i++){
    stars.push({
      single:true,
      x:randNum(-map_w, map_w),
      y:randNum(-map_h, map_h),
      r:randNum(0.1, 3),
      energy:0,
      vx:0,
      vy:0,
      pos:i,
      color:"white",
    });
}

function draw_stars(object1){
      ctx.save();
      ctx.translate((offset.directionX), (offset.directionY));
      // clear the viewport
      //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);
      if(cell.checkCollision(object1)){
        object1.x = randNum(-map_w, map_w);
        object1.y = randNum(-map_h, map_h);
      }

      ctx.beginPath();
      ctx.arc(object1.x, object1.y, object1.r, 0, (2 * Math.PI));
      ctx.fillStyle = object1.color;
      ctx.fill();
    
      ctx.restore();
}

function update_stars(){
  for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      var dis = return_distance(camera.x, camera.y, star.x, star.y);
      if(dis < 1800){
        draw_stars(star);
      }
    };
}

function generalUpdate() {
  GID("parts").innerHTML = format_numbers(parts.amount.toFixed(2)) + "<div style=\"font-size:18px;\">parts<div>";
  GID("energy").innerHTML = format_numbers(cell.energy.toFixed(2)) + "<div style=\"font-size:18px;\">energy<div>";
  if(mouse.toolTip && !mouse.disableTooltip){
    GID("mouse").style.display = "inline";
  } else {
    GID("mouse").style.display = "none";
  }

  if(parts.amount <= 0){
    parts.amount = 0;
  }

  if(curr_page == "manual_generator"){
    $(".console").css("color", "#dddddd");
    $(".console").css("background-color", "#222222");
  } else {
    $(".console").css("color", "#222222");
    $(".console").css("background-color", "#dddddd");
  }
  if((left && right) && generator.power <= generator.max_power){
        generator.power += (generator.power*0.01);
        $("#generate_bar").css("width", ((generator.power/generator.max_power) * 299.5) + "px");
    } else if(!(left && right) && generator.power >= 1){
        generator.power -= (generator.power*0.04);
        $("#generate_bar").css("width", ((generator.power/generator.max_power) * 299.5) + "px");
    }
}

function unlockOverTime(){
  
}

var FPS = 100;
window.setInterval(function(){
  if(true){
    //ctx.clearRect(0,0,map_w, map_h); 
    //camera_setter.update();
    bot_update();
    cell.update();
    update_ship();
    update_ship_UI();
    update_stars();
    update_resources();
    update_engines();
    update_forms();
    update_machines();
    generalUpdate();
    unlockOverTime();
    update_player();
  }
}, 1000/FPS);

/*
var start = new Date().getTime();
var clock = 0;
var frameTime = 100;

function gameLoop() {
    var now = new Date().getTime();
    clock += frameTime;
    var dif = now - start - clock;

    updateLogicStuff();

    while(dif >= frameTime) {
         updateLogicStuff();
         clock += frameTime;
         dif -= frameTime;
    }

    updateDrawStuff();
}
*/
/*var loaded = false;
var newGame = true;
var saveName = "will";
if(JSON.parse(localStorage.getItem(saveName)) == null){
    saving();
} else {
    load();
    loaded = true;
}*/

/*window.setInterval(function(){
  window.setTimeout(function(){
    var audio = new Audio('http://cd.textfiles.com/cdaction/cdaction27a/FIFTH/WAV/_WIND2.WAV');
    audio.play();
  }, 4000);

  window.setTimeout(function(){
    var audio_ = new Audio('http://www.starbasec3.com/ghostship/wind2.wav');
    audio_.play();
  }, 8000);
}, 1000 * 14);*/

/*function saveOgState() {
    var save = {
        resources:resources,
        engines:engines,
        forms:forms,
        machines:machines,
        energy:cell.energy,
        parts:parts,
        bots:bots,
    }
    localStorage.setItem(saveName, JSON.stringify("getOgState"));
}

function loadOgState() {
    saveObj = JSON.parse(localStorage.getItem("getOgState"));

    resources = saveObj.resources;
    engines = saveObj.engines;
    forms = saveObj.forms;
    machines = saveObj.machines;
    cell.energy = saveObj.energy;
    parts = saveObj.parts;
    bots = saveObj.bots;
    setObjectArray(saveObj);
}*/

/*function saving() {
    var save = {
        resources:resources,
        engines:engines,
        forms:forms,
        machines:machines,
        energy:cell.energy,
        parts:parts,
        bots:bots,
        curr_page:curr_page,
        resourceBot:resourceBot,
        generatorBot:generatorBot,
        formsBot:formsBot,
        //newGame:newGame,
    }
    localStorage.setItem(saveName, JSON.stringify(save));
}

function setObjectArray(object){
  resources_ = [object.resources.batteries, object.resources.wires, object.resources.lightbulbs];
  engines_ = [object.engines.generators, object.engines.chargers, object.engines.heaters];
  forms_ = [object.forms.solars, object.forms.thermal, object.forms.chemical, object.forms.electrical];
  machinesArr = [object.machines.camera, object.machines.automate, object.machines.botAI];
}

var saveObj;
function load() {
     saveObj = JSON.parse(localStorage.getItem(saveName));

    resources = saveObj.resources;
    engines = saveObj.engines;
    forms = saveObj.forms;
    machines = saveObj.machines;
    cell.energy = saveObj.energy;
    parts = saveObj.parts;
    bots = saveObj.bots;
    formsBot = saveObj.formsBot;
    resourceBot = saveObj.resourceBot;
    generatorBot = saveObj.generatorBot;
    //newGame = saveObj.newGame;
    setObjectArray(saveObj);
}

window.setInterval(function(){
    if(loaded){
      saving();
    }
}, 100);*/

/*function start(){
  window.requestAnimFrame(start);
    ctx.clearRect(0,0,map_w, map_h);

    camera_setter.draw();
    camera_setter.update();

    cell.draw();
    cell.update();

    bot_draw();
    bot_update();
    
    update_packets();

    energytransport.draw();

    UI.update();
}

start();*/
