Player.all = {};
Player.count = 0;
function Player(user_id){
	Player.count++;
	this.id = user_id;
	Player.all[this.id] = this;
	this.x = VAR.W/2;
	this.y = VAR.H/2;
	this.bX = Game.board.checkX(this.x);
	this.bY = Game.board.checkY(this.y);

	this.FX = 75;
	this.FY = 75;
}

Player.prototype.move = function(move){

	if(move == 37){
		this.x-=5;
		this.bX = Game.board.checkY(this.x);
	}else if(move == 39){
		this.x+=5;
		this.bX = Game.board.checkX(this.x);
	}
	if(move == 38){
		this.y -=5;
		this.bY = Game.board.checkY(this.y);
	}else if(move == 40){
		this.y +=5;
		this.bY = Game.board.checkY(this.y);
	}
}

Player.prototype.draw = function(){
	// Game.ctx.fillStyle = 'red';
	// Game.ctx.fillRect(this.x, this.y, 5, 5);

	Game.ctx.drawImage(
		Game.hero1,
		0,
		0,
		this.FX,
		this.FY,
		(this.x)*VAR.scale,
		(this.y)*VAR.scale,
		this.FX*VAR.scale,
		this.FY*VAR.scale
	);	
}
Player.draw = function(){
	for(var p in Player.all){
		Player.all[p].draw();
	}
}
//