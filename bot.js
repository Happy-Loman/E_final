var bots = [];
var bot_names = ["Maria", "Metal", "Scrap", "Iron", "Giant", "Helen", "r054", 
"Experiment", "Zerg", "Clank", "Crank", "Dark", "Roy", "Wallie", "Kitt", "Tachikomas", 
"Gerry", "Mega", "Awesome-O", "Energizer", "Robot", "Lego", "Astro", "Optimas", 
"Rosie", "Terminator []", "R3D3", "Bent", "C-4PO", "Bot", "Dank", "Clint", "Eastwood"];

var random_char = ["Beep Boop", "Amassing Energy", "Cutting Circuits", "Converting Energy", "Programming AI", 
"Fixing Bugs", "Starting Over", "Repairing BOT", "Making AI.. Smart", "Failing", "Beep Beep", "Boop", 
"Almost There", "Powering Up", "Redirecting Power", "Adding Weapons", "Removing Weapons"];
 
var botFarm = {
    energyForNextBot: 10,
    energyForNextBotGrowthRate: 3.5,
    CTF: 5,
    PR: 50,
    MS: 200,
    botIndx:0,
}

var resourceBot = {
    type:"resource",
    color:"white",
    amount:0,
    cost: {
        batteries: 30,
        energy: 100,
        pureEnergy: 1101200,
        met:false,
    },
    fabrication_time:0.5, //Per second
    id:"resource_bot_number",
}

var generatorBot = {
    type: "engines",
    color:"lightblue",
    amount:0,
    cost: {
        batteries: 1000,
        wires:600,
        lightbulbs:540,
        energy: 1100,
        pureEnergy: 1000000 * 10.2,
        met:false,
    },
    fabrication_time:1, //Per second
    id:"generator_bot_number",
}

var formsBot = {
    type: "forms",
    color:"red",
    amount:0,
    cost: {
        batteries: 450,
        wires:320,
        energy: 10010,
        generators: 54,
        chargers: 35,
        heaters: 24,
        pureEnergy: 1000000 * 24.8,
        met:false,
    },
    fabrication_time:2, //Per second
    id:"forms_bot_number",
}

function checkBotCostMet(object){
    if(object.type == "resource"){
        if((resources.batteries.amount >= object.cost.batteries && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            cell.energy -= object.cost.energy;
            object.cost.met = true;
            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.energy * 0.5);
            object.cost.met = true;
        }else {
            object.cost.met = false;
        }
    }

    if(object.type == "engines"){
        if((resources.batteries.amount >= object.cost.batteries && resources.wires.amount >= object.cost.energy && resources.lightbulbs.amount >= object.cost.lightbulbs && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            resources.wires.amount -= object.cost.wires;
            resources.lightbulbs.amount -= object.cost.lightbulbs;
            cell.energy -= object.cost.energy;

            object.cost.met = true;

            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.wires += (object.cost.wires * 0.5);
            object.cost.lightbulbs += (object.cost.lightbulbs * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.energy * 0.5);
            object.cost.met = true;
        }else {
            object.cost.met = false;
        }
    }

    if(object.type == "forms"){
        if((resources.batteries.amount >= object.cost.batteries && resources.wires.amount >= object.cost.wires && engines.generators.amount >= object.cost.generators && engines.chargers.amount >= object.cost.chargers && engines.heaters.amount >= object.cost.heaters && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            resources.wires.amount -= object.cost.wires;
            engines.generators.amount -= object.cost.generators;
            engines.chargers.amount -= object.cost.chargers;
            engines.heaters.amount -= object.cost.heaters;
            cell.energy -= object.cost.energy;

            object.cost.met = true;

            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.wires += (object.cost.wires * 0.5);

            object.cost.generators += (object.cost.generators * 0.5);
            object.cost.chargers += (object.cost.chargers * 0.5);
            object.cost.heaters += (object.cost.heaters * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.pureEnergy * 0.5);
            object.cost.met = true;
        } else {
            object.cost.met = false;
        }
    }
}
var activeBots = botFarm.botIndx;

function addNewBot(object){
    checkBotCostMet(object);
    if(!object.cost.met){
        return 0;
    }

    object.amount++;
    bots.push({
        queue: {
            curr_time:0,
            time_till:1000,
            time_to_fabricate:object.fabrication_time,//in minute
            ready: false,
        },
        name: "BOT",
        object:object,
        id: object.id,
        indx: botFarm.botIndx,
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: object.color,
        text_color:"white",
        last_find:"nothing",
        smartness:1200,
        find_per_tick:1,
        AI_lvl:0,
        finds_for_next_lvl:500,
        og_finds_for_next_lvl:500,
        total_finds:0,
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        type:object.type,
        launching: true,
        active:true,       
        time: {
            curr:0,
            max: 1000,//seconds
        }, 
        storage: {
            resource_amount:0,
            max: 100,
        },           
        displayed: false,                                                                                                                                                                                                                                                                                                                                                          
    });
    botFarm.botIndx++;
    activeBots++;
    display_bots();
}

function bot_draw(){
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];

        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = bot.text_color;
        ctx.fillText("BOT: " + (bot.indx + 1),bot.x + 10,bot.y + 10);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.r, 0, (2 * Math.PI));
        ctx.fillStyle = bot.color;
        ctx.fill();
    };
    ctx.restore();
}

function name_bot(){
    
}
var pg = $('.bot_display');
var bot_display_text;
function display_bots(){
    GID("bot_display_container").innerHTML = "";
    for(var i = 0; i < bots.length; i++){
        var bot = bots[i];
        if(bot.queue.ready){
            bot_display_text = "<div id=\"bot_display_" + i + "\" class=\"bot_display_\">" + "<h2 id=\"bot_name" + i + "\">" + bot.name + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span>" + "<div id=\"bot_AI_lvl" + i + "\" class=\"toolTip\">AI Level: " + bot.AI_lvl.toFixed(0) + "</div> <div id=\"bot_AI_nextlvl" + i + "\" >Next Level: " + (bot.finds_for_next_lvl - bot.total_finds).toFixed(0) + "</div> <div id=\"bot_progress" + i + "\" class=\"bot_progressbar\">" + ((bot.time.curr/bot.time.max) * 100).toFixed(0) + "%</div> <div id=\"bot_last_find" + i + "\">Last Find: " + bot.last_find + "</div> </div>";
            pg.append(bot_display_text);
        } else if(!bot.queue.ready){
            bot_display_text = "<div id=\"bot_display_" + i + "\" class=\"bot_display_\">" + "<h2 id=\"bot_name" + i + "\">" + random_char[Math.round(randNum(0, random_char.length-1))] + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span> <div>BOT in production.</div> <div id=\"bot_producing" + i + "\">" + format_numbers(((bot.queue.curr_time/bot.queue.time_till) * 100).toFixed(2)) + "% Complete</div>";
            pg.append(bot_display_text);
        }
        //"<div id=\"bot_display + \i\ + \"" + "> </div>"
        bot.displayed = true;
    }
}

var new_sort = [];
function sort_bot_display(sort){
    GID("bot_display_container").innerHTML = "";
    for(var i = 0; i < bots.length; i++){
        bot = bots[i];
        if(!bot.queue.ready){
            bot_display_text = "<div id=\"bot_display_" + i + "\" class=\"bot_display_\">" + "<h2 id=\"bot_name" + i + "\">" + random_char[Math.round(randNum(0, random_char.length-1))] + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span> <div>BOT in production.</div> <div id=\"bot_producing" + i + "\">" + format_numbers(((bot.queue.curr_time/bot.queue.time_till) * 100).toFixed(2)) + "% Complete</div>";
            pg.append(bot_display_text);
        }
    }
    //alert(sort);
    new_sort = [];
    //console.log("old: " + new_sort);
    if(sort == "name"){
        var bot_name = [];
        for (var i = 0; i < bots.length; i++) {
            var bot = bots[i];
            if(bot.queue.ready){
                bot_name[i] = bot.name;
            }
            //console.log(bot_name);
        };
        bot_name.sort();
        //console.log(bot_name);
        for(var i = 0; i < bots.length; i++){
            for (var j = 0; j < bot_name.length; j++) {
                if(bots[j].name == bot_name[i]){
                    //new_sort[i] = bots[j];
                    //console.log("i: " + i);
                    var bot = bots[j];
                    //console.log(bot);
                    if(bot.queue.ready){
                        bot_display_text = "<div id=\"bot_display_" + j + "\" class=\"bot_display_\">" + "<h2 id=\"bot_name" + j + "\">" + bot.name + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span>" + "<div id=\"bot_AI_lvl" + j + "\" class=\"toolTip\">AI Level: " + bot.AI_lvl.toFixed(0) + "</div> <div id=\"bot_AI_nextlvl" + j + "\" >Next Level: " + (bot.finds_for_next_lvl - bot.total_finds).toFixed(0) + "</div> <div id=\"bot_progress" + j + "\" class=\"bot_progressbar\">" + ((bot.time.curr/bot.time.max) * 100).toFixed(0) + "%</div> <div id=\"bot_last_find" + j + "\">Last Find: " + bot.last_find + "</div> </div>";
                        pg.append(bot_display_text);
                    }
                }
            };
        }
    }
}

function get_end_ID(id){
    var x = "";
    for(var i = 0; i < id.length; i++){
        if(i > 11){
            x += id[i];
        }
        //console.log("Run: " + x);
    }
    return x;
}
$(document).on('click', '.bot_display_' ,function() {
    var x = this.id;
    var indx = Number(get_end_ID(x));
    //console.log(indx);
    //console.log(bots[indx]);
    if(!bots[indx].queue.ready && (bots[indx].queue.curr_time >= bots[indx].queue.time_till)){
        bots[indx].queue.ready = true;
        var bot_name = bot_names[Math.round(randNum(0, bot_names.length-1))];
        bots[indx].name = bot_name.toUpperCase();
        display_bots();
        //console_display(bots[indx].type.toUpperCase() + " BOT fabricated, resource gathering has begun");
        increase_intelligence();
        //console.log(bots[indx]);
    } else if(bots[indx].queue.ready){
        var bot_name = prompt("Name this BOT", "random");
        console.log(bots[indx]);
        if(bot_name == null || bot_name == '' || bot_name == "random"){
            bot_name = bot_names[Math.round(randNum(0, bot_names.length-1))];
        }
        //alert(this.id[(this.id).length - 1]);
        bots[indx].name = bot_name.toUpperCase();
        GID("bot_name" + indx).innerHTML = bots[Number(indx)].name;
        //console.log(bots[indx]);
    }
});

window.setInterval(function(){
    if(curr_page == "bots"){
        for(var i = 0; i < bots.length; i++){
            bot = bots[i];
            if(bot.queue.ready && bot.displayed){
                GID("bot_AI_lvl" + i).innerHTML = "AI Level: " + bot.AI_lvl.toFixed(0);
                GID("bot_AI_nextlvl" + i).innerHTML = "Next Level: " + (bot.finds_for_next_lvl - bot.total_finds).toFixed(0) ;
                GID("bot_progress" + i).innerHTML = ((bot.time.curr/bot.time.max) * 100).toFixed(0) + "%";
                GID("bot_last_find" + i).innerHTML = "Last Find: " + bot.last_find;
            }
            if(!bot.queue.ready && bot.displayed){
                GID("bot_producing" + i).innerHTML = format_numbers(((bot.queue.curr_time/bot.queue.time_till) * 100).toFixed(2)) + "% Complete";
            }
        }
    }
}, 100);

display_bots();
function bot_update(){
    var id = 0;
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];
        bot.x += bot.vx;
        bot.y += bot.vy;

        if(bot.queue.curr_time < bot.queue.time_till){
            bot.queue.curr_time += 20/((60) * bot.queue.time_to_fabricate); //1 second/(number of seconds you want)
        }
        if(bot.queue.curr_time >= bot.queue.time_till && !bot.queue.ready){
            $("#bot_display_" + i).css("border", "3px solid rgb(230, 90, 90)") //1 second/(number of seconds you want)
        } else if(bot.queue.ready){
            $("#bot_display_" + i).css("border", "3px solid rgb(90, 180, 90)")
        }

        if(bot.total_finds >= bot.finds_for_next_lvl){
            bot.AI_lvl += 1;
            bot.smartness -= Math.round(randNum(0, 1));
            bot.finds_for_next_lvl = bot.og_finds_for_next_lvl + (bot.og_finds_for_next_lvl * 0.2);
            bot.og_finds_for_next_lvl = bot.finds_for_next_lvl;
            bot.storage.max += Math.round(bot.storage.max * 0.6);
        }

        if(bot.AI_lvl > 1){
            bot.find_per_tick = ((bot.AI_lvl * 0.4) + (bot.AI_lvl * 0.1));
        } else {
            bot.find_per_tick = (1);
        }

        if(bot_checkCollision(bot, cell) && !bot.active){
            cell.absorbEnergy(bot, 0);
            //console.log(cell.energy);
        }

        if(return_distance(bot.x, bot.y, cell.x, cell.y) < cell.r){
            bot.launching = true;
            bot.vx = Math.cos(randNum(0, 360)) * bot.speed;
            bot.vy = Math.sin(randNum(0, 360)) * bot.speed;
        } else {
            bot.launching = false;
        }

        if(bot.active && !bot.launching && bot.queue.ready){
            bot.r = bot.og_r;
            bot_gather(bot);
        } else {
            bot_return_to_cell(bot);
            if(bot_checkCollision(bot, cell)){
                bot.vx = -bot.vx;
                bot.vy = -bot.vy;
            }
        }
    };
}

function bot_gather(object){
    var ran =  randNum(0, object.smartness);
    object.color = "White";
    var ang = return_angle(object.x, object.y, randNum(map_w, -map_w), randNum(map_h, -map_h));
    if(true){
        if(object.type == "resource"){
            object.time.curr++;//update the bot active time//
            var res = resources_[Math.round(randNum(0, 4))];
            /*if(res.types.second == "life"){
                return 0;
            }*/
            //Check if bot time has reached peak//
            if(object.time.curr >= object.time.max){
                res.amount += object.storage.resource_amount;
                if(res.types.second == "energy"){
                    parts.amount += object.storage.resource_amount;
                }
                object.last_find = object.storage.resource_amount.toFixed(0) + " " + res.resource;
                object.storage.resource_amount = 0;
                object.time.curr = 0;
            }
            if(ran < res.rarity){
                object.storage.resource_amount += object.find_per_tick;
                object.total_finds += object.find_per_tick;
                if(object.storage.resource_amount >= object.storage.max){
                    res.amount += object.storage.resource_amount;
                    if(res.types.second != "energy"){
                        parts.amount += object.storage.resource_amount;
                    }
                    object.last_find = object.storage.resource_amount.toFixed(0) + " " + res.resource;
                    object.storage.resource_amount = 0;
                    object.time.curr = 0;
                }
            }
        } else if(object.type == "engines"){
            object.time.curr++;//add one to the bot active time//
            var eng = engines_[Math.round(randNum(0, 2))];
            //Check if bot time has reached peak//
            if(object.time.curr >= object.time.max){
                eng.amount += object.storage.resource_amount;
                object.last_find = object.storage.resource_amount.toFixed(0) + " " + eng.resource;
                object.storage.resource_amount = 0;
                object.time.curr = 0;
            }
            if(ran < eng.rarity){
                var rand = randNum(0, 50);
                if(rand < 20){
                     object.storage.resource_amount += object.find_per_tick;
                    object.total_finds += object.find_per_tick;
                    if(object.storage.resource_amount >= object.storage.max){
                         eng.amount += object.storage.resource_amount;
                         parts.amount += object.storage.resource_amount;
                        object.last_find = object.storage.resource_amount.toFixed(0) + " " + eng.resource;
                        object.storage.resource_amount = 0;
                        object.time.curr = 0;
                    }
                }
            }
        } else if(object.type == "forms"){
            object.time.curr++;//add one to the bot active time//
            var form = forms_[Math.round(randNum(0, 3))];
            //Check if bot time has reached peak//
            if(object.time.curr >= object.time.max){
                form.amount += object.storage.resource_amount;
                object.last_find = object.storage.resource_amount.toFixed(0) + " " + form.resource;
                object.storage.resource_amount = 0;
                object.time.curr = 0;
            }
            if(ran < form.rarity){
                var rand = randNum(0, 60);
                if(rand < 15){
                    object.storage.resource_amount += object.find_per_tick;
                    object.total_finds += object.find_per_tick;
                    if(object.storage.resource_amount >= object.storage.max){
                        form.amount += object.storage.resource_amount;
                        parts.amount += object.storage.resource_amount;
                        object.last_find = object.storage.resource_amount.toFixed(0) + " " + eng.resource;
                        object.storage.resource_amount = 0;
                        object.time.curr = 0;
                    }
                }
            }
        }
    }

    if(ran < 2 && !bot_checkCollision(object, cell)){
        object.vx = Math.cos(ang) * -object.speed;
        object.vy = Math.sin(ang) * -object.speed;
    }

    if(object.energy >= object.max_storage){
        activeBots--;
        object.active = false;
    }
}

function bot_return_to_cell(object){
    object.color = "red";
    var ang = return_angle(object.x, object.y, cell.x, cell.y);
    object.vx = Math.cos(ang) * -object.speed;
    object.vy = Math.sin(ang) * -object.speed;
}

function bot_checkCollision(object, object2){
    //check against 1 object
    if(object2.single){
        var dis = return_distance(object.x, object.y, object2.x, object2.y);
        if(dis < (object.r) + object2.r){
            return true;
        }
    } else {
    //check againt multiple objects
        for (var i = 0; i < object2.length; i++) {
            var obj2 = object2[i];
            var dis = return_distance(object.x, object.y, obj2.x, obj2.y);
            if (dis < (object.r) + obj2.r) {
                return true;
            }
        }
    }
}
