var upgrades_unlocked = false;

var machines = {
	increase_intelligence: {
		type:"increase_intelligence",
		avalable:false,
		cost: {
			energy:0,
			intelligence:0,
			parts:0,
			met:true,
		},
		timer:{
			current_time:0,
			max_time:30, //in seconds
			start_timer:false,
			start_date: new Date().getTime(),
		},
		id:"increase_intelligence",
		exta_tip: "",
		display: "",
		intelligence_upgrade_text : ["Smarter everyday", "Brainiac", "Was that too complex", "That was too easy",
		"I need a challenge", "You know what I like more than this ship?", "Knowledge", "You know what I like more than this ship? Knowledge", "I read 2 BOT manuals a day",
		"Just had 10 new BOTs installed", "The more you know", "I HAVE THE POWER", "Knowledge is power", "I know too much", "I know too little", "Understand", "Console make these test harder please", 
		"Console make these tests a lot easier", "When's the next meteor shower, I'm ready", "...", "Rocket Science pfft, check", "Hmmm.. I can't seems to find the bug in my program"
		]
	},

	space_helmet: {
		type:"space_helmet",
		avalable:false,
		cost: {
			energy:100000,
			intelligence:5,
			parts:10000,
			met:false,
		},
		id:"space_helmet",
		exta_tip: "",
		display: "",
	},

	space_gloves: {
		type:"space_gloves",
		avalable:false,
		cost: {
			energy:200000,
			intelligence:9,
			parts:11000,
			met:false,
		},
		id:"space_gloves",
		exta_tip: "",
		display: "",
	},

	space_pants: {
		type:"space_pants",
		avalable:false,
		cost: {
			energy:400000,
			intelligence:18,
			parts:30000,
			met:false,
		},
		id:"space_pants",
		exta_tip: "",
		display: "",
	},

	space_boots: {
		type:"space_boots",
		avalable:false,
		cost: {
			energy:450000,
			intelligence:21,
			parts:45000,
			met:false,
		},
		id:"space_boots",
		exta_tip: "",
		display: "",
	},

	space_suit: {
		type:"space_suit",
		avalable:false,
		cost: {
			energy:600000,
			intelligence:23,
			parts:70000,
			met:false,
		},
		id:"space_suit",
		exta_tip: "",
		display: "",
	},

	suit_update: {
		type:"suit_update",
		avalable:false,
		cost: {
			energy:531030,
			intelligence:56,
			parts:10000,
			met:false,
		},
		id:"suit_update",
		exta_tip: "",
		display: "",
	},

	engine_bots_: {
		type:"engine_bots_",
		avalable:false,
		cost: {
			energy:531030,
			intelligence:36,
			parts:7070,
			met:false,
		},
		id:"engine_bots_",
		exta_tip: "",
		display: "",
	},

	forms_bots_: {
		type:"forms_bots_",
		avalable:false,
		cost: {
			energy:1006030,
			intelligence:50,
			parts:45070,
			met:false,
		},
		id:"forms_bots_",
		exta_tip: "",
		display: "",
	},

	ship_capacity: {
		type:"capacity",
		avalable:false,
		cost: {
			energy:6030,
			intelligence:16,
			parts:4070,
			met:false,
		},
		id:"more_storage",
		exta_tip: "",
		increase_cost:1000,
		display: "",
	},

	automate: {
		type: "automate",
		avalable: false,
		cost: {
			energy:3000,
			intelligence:31,
			parts:130,
			met:false,
		},
		id:"automation",
		display: "",
	},

	convert_all: {
		type: "convert_all_",
		avalable: false,
		cost: {
			energy:1040,
			intelligence:33,
			parts:700,
			met:false,
		},
		id:"convert_all",
		display: "",
	},

	botAI: {
		type: "botAI",
		avalable: false,
		cost: {
			energy:1230,
			intelligence:37,
			parts:130,
			met:false,
		},
		timer:{
			current_time:0,
			max_time:60, //in seconds
			start_timer:false,
			start_date: new Date().getTime(),
		},
		id:"betterAI",
		display: "<div>Next upgrade</div>" + 1230 + " Energy " + 130 + " parts</div>",
	},
///////////////////////////////////////////////////////////////////////
	battery_rate: {
		type: "battery_rate",
		avalable: false,
		cost: {
			energy:9040,
			intelligence:5,
			parts:2000,
			met:false,
		},
		id:"battery_rate",
		display: "",
	},

	wires_rate: {
		type: "wires_rate",
		avalable: false,
		cost: {
			energy:10040,
			intelligence:10,
			parts:3000,
			met:false,
		},
		id:"wires_rate",
		display: "",
	},

	lightbuld_rate: {
		type: "lightbuld_rate",
		avalable: false,
		cost: {
			energy:22040,
			intelligence:15,
			parts:4400,
			met:false,
		},
		id:"lightbuld_rate",
		display: "",
	},

	water_rate: {
		type: "water_rate",
		avalable: false,
		cost: {
			energy:1040,
			intelligence:5,
			parts:3000,
			met:false,
		},
		id:"water_rate",
		display: "",
	},

	food_rate: {
		type: "food_rate",
		avalable: false,
		cost: {
			energy:13000,
			intelligence:5,
			parts:30000,
			met:false,
		},
		id:"food_rate",
		display: "",
	},

	generator_rate: {
		type: "generator_rate",
		avalable: false,
		cost: {
			energy:40040,
			intelligence:25,
			parts:6900,
			met:false,
		},
		id:"generator_rate",
		display: "",
	},

	charger_rate: {
		type: "charger_rate",
		avalable: false,
		cost: {
			energy:50040,
			intelligence:30,
			parts:7800,
			met:false,
		},
		id:"charger_rate",
		display: "",
	},

	heat_rate: {
		type: "heat_rate",
		avalable: false,
		cost: {
			energy:69840,
			intelligence:35,
			parts:8200,
			met:false,
		},
		id:"heat_rate",
		display: "",
	},

	solar_rate: {
		type: "solar_rate",
		avalable: false,
		cost: {
			energy:81040,
			intelligence:40,
			parts:9000,
			met:false,
		},
		id:"solar_rate",
		display: "",
	},

	thermal_rate: {
		type: "thermal_rate",
		avalable: false,
		cost: {
			energy:100040,
			intelligence:45,
			parts:10000,
			met:false,
		},
		id:"thermal_rate",
		display: "",
	},

	chemical_rate: {
		type: "chemical_rate",
		avalable: false,
		cost: {
			energy:200040,
			intelligence:50,
			parts:20300,
			met:false,
		},
		id:"chemical_rate",
		display: "",
	},

	electrical_rate: {
		type: "electrical_rate",
		avalable: false,
		cost: {
			energy:300040,
			intelligence:55,
			parts:40000,
			met:false,
		},
		id:"electrical_rate",
		display: "",
	},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	time: {
		type: "time",
		avalable: false,
		cost: {
			energy:1040,
			intelligence:6,
			parts:900,
			met:false,
		},
		id:"time",
		display: "",
	},

	consumption: {
		type: "consumption",
		avalable: false,
		cost: {
			energy:3040,
			intelligence:14,
			parts:1000,
			met:false,
		},
		id:"consumption",
		display: "",
	},

	oxygen: {
		type: "oxygen",
		avalable: false,
		cost: {
			energy:4040,
			intelligence:7,
			parts:2300,
			met:false,
		},
		id:"oxygen",
		display: "",
	},

	food: {
		type: "food",
		avalable: false,
		cost: {
			energy:6040,
			intelligence:9,
			parts:6300,
			met:false,
		},
		id:"food",
		display: "",
	},

	weapons: {
		type: "weapons",
		avalable: false,
		cost: {
			energy:400040,
			intelligence:30,
			parts:20300,
			met:false,
		},
		id:"weapons",
		display: "",
	},

	protection: {
		type: "protection",
		avalable: false,
		cost: {
			energy:41040,
			intelligence:13,
			parts:12300,
			met:false,
		},
		id:"protection",
		display: "",
	},

	shield: {
		type: "shield",
		avalable: false,
		cost: {
			energy:142040,
			intelligence:21,
			parts:23000,
			met:false,
		},
		timer:{
			current_time:0,
			max_time:1, //in seconds
			start_timer:false,
			start_date: new Date().getTime(),
		},
		id:"shield",
		display: "",
	},

	mass: {
		type: "mass",
		avalable: false,
		cost: {
			energy:24040,
			intelligence:18,
			parts:42300,
			met:false,
		},
		id:"mass",
		display: "",
	},

	gravity: {
		type: "gravity",
		avalable: false,
		cost: {
			energy:14040,
			intelligence:20,
			parts:20300,
			met:false,
		},
		id:"gravity",
		display: "",
	},

	engine: {
		type: "engine",
		avalable: false,
		cost: {
			energy:100000000000000000, //100,000,000,000,000,000//
			intelligence:100,
			parts:100000000000000,  //100,000,000,000,000//
			met:false,
		},
		id:"engine",
		display: "",
	},
}

//var machinesArr = [machines.ship_capacity, machines.automate, machines.convert_all, machines.botAI];
function update_machines(){
	if(upgrades_unlocked){
		$("#upgrades_nav").removeClass("not_displayed");
	}
	for (var key in machines) {
		if(machines[key].avalable){
			$("#" + machines[key].id).fadeOut("slow");
			if(machines[key].type == "automate"){
				//$("#" + machines[key].id).fadeOut("slow");
				$("#automation_toggle").removeClass("not_displayed");
			}

			if(machines[key].type == "space_helmet"){
				$("#space_gloves").removeClass("not_displayed");
			}	

			if(machines[key].type == "space_gloves"){
				$("#space_pants").removeClass("not_displayed");
			}

			if(machines[key].type == "space_pants"){
				$("#space_boots").removeClass("not_displayed");
			}

			if(machines[key].type == "space_boots"){
				$("#space_suit").removeClass("not_displayed");
			}

			if(machines[key].type == "space_suit"){
				$("#space_suit_").removeClass("not_displayed");
				$("#suit_update").removeClass("not_displayed");
			}

			if(machines[key].type == "space_suit"){
				$("#space_suit_").removeClass("not_displayed");
			}

			if(machines[key].type == "engine_bots_"){
				$("#generator_nav").removeClass("not_displayed");
				$("#generator_bot").removeClass("not_displayed");
			}

			if(machines[key].type == "forms_bots_"){
				$("#forms_nav").removeClass("not_displayed");
				$("#forms_bot").removeClass("not_displayed");
			}

			if(machines[key].type == "convert_all_"){
				$("#convert_all_toggle").removeClass("not_displayed");
			}

			if(machines[key].type == "time"){
				$("#ship_time").removeClass("not_displayed");
			}

			if(machines[key].type == "consumption"){
				$("#ship_energy_rate").removeClass("not_displayed");
			}

			if(machines[key].type == "oxygen"){
				$("#ship_oxygen_lvl").removeClass("not_displayed");
				$("#water").removeClass("not_displayed");
			}

			if(machines[key].type == "food"){
				$("#ship_food").removeClass("not_displayed");
				$("#animals").removeClass("not_displayed");
			}

			if(machines[key].type == "protection"){
				$("#ship_protection").removeClass("not_displayed");
			}

			if(machines[key].type == "mass"){
				$("#ship_mass").removeClass("not_displayed");
			}

			if(machines[key].type == "gravity"){
				$("#ship_gravity").removeClass("not_displayed");
			}

			if(machines[key].type == "engine"){
				$("#ship_engine").removeClass("not_displayed");
			}
		}

		if(machines[key].cost.met){
			if(machines[key].type == "weapons"){
				$("#ship_weapon").removeClass("not_displayed");
				$("#ray_").removeClass("not_displayed");
			}

			if(machines[key].type == "shield"){
				$("#ship_shield").removeClass("not_displayed");
			}
		}

		var current_date = new Date().getTime();
		if(machines[key].type == "botAI"){
			machines[key].timer.current_time = (current_date - machines[key].timer.start_date)/1000;
			if(machines[key].timer.start_timer){
				$("#betterAI_").css("width", (((machines[key].timer.current_time/machines[key].timer.max_time) * 220) + 20) + "px");
				GID("betterAI_").innerHTML = (((machines[key].timer.max_time - machines[key].timer.current_time)/60).toFixed(0)) + ":" + ((machines[key].timer.max_time - machines[key].timer.current_time) % 60).toFixed(0); //((machines[key].timer.current_time/machines[key].timer.max_time) * 100).toFixed(0) + "%";
				if(machines[key].timer.current_time >= machines[key].timer.max_time){
					machines[key].timer.start_timer = false;
					GID("betterAI_").innerHTML = "Upgrade ready";
				}
			}
		}

		if(machines[key].type == "shield"){
			machines[key].timer.current_time = (current_date - machines[key].timer.start_date)/1000;
			if(machines[key].timer.start_timer){
				$("#shield_").css("width", (((machines[key].timer.current_time/machines[key].timer.max_time) * 200) + 20) + "px");
				GID("shield_").innerHTML = (((machines[key].timer.max_time - machines[key].timer.current_time)/60).toFixed(0)) + ":" + ((machines[key].timer.max_time - machines[key].timer.current_time) % 60).toFixed(0); //((machines[key].timer.current_time/machines[key].timer.max_time) * 100).toFixed(0) + "%";
				if(machines[key].timer.current_time >= machines[key].timer.max_time){
					machines[key].timer.start_timer = false;
					GID("shield_").innerHTML = "Upgrade ready";
				}
			}
		}

		if(machines[key].type == "increase_intelligence"){
			machines[key].timer.current_time = (current_date - machines[key].timer.start_date)/1000;
			if(machines[key].timer.start_timer){
				var t = ((machines[key].timer.current_time/machines[key].timer.max_time));
				$("#increase_intelligence_").css("width", (((machines[key].timer.current_time/machines[key].timer.max_time) * 200) + 20) + "px");
				GID("increase_intelligence_").innerHTML = (((machines[key].timer.max_time - machines[key].timer.current_time)/60).toFixed(0)) + ":" + ((machines[key].timer.max_time - machines[key].timer.current_time) % 60).toFixed(0); //((machines[key].timer.current_time/machines[key].timer.max_time) * 100).toFixed(0) + "%";
				if(machines[key].timer.current_time >= machines[key].timer.max_time){
					machines[key].timer.start_timer = false;
					GID("increase_intelligence_").innerHTML = "Train some more";
				}
			}
		}
	}
}

function update_price(object){
	object.cost.energy += (object.cost.energy * 0.08);
	object.cost.parts += (object.cost.parts * 0.08);
}

function checkMachinesCostMet(object){
	if(cell.energy >= object.cost.energy && parts.amount >= object.cost.parts && player.intelligence.level >= object.cost.intelligence){
		object.cost.met = true;
	} else {
		object.cost.met = false;
	}
}

function addMachines(object){
	checkMachinesCostMet(object);
	if(!object.cost.met){
		console_display("You can not make that yet");
		return 0;
	}

	if(object.type == "increase_intelligence"){
    	if(object.timer.current_time >= (object.timer.max_time)){
    		increase_intelligence();
    		object.timer.start_date = new Date().getTime();
    		object.timer.max_time += (object.timer.max_time * 0.08);
    		player_display(machines.increase_intelligence.intelligence_upgrade_text[Math.round(randNum(0, (machines.increase_intelligence.intelligence_upgrade_text.length - 1)))]);
    	}
    	if(object.cost.met){
			if(!object.timer.start_timer){
				object.timer.current_time = 0;
				object.timer.start_timer = true;
			}
		}
	}

	if(object.type == "space_helmet"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		player.O2_lvl.max += 100;
		object.avalable = true;
		player.space_suit.helmet = true;
		$("#space_gloves").removeClass("not_displayed");
		update_price(object);
	}

	if(object.type == "space_gloves"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		player.O2_lvl.max += 300;
		object.avalable = true;
		player.space_suit.gloves = true;
		$("#space_pants").removeClass("not_displayed");
		update_price(object);
	}

	if(object.type == "space_pants"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		player.O2_lvl.max += 700;
		object.avalable = true;
		player.space_suit.pants = true;
		$("#space_boots").removeClass("not_displayed");
		update_price(object);
	}

	if(object.type == "space_boots"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		player.O2_lvl.max += 1000;
		object.avalable = true;
		player.space_suit.boots = true;
		$("#space_suit").removeClass("not_displayed");
		update_price(object);
	}

	if(object.type == "space_suit"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		player.O2_lvl.max += 3000;
		object.avalable = true;
		player.space_suit.suit = true;
		$("#space_suit_").removeClass("not_displayed");
		$("#suit_update").removeClass("not_displayed");
		update_price(object);
	}

	if(object.type == "suit_update" && !ship.space_suit.status){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		increase_o2_limit();
		update_price(object);
	}

	if(object.type == "engine_bots_"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#generator_nav").removeClass("not_displayed");
		$("#generator_bot").removeClass("not_displayed");
		object.avalable = true;
		console_display("Engine's resource Management online.");
		update_price(object);
	}

	if(object.type == "forms_bots_"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#forms_nav").removeClass("not_displayed");
		$("#forms_bot").removeClass("not_displayed");
		object.avalable = true;
		console_display("Forms resource Management online.");
		update_price(object);
	}

	if(object.type == "automate"){
		object.avalable = true;
		mouse.display = "Check your options";
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		update_price(object);
	}

	if(object.type == "convert_all_"){
		object.avalable = true;
		mouse.display = "Check your options";
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		update_price(object);
	}

	if(object.type == "botAI"){
		if(bots.length < 0){
			object.display = "<div>Not enough BOTs to use this. " + (10 - (bots.length)) +" more BOTs needed.</div>";
			return 0;
		}
		if(object.timer.current_time >= (object.timer.max_time)){
			object.cost.energy += (object.cost.energy * 0.08);
			object.cost.parts += (object.cost.parts * 0.08);
			cell.energy -= object.cost.energy;
			parts.amount -= object.cost.parts;
			object.display = "<div>Next upgrade</div><div>" + format_numbers(object.cost.energy.toFixed(2)) + " Energy " + format_numbers(object.cost.parts.toFixed(2)) + " parts</div> <div>Requires intelligence level: [" + machines.convert_all.cost.intelligence + "] </div>";
			for(var i = 0; i < bots.length; i++){
				var b = bots[i];
				if(!(b.smartness <= 20)){
					b.finds_for_next_lvl = b.finds_for_next_lvl/2;
				}
			}
			object.timer.max_time += (object.timer.max_time * 0.003);
			update_price(object);
			object.timer.start_date = new Date().getTime();
		}
		if(object.cost.met){
			if(!object.timer.start_timer){
				object.timer.current_time = 0;
				object.timer.start_timer = true;
			}
		}
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	if(object.type == "battery_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		resources.batteries.produce_rate += 0.2;
		update_price(object);
	}

	if(object.type == "wires_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		resources.wires.produce_rate += 0.3;
		update_price(object);
	}

	if(object.type == "lightbuld_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		resources.lightbulbs.produce_rate += 0.4;
		update_price(object);
	}

	if(object.type == "water_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		resources.water.produce_rate += 0.45;
		update_price(object);
	}

	if(object.type == "food_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		resources.animals.produce_rate += 0.6;
		update_price(object);
	}

	if(object.type == "generator_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		engines.generators.produce_rate += 0.5;
		update_price(object);
	}

	if(object.type == "charger_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		engines.chargers.produce_rate += 0.55;
		update_price(object);
	}

	if(object.type == "heat_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		engines.heaters.produce_rate += 0.6;
		update_price(object);
	}

	if(object.type == "solar_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		forms.solars.produce_rate += 0.65;
		update_price(object);
	}

	if(object.type == "thermal_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		forms.thermal.produce_rate += 0.7;
		update_price(object);
	}

	if(object.type == "chemical_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		forms.chemical.produce_rate += 0.8;
		update_price(object);
	}

	if(object.type == "electrical_rate"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		forms.electrical.produce_rate += 1;
		update_price(object);
	}
////////////////////////////////////////////////////////////////////////////////////////////////////
	if(object.type == "capacity"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		object.avalable = true;
		update_price(object);
	}
	if(object.type == "time"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_time").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "consumption"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_energy_rate").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "oxygen"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_oxygen_lvl").removeClass("not_displayed");
		$("#water").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "food"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_food").removeClass("not_displayed");
		$("#animals").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "protection"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_protection").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "weapons"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		//GID("weapons").innerHTML = ""
		$("#ship_weapon").removeClass("not_displayed");
		$("#ray_").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "shield" && !ship.shield.status){
    	if(object.timer.current_time >= (object.timer.max_time)){
    		cell.energy -= object.cost.energy;
			parts.amount -= object.cost.parts;
			object.display = "<div>Next upgrade</div>" + format_numbers(object.cost.energy.toFixed(2)) + " Energy " + format_numbers(object.cost.parts.toFixed(2)) + " parts</div>";
			ship.shield.lvl += 1;
			ship.shield.power += (ship.shield.power * 0.28);
			object.timer.max_time += (object.timer.max_time * 0.08);
			update_price(object);
			$("#ship_shield").removeClass("not_displayed");
    		console.log("Wello");
    		object.timer.start_date = new Date().getTime();
    	}
    	if(object.cost.met){
			if(!object.timer.start_timer){
				object.timer.current_time = 0;
				object.timer.start_timer = true;
			}
		}
	}

	if(object.type == "mass"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_mass").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "gravity"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_gravity").removeClass("not_displayed");
		object.avalable = true;
		update_price(object);
	}

	if(object.type == "engine"){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;
		$("#ship_engine").removeClass("not_displayed");
		object.avalable = true;
		alert("If you've unlocked this upgrade then you've reached the end of content :o. Dont worry though alot more content is coming visit the options page for more info.");
		update_price(object);
	}
}
