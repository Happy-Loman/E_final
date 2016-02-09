var player = {
	space_suit: {
		helmet:false,
		suit:false,
		gloves:false,
		boots:false,
		pants:false,
		set:false,

		oxygen_reserve:{
			amount:0,
			max:10000,
		},
	},
	intelligence: {
		level: 1,
		curr_lvl_amount:0,
		nxt_lvl: 1000,
		upgrade_amount:1,
		og_upgrade_amount:1,
		color:"",
	},
	
	O2_lvl: {
		level: 1000,
		max: 1000, 
		percent:100,
	},
	
	hunger: {
		level: 1000,
		max: 1000, 
		percent:100,
	},
};

//Show energy level 
window.setTimeout(function(){
	GID("player_intell_bar").innerHTML = "Intelligence Level: " + player.intelligence.level;
}, 2000);
window.setInterval(function(){
	window.setTimeout(function(){
		GID("player_intell_bar").innerHTML = "Intelligence Level: " + player.intelligence.level;
	}, 3000);
	window.setTimeout(function(){
		GID("player_intell_bar").innerHTML = format_numbers(player.intelligence.curr_lvl_amount.toFixed(2)) + "/" + format_numbers(player.intelligence.nxt_lvl.toFixed(2));
	}, 8000);
}, 11000);

function update_player(){
	if(player.space_suit.helmet && player.space_suit.suit && player.space_suit.gloves && player.space_suit.boots && player.space_suit.boots && player.space_suit.pants){
		player.space_suit.set = true;
	}

	if(!player.space_suit.set){
		if(curr_page == "ship" && player.O2_lvl.level < player.O2_lvl.max){
			if(machines.oxygen.avalable){
				if(((ship.life.oxygen.oxygen_lvl/ship.life.oxygen.max_oxygen) * 100) >= 10){
					player.O2_lvl.level += 0.6;
					ship.life.oxygen.water_reserve -= 0.6;
				}
			} else {
				player.O2_lvl.level += 0.6;
			}
		} else{
			if(player.O2_lvl.level > 1){
				if(story_shown){
					player.O2_lvl.level -= 0.1;
				} else {
					player.O2_lvl.level -= 0.02;
				}
			}
		}
	}

	if(player.space_suit.set && ship.space_suit.status) {
		var oxygen_need = player.space_suit.oxygen_reserve.max - player.space_suit.oxygen_reserve.amount; //Oxygen needed to refill the suit.
		if(ship.life.oxygen.water_reserve > oxygen_need && ((ship.life.oxygen.oxygen_lvl/ship.life.oxygen.max_oxygen) * 100) >= 10){
			player.space_suit.oxygen_reserve.amount += oxygen_need;
		}

		if(((player.space_suit.oxygen_reserve.amount/player.space_suit.oxygen_reserve.max) * 100) >= 10 && player.O2_lvl.level <= player.O2_lvl.max){
			player.O2_lvl.level += 0.6;
			player.space_suit.oxygen_reserve.amount -= 0.6;
		} else {
			if(player.O2_lvl.level > 1){
				player.O2_lvl.level -= 0.1;
			}
		}
	} else {
		if(curr_page == "ship" && player.O2_lvl.level < player.O2_lvl.max){
			if(machines.oxygen.avalable){
				if(((ship.life.oxygen.oxygen_lvl/ship.life.oxygen.max_oxygen) * 100) >= 2){
					player.O2_lvl.level += 0.6;
					ship.life.oxygen.water_reserve -= 0.6;
				}
			} else {
				player.O2_lvl.level += 0.6;
			}
		} else{
			if(player.O2_lvl.level > 1){
				if(story_shown){
					player.O2_lvl.level -= 0.1;
				} else {
					player.O2_lvl.level -= 0.02;
				}
			}
		}
	}
	if(player.space_suit.oxygen_reserve.amount <= 0){
		player.space_suit.oxygen_reserve.amount = 0;
	}

	if(player.hunger.level > 1){
		if(player.hunger.percent >= 30){
			player.hunger.level -= randNum((player.hunger.level * 0.0000001), (player.hunger.level * 0.0001));
		} else {
			player.hunger.level -= randNum((player.hunger.level * 0.000001), (player.hunger.level * 0.00001));
		}
	}
	player.intelligence.percent = (player.intelligence.level/player.intelligence.nxt_lvl) * 100;
	player.O2_lvl.percent = (player.O2_lvl.level/player.O2_lvl.max) * 100;
	player.hunger.percent = (player.hunger.level/player.hunger.max) * 100;
	
	if(player.O2_lvl.percent > 10){
		player.intelligence.curr_lvl_amount += player.intelligence.upgrade_amount;
	}

	$("#player_intell_bar").css("width", ((player.intelligence.curr_lvl_amount/player.intelligence.nxt_lvl) * 100) + "%");
	
	$("#player_o2_bar").css("width", ((player.O2_lvl.level/player.O2_lvl.max) * 100) + "%");
	$("#player_o2_bar").css("background-color", "rgba(200, 200, 255, 1)");
	
	$("#player_hunger_bar").css("width", ((player.hunger.level/player.hunger.max) * 100) + "%");
	$("#player_hunger_bar").css("background-color", "rgba(222,184,135, 1)");

	if(player.intelligence.curr_lvl_amount >= player.intelligence.nxt_lvl){
		player.intelligence.curr_lvl_amount = 0;
		player.intelligence.nxt_lvl += (player.intelligence.nxt_lvl * 0.3);
		player.intelligence.level += 1;
		$("#player_intell_bar").css("background-color", randColor());
    	player.intelligence.upgrade_amount = player.intelligence.og_upgrade_amount;
	}

	GID("player_o2_bar").innerHTML = "Oxygen: " + player.O2_lvl.level.toFixed(2) + "/" + player.O2_lvl.max.toFixed(2);
	GID("player_hunger_bar").innerHTML = "Hunger: " + player.hunger.level.toFixed(2) + "/" + player.hunger.max.toFixed(2);
}

var timer;

function increase_intelligence(){
	player.intelligence.og_upgrade_amount += (player.intelligence.og_upgrade_amount * 0.28);
	player.intelligence.curr_lvl_amount += randNum((player.intelligence.og_upgrade_amount * 10), (player.intelligence.og_upgrade_amount * 50));
}

function increase_o2_limit(){
	player.O2_lvl.max += (player.O2_lvl.max * 0.08);
}

window.addEventListener("mousemove",function(){
	if(player.intelligence.curr_lvl_amount >= player.intelligence.nxt_lvl){
		player.intelligence.curr_lvl_amount = 0;
		player.intelligence.nxt_lvl += (player.intelligence.nxt_lvl * 0.01);
		player.intelligence.level += 1;
    	player.intelligence.upgrade_amount = player.intelligence.og_upgrade_amount;
	} else {
		if(player.hunger.percent >= 38 && player.O2_lvl.percent > 10){
			player.intelligence.upgrade_amount += player.intelligence.upgrade_amount * 0.007;
			player.intelligence.curr_lvl_amount += player.intelligence.upgrade_amount;
			player.hunger.level -= (player.intelligence.upgrade_amount * 0.01);
		}
	}
	//console.log('hello');
    clearTimeout(timer);
    timer=setTimeout(function(){
    	player.intelligence.curr_lvl_amount += 0;
    	player.intelligence.upgrade_amount = player.intelligence.og_upgrade_amount;
    },300);
});
