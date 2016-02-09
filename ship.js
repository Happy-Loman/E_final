var ship = {
	name: "X-Wing",
	energy: 1000,
	max_energy: 1000,
	mass:0, //kilogrames
	consume_rate: 0,//Consumes this amount of energy every second//
	space_suit:{
		status: true,
	},

	engine: {
		status: false,
		power: 0,
	},

	shield:{
		status:false,
		lvl:0,
		og_power:100,
		power:100,
	},

	weapon: {
		status: false,
		type: {
			current_weapon: {
				bought:false,
				name: "Ray Gun",
				current_weapon_object: 0,
				amout:0,
				power:0,
				speed:0,
				energy_consumsion:0,
			},

			none: {
				bought:false,
				name: "No Weapon",
				amount:0,
				power: 0,
				speed: 0,
				energy_consumsion: 0, //5 energy per tick //
				cost: 0, //Energy cost to unlock//
				intelligence:0,
			},

			ray: {
				bought:false,
				name: "Ray Gun",
				amount:1,
				power: 10,
				speed: 5,
				energy_consumsion: 5, //5 energy per tick //
				cost: 10, //Energy cost to unlock//
				intelligence:10,
			},

			plasma: {
				bought:false,
				name:"Plasma",
				amount:1,
				power: 1000,
				speed: 40,
				energy_consumsion: 100,
				cost: 10000.00, //Energy cost to unlock//
				intelligence:20,
			},

			machine: {
				bought:false,
				name: "Machine",
				amount:1,
				power: 5000, 
				speed: 60,
				energy_consumsion: 1000,
				cost: 1000000.00, //Energy cost to unlock//
				intelligence:33,
			},

			missile: {
				bought:false,
				name: "Missile",
				amount:1,
				power: 9000,
				speed: 80, //10 shot per tick.//
				energy_consumsion: 5000, //5 energy per tick //
				cost: 10000000.00, //Energy cost to unlock//
				intelligence:42,
			},

			particle: {
				bought:false,
				name: "Particle Ray",
				amount:1,
				power: 10000,
				speed: 100, 
				energy_consumsion: 10000, 
				cost: 20000000.00, //Energy cost to unlock//
				intelligence:49,
			},

			laser: {
				bought:false,
				name: "Laser Show",
				amount:1,
				power: 70000, 
				speed: 150, 
				energy_consumsion: 900000,
				cost: 1000000000.00, //Energy cost to unlock//
				intelligence:60,
			},
		},
	},

	protection: {
		status: false,
		strength: 0,
	},

	life: {
		oxygen:{
			lvl: 2,
			oxygen_lvl:0,
			max_oxygen:0,
			water_reserve: 100,
		},
		food: 0,
		gravity_pull: 0,
	},

	time: {
		day: 0,
		hour: 0,
		min: 0,
		sec: 0,
	},
}

function add_oxygen(){
	ship.life.oxygen.oxygen_lvl = (ship.life.oxygen.water_reserve * 0.23)/2;
	ship.life.oxygen.max_oxygen = (ship.mass * 0.22) + (ship.energy * 0.22) + (ship.life.food * 0.72);
	//console.log("o2: " + oxygen_lvl + " d: " + max_oxygen);
	if(ship.life.oxygen.oxygen_lvl >= ship.life.oxygen.max_oxygen){
		ship.life.oxygen.lvl = 100;
	} else {
		ship.life.oxygen.lvl = (ship.life.oxygen.oxygen_lvl/ship.life.oxygen.max_oxygen) * 100;
	}
}

function add_energy(){
	if((ship.energy <= ship.max_energy && cell.energy > (ship.max_energy - ship.energy)) || ship.energy >= ship.max_energy){
		cell.energy -= (ship.max_energy - ship.energy);
        ship.energy += (ship.max_energy - ship.energy);
        //console.log(ship.energy);
    } else {
    	var takeAmount = cell.energy/2;
        ship.energy += takeAmount;
    	cell.energy -= takeAmount;
    }
}

function upgrade_weapon(object){
	if(cell.energy >= object.cost){
		object.bought = true;
		object.amount += 1;
		cell.energy -= object.cost;
	}
}

function upgrade_shipcapacity(object){
	if(object.avalable && cell.energy >= object.increase_cost){
        ship.max_energy += object.increase_cost;
        object.increase_cost += (object.increase_cost * 0.2);
        cell.energy -= object.increase_cost;
    } else if(!object.avalable){
        mouse.display = "Not yet unlocked.";
    } else if(cell.energy < object.increase_cost){
        mouse.display = "Increase Capacity." + " Costs " + format_numbers(object.increase_cost.toFixed(2)) + "e";
    }
}

function feed_player(){
	var food_needed = player.hunger.max - player.hunger.level;
	if(ship.life.food <= 0){
		return 0;
	} else {
		player.hunger.max += (player.hunger.max * 0.06);
	}
	if(ship.life.food <= food_needed || player.hunger.level >= player.hunger.max){
		if(ship.life.food <= food_needed){
			player.hunger.level += ship.life.food;
			ship.life.food = 0;
		}
	} else {
		if(food_needed > 0){
			player.hunger.level += food_needed;
			ship.life.food -= food_needed;
		}
	}	
}

window.setTimeout(function(){
	ship.weapon.type.current_weapon.name = "No Weapon";
}, 1000);
var meal = 0;
function update_ship(){
	if((((cell.energy/ship.mass)/(1000 * 10)) * 100) <= 0){
		ship.engine.power = 1;
	} else if((((cell.energy/ship.mass)/(1000 * 10)) * 100) < 97 && (((cell.energy/ship.mass)/(1000 * 10)) * 100) > 0){
		ship.engine.power = (((cell.energy/ship.mass)/(1000 * 10)) * 100);
		ship.engine.status = false;
	} else {
		ship.engine.status = true;
		ship.engine.power = (((cell.energy/ship.mass)/(1000 * 10)) * 100);
		if(ship.engine.power >= 100){
			ship.engine.power = 100;
		}
	}

	if(ship.weapon.type.ray.bought){
		$("#plasma_").removeClass("not_displayed");
	}
	if(ship.weapon.type.plasma.bought){
		$("#plasma").removeClass("not_displayed");
		$("#machine_").removeClass("not_displayed");
	}
	if(ship.weapon.type.machine.bought){
		$("#machine").removeClass("not_displayed");
		$("#missile_").removeClass("not_displayed");
	}
	if(ship.weapon.type.missile.bought){
		$("#missile").removeClass("not_displayed");
		$("#particle_").removeClass("not_displayed");
	}
	if(ship.weapon.type.particle.bought){
		$("#particle").removeClass("not_displayed");
		$("#laser_").removeClass("not_displayed");
	}
	if(ship.weapon.type.laser.bought){
		$("#laser").removeClass("not_displayed");
	}

	if(ship.weapon.type.current_weapon.name == "No Weapon"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.none;
		ship.weapon.status = false;
	} else if(ship.weapon.type.current_weapon.name == "Ray Gun"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.ray;
		ship.weapon.status = true;
	} else if(ship.weapon.type.current_weapon.name == "Plasma Cannon"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.plasma;
		ship.weapon.status = true;
	} else if(ship.weapon.type.current_weapon.name == "Machine Gun"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.machine;
		ship.weapon.status = true;
	} else if(ship.weapon.type.current_weapon.name == "Missile"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.missile;
		ship.weapon.status = true;
	} else if(ship.weapon.type.current_weapon.name == "Particle Ray"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.particle;
		ship.weapon.status = true;
	} else if(ship.weapon.type.current_weapon.name == "Laser Show"){
		ship.weapon.type.current_weapon.current_weapon_object = ship.weapon.type.laser;
		ship.weapon.status = true;
	}

	ship.weapon.type.current_weapon.energy_consumsion = ship.weapon.type.current_weapon.current_weapon_object.energy_consumsion * ship.weapon.type.current_weapon.amount;
	ship.consume_rate = (bots.length * 0.1) + (ship.mass * 0.001) + (ship.weapon.type.current_weapon.energy_consumsion) + (ship.shield.og_power * 0.6);
	ship.mass = ((parts.amount * 0.76)); //Mass of ship grows over time depending on the number of parts//

	//The protection power is determed by how large the ship is along with the amount of energy we need to power the protection and the weapons we have//
	var ship_protection = ((((ship.shield.og_power * ship.shield.lvl) + (ship.energy * 0.50) + ((ship.weapon.type.current_weapon.power * ship.weapon.type.current_weapon.speed)) * ship.weapon.type.current_weapon.amount))/ ((ship.mass) * 5)) * 100;
	if(ship_protection < 100){
		ship.protection.strength = ship_protection;
	} else {
		ship.protection.strength = 100;
	}
	if(ship.protection.strength < 10){
		ship.protection.status = false;
	} else {
		ship.protection.status = true;
	}

	if(resources.animals.amount > 0){
		resources.animals.progress.clicked = true;
    	ship.life.food += resources.animals.produce_rate;
   		resources.animals.amount -= 1;
	}

   	if(resources.water.amount > 0){
   		resources.water.progress.clicked = true;
    	ship.life.oxygen.water_reserve += resources.water.produce_rate;
    	resources.water.amount -= resources.water.produce_rate;
   	}

	//console.log(meal);
	meal++;//Tne time for the next meal//
	if(meal	% 1000 == 0 && ship.life.food > 5.6){
		ship.life.food -= 5.3;
	}

	if(curr_page == "ship"){
		ship.life.oxygen.water_reserve -= 0.01;
	}

	//Gravitational pull of the ship
	ship.life.gravity_pull = ((ship.mass * 0.0000000043)/1000); //Not actual equation xD actual quation will be implimented once i figure out to use it :I
	add_oxygen();
	//console.log("What do u mean: " + (ship.shell.layers * ship.shell.power) + (ship.mass * 10));
	if(autoClick == true){
      add_energy();
    }

    if(ship.energy <= ship.max_energy/4){
    	$(".finds_container").css("color", "#ffffff");
        $(".finds_container").css("background-color", "#222222");	
    }
	if(ship.energy < ship.consume_rate){
		ship.energy = 0;
		mouse.display = "Seems like you're ship is low on energy";
		$("#energy_bar").css("width", ((ship.energy/ship.max_energy) * 190) + "px");
		GID("energy_bar").innerHTML = format_numbers(ship.energy.toFixed(2)) + "e/" + format_numbers(ship.max_energy.toFixed(2)) + "e";

		if(ship.energy <= 10){
			GID("ship_energy").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_energy").style.backgroundColor = "rgb(230,230,60)";
		}
		//$("#body").css("opacity", "0.3");
	}
	//if(2 = 3){
		/*ship.weapon.type.current_weapon.energy_consumsion = 0;
		ship.weapon.type.current_weapon.power = 0;
		ship.weapon.type.current_weapon.speed = 0;*/
	//} else {
		ship.weapon.type.current_weapon.amount = ship.weapon.type.current_weapon.current_weapon_object.amount;
		ship.weapon.type.current_weapon.power = ship.weapon.type.current_weapon.current_weapon_object.power;
		ship.weapon.type.current_weapon.speed = ship.weapon.type.current_weapon.current_weapon_object.speed;
		ship.weapon.type.current_weapon.energy_consumsion = ship.weapon.type.current_weapon.current_weapon_object.energy_consumsion;
	//}

	if(!ship.shield.status){
		ship.shield.og_power = 0;
	} else {
		ship.shield.og_power = ship.shield.power;
	}

	if(ship.energy > ship.consume_rate){
		ship.energy -= ship.consume_rate/100;
	}

}

window.setInterval(function(){
	ship.time.sec++;
	if(ship.time.sec >= 60){
		ship.time.sec = 0;
		ship.time.min++;
	}

	if(ship.time.min >= 60){
		ship.time.min = 0;
		ship.time.hour++;
	}

	if(ship.time.hour >= 24){
		ship.time.hour = 0;
		ship.time.day++;
	}
}, 1000/100);

function update_ship_UI(){
	if(ship.energy > 0){
		//GID("ship_energy_").innerHTML = ship.energy.toFixed(2)) + "e" ;
		$("#energy_bar").css("width", ((ship.energy/ship.max_energy) * 190) + "px");
		GID("ship_name").innerHTML = ship.name;
		if(ship.energy >= 9999999999){
			GID("energy_bar").innerHTML = format_numbers(ship.energy.toFixed(2)) + "e";
		} else {
			GID("energy_bar").innerHTML = format_numbers(ship.energy.toFixed(2)) + "e/" + format_numbers(ship.max_energy.toFixed(2)) + "e";
		}
		GID("ship_time").innerHTML = "[Day:" + ship.time.day + "] [" + ship.time.hour + ":" + ship.time.min + ":" + ship.time.sec + "]";
		GID("ship_mass").innerHTML = "Ship mass: " + format_numbers(ship.mass.toFixed(2)) + "kg";
		GID("ship_energy_rate").innerHTML = "Consumption: " + format_numbers(ship.consume_rate.toFixed(2)) + "e/sec";

		GID("ship_engine").innerHTML = "Engine power: " + format_numbers(ship.engine.power.toFixed(2)) + "%";
		GID("ship_protection").innerHTML = "Protection: " + ship.protection.strength.toFixed(1) + "%";
		GID("ship_weapon").innerHTML = ship.weapon.type.current_weapon.name + ": [" + ship.weapon.type.current_weapon.amount + "]";
		GID("ship_shield").innerHTML = "Shield Level: [" + ship.shield.lvl + "]";

		if(ship.energy <= ship.consume_rate){
			GID("ship_energy").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_energy").style.backgroundColor = "rgb(230,230,60)";
		}

		if(ship.engine.status){
			GID("ship_engine").style.backgroundColor = "#7ABA7A";
		} else {
			GID("ship_engine").style.backgroundColor = "rgb(238,60,48)";
		}

		if(ship.protection.status){
			GID("ship_protection").style.backgroundColor = "#7ABA7A";
		} else {
			GID("ship_protection").style.backgroundColor = "rgb(238,60,48)";
		}

		if(!ship.shield.status){
			GID("ship_shield").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_shield").style.backgroundColor = "#7ABA7A";
		}

		if(ship.life.oxygen.lvl < 10){
			GID("ship_oxygen_lvl").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_oxygen_lvl").style.backgroundColor = "#7ABA7A";
		}

		if(!ship.space_suit.status){
			GID("space_suit_").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("space_suit_").style.backgroundColor = "#7ABA7A";
		}

		if(ship.life.food < 10){
			GID("ship_food").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_food").style.backgroundColor = "#7ABA7A";
		}

		if(!ship.weapon.status){
			GID("ship_weapon").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_weapon").style.backgroundColor = "#7ABA7A";
		}
		GID("ship_oxygen_lvl").innerHTML = "O2 Level: " + ship.life.oxygen.lvl.toFixed(0) + "%";
		GID("ship_food").innerHTML = "Food Amount: " + format_numbers(ship.life.food.toFixed(2)) + "lb";
		GID("ship_gravity").innerHTML = "Gravity: " + ship.life.gravity_pull.toFixed(7) + " m/s<span style=\"font-size:9px;\">2</span>";
	}
}

window.setInterval(function(){

}, 1000/1);


var events = {
	
}
/*if(ship.weapon.status){
		GID("ship_weapon").innerHTML = ship.weapon.type.ray.name;
		GID("ship_weapon").style.backgroundColor = "rgb(60,187,60)";
	} else {
		GID("ship_weapon").innerHTML = ship.weapon.type.ray.name;
		GID("ship_weapon").style.backgroundColor = "rgb(238,60,48)";
	}

	GID("ship_shell").innerHTML = "Shell layers: " + ship.shell.layers;
	GID("ship_hydration").innerHTML = "Liquid Volume: " + ship.life.hydration.toFixed(2));
*/
