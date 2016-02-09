var cell = {
  single:true,
	x: 0,
  	y: 0,
	energy:0,
	color: "rgba(104, 155, 205, 0.3)",
	og_r:0.02,
	r: 100,
	vx:0,
	vy:0,	
 
	draw: function(){
		ctx.save();
    //ctx.translate((offset.directionX), (offset.directionY));

    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Energy: " + format_numbers(this.energy.toFixed(2)), this.x - 200, this.y - 200);
    ctx.fill();
    //set line color
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.og_r, 0, (2 * Math.PI));
    ctx.fillStyle = this.color;
    ctx.fill();

		ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.stroke();
    ctx.fill();

		ctx.restore();
  },

	update: function(){
		this.x += this.vx;
		this.y += this.vy;
    if(this.energy >= 1000){
      $("#settings_nav").removeClass("not_displayed")
    }

    if(this.energy >= 0 && ship.time.day >= 4){
      $("#engine_bots_").removeClass("not_displayed");
    }

    if(this.energy >= 0 && ship.time.day >= 8){
      $("#forms_bots_").removeClass("not_displayed");
    }

    if(this.energy >= 100000){
      upgrades_unlocked = true;
    }

    if(story_shown){
      $("#bots_nav").removeClass("not_displayed");
      $("#energy").removeClass("not_displayed");
    }
	},

	checkCollision: function(object){
    //check against 1 object
    if(object.single){
      var dis = return_distance(this.x, this.y, object.x, object.y);
      if(dis < (this.r) + object.r){
        return true;
      }
    } else {
        //check againt multiple objects
      for (var i = 0; i < object.length; i++) {
        var obj = object[i];
        var dis = return_distance(this.x, this.y, obj.x, obj.y);
        if (dis < (this.r) + obj.r) {
          return true;
        }
      }
    }
  },
}

/*window.setInterval(function(){
  if(cell.r >= cell.og_r + 100){
    cell.r = cell.og_r;
  }
  cell.r += 1;
}, 1);*/
/*window.setInterval(function(){
  console.log("energy: " + player.energy + " Cell Energy: " + cell.energy);
  console.log("overGen: " + energytransport.energy);
}, 1000);*/
