$(".player_info_container").click(function(){
    $(this).toggleClass("player_info_container_not_displayed");
});

$(".player_Intelligence").hover(function(){
    mouse.display = "Almost anything you do will increase your intelligence."
});

$(".player_o2_level").hover(function(){
    $(this).toggleClass("player_info_container_not_displayed");
});

$(".player_hunger").hover(function(){
    $(this).toggleClass("player_info_container_not_displayed");
});


function click_animation(id){
    $(id).css("background-color", "#222222");
    $(id).css("color", "white");
    window.setTimeout(function(){
        $(id).css("background-color", "white");
        $(id).css("color", "#222222");
    }, 1000);
}

$(".machines").click(function(){
    var x = $(this);
    click_animation(x);
    if(player.hunger.percent >= 35){
        player.intelligence.curr_lvl_amount += randNum(1, 500);
        player.hunger.level -= 10;
    }
});

$(".button").click(function(){
    if(player.hunger.percent >= 35){
        player.intelligence.curr_lvl_amount += randNum(1, 500);
        player.hunger.level -= 10;
    }
})

$(".ship_button").click(function(){
    if(player.hunger.percent >= 35){
        player.intelligence.curr_lvl_amount += randNum(1, 500);
        player.hunger.level -= 10;
    }
})

$(".nav_pointer").click(function(){
    if(player.hunger.percent >= 35){
        player.intelligence.curr_lvl_amount += randNum(1, 500);
        player.hunger.level -= 10;
    }
})

///////Pre game setup/////////
var keyPressed = [];
window.onkeydown = function(e){
  e = e || window.event;
  keyPressed[e.keyCode] = true;
  if(keyPressed[65]){
    left = true;
    $("#a_button").addClass("active");
  }
 
  if(keyPressed[68]){
    right = true;
    $("#d_button").addClass("active");
  }
};

window.onkeyup = function(e){
  e = e || window.event;
  var code = e.which || e.keyCode;
  keyPressed[e.keyCode] = false;
  if(code === 65){ 
    left = false;
    $("#a_button").removeClass("active");
  } 

  if(code === 68){
    right = false;
    $("#d_button").removeClass("active");
  }
};

$(".console").click(function(){
    $(".console").toggleClass("close_console");
});
//////////////////////////////////

////////////////Ship click events///////////////////////
$("#ship_name_container").click(function(){
    var ship_name = prompt("Name here", "|random|remove THE|");
    var ran_name1 = ship_names1[Math.round(randNum(0, 35))];
    var ran_name2 = ship_names2[Math.round(randNum(0, 35))]; 
    if(ship_name == "remove THE"){
        GID("ship_name_container").innerHTML = "<span id=\"ship_name\">"+ ship.name + "</span>"
    } else if(ship_name == "random"){
        ship.name = ran_name1 + " " + ran_name2;
    } else {
        if (ship_name == null || ship_name == " "){
            ship.name = ship.name;
        } else {
            ship.name = ship_name;
        }
    }
});
$("#ship_name").hover(function(){
    mouse.display = "Click to name your ship";
});

$("#ship_upgrader").click(function(){
    upgrade_shipcapacity(machines.ship_capacity);
    if(!machines.ship_capacity.avalable){
        mouse.display = "Not yet unlocked.";
    } else {
        mouse.display = "Increase Capacity." + " Costs " + format_numbers(machines.ship_capacity.increase_cost.toFixed(2)) + "e"; 
    }
});
$("#ship_upgrader").hover(function(){
    mouse.display = "Increase Capacity." + " Costs " + format_numbers(machines.ship_capacity.increase_cost.toFixed(2)) + "e";
});

$("#energy_bar").click(function(){
    window.setTimeout(function(){
        add_energy();
    }, click_delay);
});

$("#energy_bar").hover(function(){
    mouse.display = "This is your ship's energy without it you have no power. Keep it filled by clicking the black bar.";
});

$("#ship_engine").click(function(){
    mouse.display = "Ship's engine. You can't stay in this area forever.";
});
$("#ship_engine").hover(function(){
    mouse.display = "Ship's engine. You can't stay in this area forever.";
});

$("#ship_protection").click(function(){
    mouse.display = "Stay protected from the forces of space and potential enemies? <div>(Protection is calculated based on how large your ship is to how much energy your ship has, how strong your weapon system is and how strong your Shield is.)</div>";
});
$("#ship_protection").hover(function(){
    mouse.display = "Stay protected from the forces of space and potential enemies? <div>(Protection is calculated based on how large your ship is to how much energy your ship has, how strong your weapon system is and how strong your Shield is.)</div>";
});

$("#ship_weapon").click(function(){
    mouse.display = "Current Weapon: " + ship.weapon.type.current_weapon.amount + " " + ship.weapon.type.current_weapon.name + "<div> Consumes " + (ship.weapon.type.current_weapon.energy_consumsion * ship.weapon.type.current_weapon.amount) + " energy per second</div> <div>Double Click to change weapon</div>";
});
$("#ship_weapon").dblclick(function(){
    $("#weapon_select").toggleClass("not_displayed");
    $("#ship_weapon").toggleClass("not_displayed");
    mouse.display = "Current Weapon: " + ship.weapon.type.current_weapon.name + " " + ship.weapon.type.current_weapon.amount + "<div> Consumes " + (ship.weapon.type.current_weapon.energy_consumsion * ship.weapon.type.current_weapon.amount) + " energy per second</div> <div>Double Click to change weapon</div>";
});
$("#ship_weapon").hover(function(){
    mouse.display = "Current Weapon: " + ship.weapon.type.current_weapon.name + " " + ship.weapon.type.current_weapon.amount + "<div> Consumes " + (ship.weapon.type.current_weapon.energy_consumsion * ship.weapon.type.current_weapon.amount) + " energy per second</div> <div>Double Click to change weapon</div>";
});
$("#weapon_select").change(function(){
    $("#weapon_select").toggleClass("not_displayed");
    ship.weapon.type.current_weapon.name = String($(this).val());
    $("#ship_weapon").toggleClass("not_displayed");
});

$("#ship_shield").click(function(){
    mouse.display = "Shield power: " + (ship.shield.og_power * ship.shield.lvl).toFixed(2) + ". The higher the power, the more protected you are. Disable to upgrade.";
    ship.shield.status = !ship.shield.status;
});
$("#ship_shield").hover(function(){
    mouse.display = "Shield power: " + (ship.shield.og_power * ship.shield.lvl).toFixed(2) + ". The higher the power, the more protected you are. Disable to upgrade.";
});

$("#ship_time").click(function(){
    mouse.display = "Can you tell what time it is? (1 minutes in game is 0.5 seconds)";
});
$("#ship_time").hover(function(){
    mouse.display = "Can you tell what time it is? (1 minutes in game is 0.5 seconds)";
});

var remove_amount = 1; //how many parts to remove
var removing_hover = false; //Hpver to remove
var removing_click = false; //Click to double check
$("#ship_mass").click(function(){
    mouse.display = "As you add parts to this ship, it will grow. <div>(Ship mass is calculated based on how many parts your ship has acquired.)</div> <div>Click and hover to remove parts</div>";
    if(!removing_click){
        removing_click = true;
    } else {
        removing_click = false;
    }
});
$("#ship_mass").mouseenter(function(){
    mouse.display = "As you add parts to this ship, it will grow. <div>(Ship mass is calculated based on how many parts your ship has acquired.)</div> <div>Click and hover to remove parts</div>";
    removing_hover = true;
});
$("#ship_mass").mouseleave(function(){
    removing_hover = false;
});
window.setInterval(function(){
    if(removing_click && removing_hover){
        remove_amount *= 1.3;
        if((ship.mass - remove_amount) >= 1000){
            parts.amount -= remove_amount;
        }
    } else {
        remove_amount = 1;
    }
}, 100);


$("#ship_energy_rate").click(function(){
    mouse.display = "It takes this much energy to power all the BOTS and components of this ship";
});
$("#ship_energy_rate").hover(function(){
    mouse.display = "It takes this much energy to power all the BOTS and components of this ship";
});

$("#ship_oxygen_lvl").click(function(){
    mouse.display = "The percentage of the ship that has oxygen. Water gets converted into oxygen over time. <div>" + format_numbers((ship.life.oxygen.water_reserve).toFixed(2)) + " gallons of water.</div>";
});
$("#ship_oxygen_lvl").hover(function(){
    mouse.display = "The percentage of the ship that has oxygen. Water gets converted into oxygen over time. <div>" + format_numbers((ship.life.oxygen.water_reserve).toFixed(2)) + " gallons of water.</div>";
});

$("#space_suit_").click(function(){
    mouse.display = "Your space suit uses oxygen from your tank and transfers it to you anywhere on the ship. Disable to upgrade. <div>" + format_numbers(player.space_suit.oxygen_reserve.amount.toFixed(2)) + " gallons of water.</div>";
    ship.space_suit.status = !ship.space_suit.status;
});
$("#space_suit_").hover(function(){
    mouse.display = "Your space suit uses oxygen from your tank and transfers it to you anywhere on the ship. Disable to upgrade. <div>" + format_numbers(player.space_suit.oxygen_reserve.amount.toFixed(2)) + " gallons of water.</div>";
});

$("#ship_food").click(function(){
    feed_player();
    mouse.display = "How can you live without food? Animals your BOTS harvest will be turned to food. Some may rot over time. <div>Click to sate your hunger.</div>";
});
$("#ship_food").hover(function(){
    mouse.display = "How can you live without food? Animals your BOTS harvest will be turned to food. Some may rot over time. <div>Click to sate your hunger.</div>";
});

$("#ship_gravity").click(function(){
    mouse.display = "As your ship grows you will gain mass and thus have a larger gravitational pull. Possibly being the envy of the galaxy.";
});
$("#ship_gravity").hover(function(){
    mouse.display = "As your ship grows you will gain mass and thus have a larger gravitational pull. Possibly being the envy of the galaxy.";
});

////////////////Ship click events End//////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


/////////////////Resources Click events/////////////////////
$("#batteries").click(function(){
    window.setTimeout(function(){
        resources.batteries.progress.clicked = !resources.batteries.progress.clicked;
        resources.batteries.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((resources.batteries.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#batteries").hover(function(){
    mouse.display = "Produces " + format_numbers((resources.batteries.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#wires").click(function(){ 
    window.setTimeout(function(){
        resources.wires.progress.clicked = !resources.wires.progress.clicked;
        resources.wires.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((resources.wires.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#wires").hover(function(){ 
    mouse.display = "Produces " + format_numbers((resources.wires.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#lightbulbs").click(function(){
    window.setTimeout(function(){
        resources.lightbulbs.progress.clicked = !resources.lightbulbs.progress.clicked;
        resources.lightbulbs.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((resources.lightbulbs.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#lightbulbs").hover(function(){
    mouse.display = "Produces " + format_numbers((resources.lightbulbs.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#water").click(function(){
    window.setTimeout(function(){
        resources.water.progress.clicked = !resources.water.progress.clicked;
        resources.water.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((resources.water.produce_rate).toFixed(2)) + " drops of water every tick. To be converted into oxygen";
});
$("#water").hover(function(){
    mouse.display = "Produces " + format_numbers((resources.water.produce_rate).toFixed(2)) + " drops of water every tick. To be converted into oxygen";
});

$("#animals").click(function(){
    window.setTimeout(function(){
        resources.animals.progress.clicked = !resources.animals.progress.clicked;
        resources.animals.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((resources.animals.produce_rate).toFixed(2)) + " pounds of food every tick.";
});
$("#animals").hover(function(){
    mouse.display = "Produces " + format_numbers((resources.animals.produce_rate).toFixed(2)) + " pounds of food every tick.";
});

$("#generators").click(function(){
    window.setTimeout(function(){
        engines.generators.progress.clicked = !engines.generators.progress.clicked;
        engines.generators.progress.converting = true;   
    }, click_delay);
    mouse.display = "Produces " + format_numbers((engines.generators.produce_rate).toFixed(2)) + " Energy every tick. " + "Has life time of " + format_numbers(engines.generators.life_time.toFixed(2));
});
$("#generators").hover(function(){
    mouse.display = "Produces " + format_numbers((engines.generators.produce_rate).toFixed(2)) + " Energy every tick. " + "Has life time of " + format_numbers(engines.generators.life_time.toFixed(2));
});

$("#chargers").click(function(){
    window.setTimeout(function(){
        engines.chargers.progress.clicked = !engines.chargers.progress.clicked;
        engines.chargers.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((engines.chargers.produce_rate).toFixed(2)) + " Energy every tick." + "Has life time of " + format_numbers(engines.chargers.life_time.toFixed(2));
});
$("#chargers").hover(function(){
    mouse.display = "Produces " + format_numbers((engines.chargers.produce_rate).toFixed(2)) + " Energy every tick." + "Has life time of " + format_numbers(engines.chargers.life_time.toFixed(2));
});

$("#heaters").click(function(){
    window.setTimeout(function(){
        engines.heaters.progress.clicked = !engines.heaters.progress.clicked;
        engines.heaters.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((engines.heaters.produce_rate).toFixed(2)) + " Energy every tick." + "Has life time of " + format_numbers(engines.heaters.life_time.toFixed(2));
});
$("#heaters").hover(function(){
    mouse.display = "Produces " + format_numbers((engines.heaters.produce_rate).toFixed(2)) + " Energy every tick." + "Has life time of " + format_numbers(engines.heaters.life_time.toFixed(2));
});

$("#thermal").click(function(){
    window.setTimeout(function(){
        forms.thermal.progress.clicked = !forms.thermal.progress.clicked;
        forms.thermal.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((forms.thermal.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#thermal").hover(function(){
    mouse.display = "Produces " + format_numbers((forms.thermal.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#chemical").click(function(){
    window.setTimeout(function(){
        forms.chemical.progress.clicked = !forms.chemical.progress.clicked;
        forms.chemical.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((forms.chemical.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#chemical").hover(function(){
    mouse.display = "Produces " + format_numbers((forms.chemical.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#solars").click(function(){
    window.setTimeout(function(){
        forms.solars.progress.clicked = !forms.solars.progress.clicked;
        forms.solars.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((forms.solars.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#solars").hover(function(){
    mouse.display = "Produces " + format_numbers((forms.solars.produce_rate).toFixed(2)) + " Energy every tick.";
});

$("#electrical").click(function(){
    window.setTimeout(function(){
        forms.electrical.progress.clicked = !forms.electrical.progress.clicked;
        forms.electrical.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + format_numbers((forms.electrical.produce_rate).toFixed(2)) + " Energy every tick.";
});
$("#electrical").hover(function(){
    mouse.display = "Produces " + format_numbers((forms.electrical.produce_rate).toFixed(2)) + " Energy every tick.";
});
/////////////////Resources Click events end/////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

/////////////////Navigation Click events/////////////////////
var curr_page = "manual_generator"

function switch_tabs_to(nav){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#"+nav).toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#" + nav +"_nav").css("color", "rgb(200, 60, 60)");

    curr_page = nav;
}
$("#" + curr_page + "_nav").css("color", "rgb(200, 60, 60)");
$("#ship_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#ship").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#ship_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "ship";
});

$("#resources_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#resources").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#resources_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "resources";
});

$("#generator_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#generator").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#generator_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "generator";
});

$("#forms_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#forms").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#forms_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "forms";
});

$("#upgrades_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#upgrades").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#upgrades_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "upgrades";
});

$("#settings_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#settings").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#settings_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "settings";
});

$("#bots_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#bots").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#bots_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "bots";
    display_bots();
});

$("#manual_generator_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#manual_generator").toggleClass("not_displayed");

    $("#" + curr_page + "_nav").css("color", "white");
    $("#manual_generator_nav").css("color", "rgb(200, 60, 60)");

    curr_page = "manual_generator";
});
///////////////Navigation Click events end///////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/////////////////BOT Click events/////////////////////
$("#resource_bot").click(function(){
    addNewBot(resourceBot);
    mouse.display = "Cost <div>" + format_numbers(resourceBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(resourceBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(resourceBot.cost.pureEnergy.toFixed(2)) + " Energy</div>";
});
$("#resource_bot").hover(function(){
    mouse.display = "Cost <div>" + format_numbers(resourceBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(resourceBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(resourceBot.cost.pureEnergy.toFixed(2)) + " Energy</div>";
});

$("#generator_bot").click(function(){
    addNewBot(generatorBot);
    mouse.display = "Cost <div>" + format_numbers(generatorBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(generatorBot.cost.wires.toFixed(2)) + " Wires</div>" + "<div>" + format_numbers(generatorBot.cost.lightbulbs.toFixed(2)) + " Lightbulbs</div>" + "<div>" + format_numbers(generatorBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(generatorBot.cost.pureEnergy.toFixed(2)) + " Energy</div>" ;
});
$("#generator_bot").hover(function(){
    mouse.display = "Cost <div>" + format_numbers(generatorBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(generatorBot.cost.wires.toFixed(2)) + " Wires</div>" + "<div>" + format_numbers(generatorBot.cost.lightbulbs.toFixed(2)) + " Lightbulbs</div>" + "<div>" + format_numbers(generatorBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(generatorBot.cost.pureEnergy.toFixed(2)) + " Energy</div>" ;
});

$("#forms_bot").click(function(){
    addNewBot(formsBot);
    mouse.display = "Cost <div>" + format_numbers(formsBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(formsBot.cost.wires.toFixed(2)) + " Wires</div>" + "<div>" + format_numbers(formsBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>" + format_numbers(formsBot.cost.generators.toFixed(2)) + " generators</div>" + "<div>" + format_numbers(formsBot.cost.chargers.toFixed(2)) + " chargers</div>" + "<div>" + format_numbers(formsBot.cost.heaters.toFixed(2)) + " Heat Sources</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(formsBot.cost.pureEnergy.toFixed(2)) + " Energy</div>" ;
});
$("#forms_bot").hover(function(){
    mouse.display = "Cost <div>" + format_numbers(formsBot.cost.batteries.toFixed(2)) + " Batteries</div>" + "<div>" + format_numbers(formsBot.cost.wires.toFixed(2)) + " Wires</div>" + "<div>" + format_numbers(formsBot.cost.energy.toFixed(2)) + " Energy</div>" + "<div>" + format_numbers(formsBot.cost.generators.toFixed(2)) + " generators</div>" + "<div>" + format_numbers(formsBot.cost.chargers.toFixed(2)) + " chargers</div>" + "<div>" + format_numbers(formsBot.cost.heaters.toFixed(2)) + " Heat Sources</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + format_numbers(formsBot.cost.pureEnergy.toFixed(2)) + " Energy</div>" ;
});

$(".bot_display_").hover(function(){
    mouse.display = "Click to name";
})

$("#sort").click(function(){
    var selectBox = document.getElementById("sort_select");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);
    sort_bot_display(String(selectedValue));
    console.log(JSON.stringify(selectedValue));
});


/////////////////BOTs Click events end/////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/////////////////Tool Tip Click events/////////////////////
$(".toolTip").mouseenter(function(){
    mouse.toolTip = true;
});

$(".toolTip").mouseleave(function(){
    mouse.toolTip = false;
});
/////////////////Tool Tip Click events end/////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/////////////////Upgrades Click events/////////////////
$("#increase_intelligence").click(function(){
    addMachines(machines.increase_intelligence);
    update_machines();
    mouse.display = "<div>Training your brain will increase your intelligence growth rate. Traning your brain takes some time, the smarter you get the more time it will take to increase your intelligence.</div> <div>intelligence growth rate: [ " + format_numbers(player.intelligence.og_upgrade_amount.toFixed(2)) + "]</div>";
});
$("#increase_intelligence").hover(function(){
    mouse.display = "<div>Training your brain will increase your intelligence growth rate. Traning your brain takes some time, the smarter you get the more time it will take to increase your intelligence.</div> <div>intelligence growth rate: [ " + format_numbers(player.intelligence.og_upgrade_amount.toFixed(2)) + "]</div>";
});

$("#space_helmet").click(function(){
    addMachines(machines.space_helmet);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.space_helmet.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_helmet.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_helmet.cost.intelligence + "] </div>";
});
$("#space_helmet").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.space_helmet.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_helmet.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_helmet.cost.intelligence + "] </div>";
});

$("#space_gloves").click(function(){
    addMachines(machines.space_gloves);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.space_gloves.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_gloves.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_gloves.cost.intelligence + "] </div>";
});
$("#space_gloves").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.space_gloves.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_gloves.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_gloves.cost.intelligence + "] </div>";
});


$("#space_pants").click(function(){
    addMachines(machines.space_pants);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.space_pants.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_pants.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_pants.cost.intelligence + "] </div>";
});
$("#space_pants").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.space_pants.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_pants.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_pants.cost.intelligence + "] </div>";
});


$("#space_boots").click(function(){
    addMachines(machines.space_boots);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.space_boots.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_boots.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_boots.cost.intelligence + "] </div>";
});
$("#space_boots").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.space_boots.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_boots.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_boots.cost.intelligence + "] </div>";
});


$("#space_suit").click(function(){
    addMachines(machines.space_suit);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.space_suit.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_suit.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_suit.cost.intelligence + "] </div>";
});
$("#space_suit").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.space_suit.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.space_suit.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.space_suit.cost.intelligence + "] </div>";
});


$("#suit_update").click(function(){
    addMachines(machines.suit_update);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.suit_update.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.suit_update.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.suit_update.cost.intelligence + "] </div>";
});
$("#suit_update").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.suit_update.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.suit_update.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.suit_update.cost.intelligence + "] </div>";
});


$("#more_storage").click(function(){
    addMachines(machines.ship_capacity);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.ship_capacity.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.ship_capacity.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.ship_capacity.cost.intelligence + "] </div>";
});
$("#more_storage").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.ship_capacity.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.ship_capacity.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.ship_capacity.cost.intelligence + "] </div>";
});

$("#automation").click(function(){
    addMachines(machines.automate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.automate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.automate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.automate.cost.intelligence + "] </div>";
});
$("#automation").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.automate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.automate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.automate.cost.intelligence + "] </div>";
});

$("#convert_all_").click(function(){
    addMachines(machines.convert_all);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.convert_all.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.convert_all.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.convert_all.cost.intelligence + "] </div>";
});
$("#convert_all_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.convert_all.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.convert_all.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.convert_all.cost.intelligence + "] </div>";
});

$("#betterAI").click(function(){
    addMachines(machines.botAI);
    update_machines();
    mouse.display = "<div>Next upgrade</div>" + format_numbers(machines.botAI.cost.energy.toFixed(2)) + " Energy " + format_numbers(machines.botAI.cost.parts.toFixed(2)) + " parts</div><div>Requires intelligence level: [" + machines.botAI.cost.intelligence + "] </div>";
});
$("#betterAI").hover(function(){
    mouse.display = "<div>Next upgrade</div>" + format_numbers(machines.botAI.cost.energy.toFixed(2)) + " Energy " + format_numbers(machines.botAI.cost.parts.toFixed(2)) + " parts</div><div>Requires intelligence level: [" + machines.botAI.cost.intelligence + "] </div>";
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#engine_bots_").click(function(){
    addMachines(machines.engine_bots_);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.engine_bots_.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.engine_bots_.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.engine_bots_.cost.intelligence + "] </div>" ;
});
$("#engine_bots_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.engine_bots_.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.engine_bots_.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.engine_bots_.cost.intelligence + "] </div>" ;
});

$("#forms_bots_").click(function(){
    addMachines(machines.forms_bots_);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.forms_bots_.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.forms_bots_.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.forms_bots_.cost.intelligence + "] </div>";
});
$("#forms_bots_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.forms_bots_.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.forms_bots_.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.forms_bots_.cost.intelligence + "] </div>";
});

$("#battery_rate").click(function(){
    addMachines(machines.battery_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.battery_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.battery_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.batteries.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.battery_rate.cost.intelligence + "] </div>" ;
});
$("#battery_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.battery_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.battery_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.batteries.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.battery_rate.cost.intelligence + "] </div>"
});

$("#wires_rate").click(function(){
    addMachines(machines.wires_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.wires_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.wires_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.wires.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.wires_rate.cost.intelligence + "] </div>";
});
$("#wires_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.wires_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.wires_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.wires.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.wires_rate.cost.intelligence + "] </div>";
});

$("#lightbuld_rate").click(function(){
    addMachines(machines.lightbuld_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.lightbuld_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.lightbuld_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.lightbulbs.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.lightbuld_rate.cost.intelligence + "] </div>";
});
$("#lightbuld_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.lightbuld_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.lightbuld_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.lightbulbs.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.lightbuld_rate.cost.intelligence + "] </div>";
});

$("#water_rate").click(function(){
    addMachines(machines.water_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.water_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.water_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.water.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.water_rate.cost.intelligence + "] </div>";
});
$("#water_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.water_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.water_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.water.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.water_rate.cost.intelligence + "] </div>";
});

$("#food_rate").click(function(){
    addMachines(machines.food_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.food_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.food_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.animals.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.food_rate.cost.intelligence + "] </div>";
});
$("#food_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.food_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.food_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(resources.animals.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.food_rate.cost.intelligence + "] </div>";
});

$("#generator_rate").click(function(){
    addMachines(machines.generator_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.generator_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.generator_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.generators.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.generator_rate.cost.intelligence + "] </div>";
});
$("#generator_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.generator_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.generator_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.generators.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.generator_rate.cost.intelligence + "] </div>";
});

$("#charger_rate").click(function(){
    addMachines(machines.charger_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.charger_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.charger_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.chargers.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.charger_rate.cost.intelligence + "] </div>";
});
$("#charger_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.charger_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.charger_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.chargers.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.charger_rate.cost.intelligence + "] </div>";
});

$("#heat_rate").click(function(){
    addMachines(machines.heat_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.heat_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.heat_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.heaters.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.heat_rate.cost.intelligence + "] </div>";
});
$("#heat_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.heat_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.heat_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(engines.heaters.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.heat_rate.cost.intelligence + "] </div>";
});

$("#solar_rate").click(function(){
    addMachines(machines.solar_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.solar_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.solar_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.solars.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.solar_rate.cost.intelligence + "] </div>";
});
$("#solar_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.solar_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.solar_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.solars.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.solar_rate.cost.intelligence + "] </div>";
});

$("#thermal_rate").click(function(){
    addMachines(machines.thermal_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.thermal_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.thermal_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.thermal.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.thermal_rate.cost.intelligence + "] </div>";
});
$("#thermal_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.thermal_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.thermal_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.thermal.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.thermal_rate.cost.intelligence + "] </div>";
});

$("#chemical_rate").click(function(){
    addMachines(machines.chemical_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.chemical_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.chemical_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.chemical.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.chemical_rate.cost.intelligence + "] </div>";
});
$("#chemical_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.chemical_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.chemical_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.chemical.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.chemical_rate.cost.intelligence + "] </div>";
});

$("#electrical_rate").click(function(){
    addMachines(machines.electrical_rate);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.electrical_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.electrical_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.electrical.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.electrical_rate.cost.intelligence + "] </div>";
});
$("#electrical_rate").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.electrical_rate.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.electrical_rate.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Current Production Rate " + format_numbers(forms.electrical.produce_rate.toFixed(2)) + " per tick </div> <div>Requires intelligence level: [" + machines.electrical_rate.cost.intelligence + "] </div>";
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
$("#weapons").click(function(){
    addMachines(machines.weapons);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.weapons.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.weapons.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.weapons.cost.intelligence + "]</div>";
});
$("#weapons").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.weapons.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.weapons.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.weapons.cost.intelligence + "]</div>";
});
$("#ray").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.ray.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.ray.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.ray.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.ray);
});
$("#ray").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.ray.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.ray.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.ray.intelligence + "] </div>";
});

$("#plasma_").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.plasma.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.plasma.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.plasma.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.plasma);
});
$("#plasma_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.plasma.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.plasma.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.plasma.intelligence + "] </div>";
});

$("#machine_").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.machine.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.machine.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.machine.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.machine);
});
$("#machine_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.machine.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.machine.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.machine.intelligence + "] </div>";
});

$("#missile_").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.missile.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.missile.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.missile.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.missile);
});
$("#missile_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.missile.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.missile.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.missile.intelligence + "] </div>";
});

$("#particle_").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.particle.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.particle.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.particle.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.particle);
});
$("#particle_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.particle.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.particle.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.particle.intelligence + "] </div>";
});

$("#laser_").click(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.laser.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.laser.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.laser.intelligence + "] </div>";
    upgrade_weapon(ship.weapon.type.laser);
});
$("#laser_").hover(function(){
    mouse.display = "<div>You need " + format_numbers(ship.weapon.type.laser.cost.toFixed(2)) + " energy to access this.</div> <div>Current amount " + format_numbers(ship.weapon.type.laser.amount.toFixed(2)) + " </div> <div>Requires intelligence level: [" + ship.weapon.type.laser.intelligence + "] </div>";
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#time").click(function(){
    addMachines(machines.time);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.time.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.time.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.time.cost.intelligence + "] </div>";
});
$("#time").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.time.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.time.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.time.cost.intelligence + "] </div>";
});

$("#consumption").click(function(){
    addMachines(machines.consumption);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.consumption.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.consumption.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.consumption.cost.intelligence + "] </div>";
});
$("#consumption").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.consumption.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.consumption.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.consumption.cost.intelligence + "] </div>";
});

$("#oxygen").click(function(){
    addMachines(machines.oxygen);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.oxygen.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.oxygen.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.oxygen.cost.intelligence + "] </div>";
});
$("#oxygen").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.oxygen.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.oxygen.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.oxygen.cost.intelligence + "] </div>";
});

$("#food").click(function(){
    addMachines(machines.food);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.food.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.food.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.food.cost.intelligence + "] </div>";
});
$("#food").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.food.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.food.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.food.cost.intelligence + "] </div>";
});

$("#protection").click(function(){
    addMachines(machines.protection);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.protection.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.protection.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.protection.cost.intelligence + "] </div>";
});
$("#protection").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.protection.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.protection.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.protection.cost.intelligence + "] </div>";
});

$("#shield").click(function(){
    addMachines(machines.shield);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.shield.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.shield.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Shield status active: " + ship.shield.status + "</div> <div>Requires intelligence level: [" + machines.shield.cost.intelligence + "] </div>";
});
$("#shield").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.shield.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.shield.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Shield status active: " + ship.shield.status + "</div> <div>Requires intelligence level: [" + machines.shield.cost.intelligence + "] </div>";
});

$("#mass").click(function(){
    addMachines(machines.mass);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.mass.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.mass.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.mass.cost.intelligence + "] </div>";
});
$("#mass").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.mass.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.mass.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.mass.cost.intelligence + "] </div>";
});

$("#gravity").click(function(){
    addMachines(machines.gravity);
    update_machines();
    mouse.display = "<div>You need " + format_numbers(machines.gravity.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.gravity.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.gravity.cost.intelligence + "] </div>";
});
$("#gravity").hover(function(){
    mouse.display = "<div>You need " + format_numbers(machines.gravity.cost.energy.toFixed(2)) + " energy and " + format_numbers(machines.gravity.cost.parts.toFixed(2)) + " parts to access this.</div> <div>Requires intelligence level: [" + machines.gravity.cost.intelligence + "] </div>";
});

$("#engine").click(function(){
    addMachines(machines.engine);
    update_machines();
    mouse.display = "<div>" + (((cell.energy/machines.engine.cost.energy)*(parts.amount/machines.engine.cost.parts)).toFixed(2) * 100) + "% Done.</div> <div>Requires intelligence level: [" + machines.engine.cost.intelligence + "] </div>";
});
$("#engine").hover(function(){
    mouse.display = "<div>" + (((cell.energy/machines.engine.cost.energy)*(parts.amount/machines.engine.cost.parts)).toFixed(2) * 100) + "% Done.</div> <div>Requires intelligence level: [" + machines.engine.cost.intelligence + "] </div>";
});
/////////////////Upgrades Click events end/////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//options menu//
$("#automation_toggle").click(function(){
    autoClick = !autoClick;
    if(autoClick){
        $("#automation_toggle").css("background-color", "green");
    } else {
        $("#automation_toggle").css("background-color", "transparent");
    }
});

$("#convert_all_toggle").click(function(){
    convertAll = !convertAll;
    if(convertAll){
        $("#convert_all_toggle").css("background-color", "green");
    } else {
        $("#convert_all_toggle").css("background-color", "transparent");
    }
});

$("#tooltip_toggle").click(function(){
    mouse.disableTooltip = !mouse.disableTooltip;
    if(mouse.disableTooltip){
        $("#tooltip_toggle").css("background-color", "red");
    } else {
        $("#tooltip_toggle").css("background-color", "transparent");
    }
});

var saveName = "energy_save4";
function saving() {
    var save = {
        story_shown:story_shown,
        ship:ship,
        player:player,
        resources:resources,
        engines:engines,
        forms:forms,
        machines:machines,
        energy:cell.energy,
        parts:parts,
        bots:bots,
        resourceBot:resourceBot,
        generatorBot:generatorBot,
        formsBot:formsBot,
        upgrades_unlocked:upgrades_unlocked,
    }
    localStorage.setItem(saveName, JSON.stringify(save));
    console.log("Saved");
}

var saveObj;
function setObjectArray(object){
  resources_ = [resources.batteries, resources.wires, resources.lightbulbs, resources.water, resources.animals];
  engines_ = [object.engines.generators, object.engines.chargers, object.engines.heaters];
  forms_ = [object.forms.solars, object.forms.thermal, object.forms.chemical, object.forms.electrical];
}

var loaded = false;
function load() {
    saveObj = JSON.parse(localStorage.getItem(saveName));
    story_shown = saveObj.story_shown;
    parts = saveObj.parts;
    ship = saveObj.ship;
    player = saveObj.player;
    resources = saveObj.resources;
    engines = saveObj.engines;
    forms = saveObj.forms;
    machines = saveObj.machines;
    cell.energy = saveObj.energy;
    bots = saveObj.bots;
    formsBot = saveObj.formsBot;
    resourceBot = saveObj.resourceBot;
    generatorBot = saveObj.generatorBot;
    upgrades_unlocked = saveObj.upgrades_unlocked;
    setObjectArray(saveObj);

    loaded = true;
}

if (localStorage.getItem(saveName) === null) {
  saving();
  loaded = true;
} else {
  load();
}

window.setInterval(function(){
    if(loaded){
        saving();
    }
}, 1000);

function reset(){
    var reseting = prompt("You are about to rest your game, if you wish to continue please type \"I wish to reset my game\".");
    if(reseting == "I wish to reset my game"){
        loaded = false;
        localStorage.clear();
        location.reload();
    } else {
        alert("Have fun. :)")
    }
}

$("#reset").click(function(){
    reset();
})

//options menu end//
