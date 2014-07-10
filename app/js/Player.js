Player.all = {};
Player.count = 0;
Player.type = {
	'bird1':{FXmod: 0, FYmod:0},
	'bird2':{FXmod: 0, FYmod:1},
	'bird3':{FXmod: 0, FYmod:2}


};
function Player(user_id){
	Player.count++;
	this.id = user_id;
	Player.all[this.id] = this;

	this.x = 20;
	this.y = VAR.H/4;
	this.r = 0;
	this.pipeCounter = 0;

	this.start = false;
	this.up = false;
	this.death = false;
	this.type = 'bird' + VAR.rand(1,3);

	this.current_f = 0;
	this.change_f_delay = 0;
	this.f_max_delay = 2;
	this.FX = 17;
	this.FY = 12;
	this.FPlay = [1,0,1,2]


}

Player.prototype.pressKey = function(key){
	if(key == 32){
		this.up = true;
		this.start = true;
	}
}

Player.prototype.move = function(){
	if(this.y <= this.FY){
		this.r=0;
		this.up = false;
		this.y++;
	}else if(this.y+this.FX >= VAR.H*(3/4)){
		this.death = true;
	}else if(this.r>-60 && this.up){
			this.r-=10;
	}else if(this.r<60){
		this.r+=4;
		this.up = false;
	}

	this.x = this.x + 1*VAR.scale;


	this.y = this.y + Math.round(this.r/16)*VAR.scale;


}

Player.prototype.drawRotatedImage = function(image, x, y, angle) { 
 

	Game.ctx.save(); 
	Game.ctx.translate(x, y);
	Game.ctx.rotate(angle * VAR.TO_RADIANS);

	if(this.change_f_delay==this.f_max_delay){
		this.current_f++;
		this.change_f_delay = 0;
	}
	if(this.current_f>this.FPlay.length-1){
		this.current_f = 0;
	}
	this.change_f_delay++;

	Game.ctx.drawImage(
		image, 
		this.FX*Player.type[this.type].FXmod + this.FX*this.FPlay[this.current_f], 
		this.FY*Player.type[this.type].FYmod,
		this.FX, 
		this.FY,
		-this.FX,
		-this.FY/2,
		this.FX*VAR.scale,
		this.FY*VAR.scale

	);
	Game.ctx.restore(); 
}
Player.prototype.checkPosition = function(){
	if(this.x >= Pipe.position[this.pipeCounter].x && this.x <= Pipe.position[this.pipeCounter].x+Pipe.position[this.pipeCounter].w){
		if(this.y <= Pipe.position[this.pipeCounter].y1+Pipe.position[this.pipeCounter].h*(3/4) || this.y >= Pipe.position[this.pipeCounter].y2-Pipe.position[this.pipeCounter].h*(3/4)){
			this.death = true;
		}else{
			//score ++!!!
		}
	}else if(this.x > Pipe.position[this.pipeCounter].x+Pipe.position[this.pipeCounter].w){
		this.pipeCounter++;
	}
	if(this.pipeCounter>=9){ //dolecial do konca!!!
		this.death = true;
	}
}
Player.prototype.deathOrAlive = function(){
	if(this.death){
		delete Player.all[this.id];
		this.id = new Player(this.id);

	}
}

Player.draw = function(){
	for(var p in Player.all){

		Player.all[p].drawRotatedImage(Game.bird_spr, Player.all[p].x, Player.all[p].y, Player.all[p].r);
		if(Player.all[p].start){
			Player.all[p].checkPosition();
			Player.all[p].move();
			Player.all[p].deathOrAlive();
		}
	}
}



