Zombie.all = {};
Zombie.count = 0;
Zombie.type = {
	'zombie1':{hp:100, attack:5, speed:1, rangeView:300, FmodX:0, FmodY:0},
	'zombie2':{hp:200, attack:10, speed:2, rangeView:3000, FmodX:3, FmodY:0},
	'zombie3':{hp:1000, attack:20, speed:0.5, rangeView:300, FmodX:6, FmodY:0},
	'zombie4':{hp:1000, attack:20, speed:0.5, rangeView:300, FmodX:9, FmodY:0},
	'zombie5':{hp:1000, attack:20, speed:1, rangeView:300, FmodX:12, FmodY:0},
	'zombie6':{hp:1000, attack:20, speed:2, rangeView:3000, FmodX:15, FmodY:0},
	'zombie7':{hp:1000, attack:20, speed:3, rangeView:300, FmodX:18, FmodY:0},
	'zombie8':{hp:1000, attack:20, speed:1, rangeView:300, FmodX:21, FmodY:0}
};

function Zombie(x, y, type){
	Zombie.count++;
	this.id = Zombie.count;
	Zombie.all[this.id] = this;
	this.type = type;

	this.x = x; //wsp w pikselach
	this.y = y;
	this.bX = Game.board.checkX(this.x); //wsp kwadratu na mapie
	this.bY = Game.board.checkY(this.y);
	this.bX_last = this.bX; //wsp poprzedniego kwadratu na mapie
	this.bY_last = this.bY;

	this.targetX;
	this.targetY;
	this.targetDistance = Zombie.type[this.type].rangeView;
	this.tmp_targetDistance = 0;

	this.count_move = VAR.space; //naprawic

	this.current_f = 0;
	this.change_f_delay = 0;
	this.f_max_delay = 6/Zombie.type[this.type].speed;

	this.FX = 34;
	this.FY = 45;
	

	this.state = 'wait';
	this.states = {
		//'down':{SX:34, SY:90, f:[1]},
		'down_go':{SX:34, SY:90, f:[1,0,1,2]},		
		//'up':{SX:34, SY:72, f:[0]},
		'up_go':{SX:34, SY:0, f:[1,0,1,2]},			
		//'left':{SX:34, SY:72, f:[0]},
		'left_go':{SX:34, SY:135, f:[1,0,1,2]},		
		//'right':{SX:34, SY:72, f:[0]},
		'right_go':{SX:34, SY:45, f:[1,0,1,2]},		
		'up_left_go':{SX:34, SY:0, f:[0,0,1,2,2,1]},	
		'up_right_go':{SX:34, SY:0, f:[0,0,1,2,2,1]},	
		'down_left_go':{SX:34, SY:90, f:[0,0,1,2,2,1]},	
		'down_right_go':{SX:34, SY:90, f:[0,0,1,2,2,1]},	
		'wait':{SX:34, SY:90, f:[1]},
		'attack':{SX:34, SY:0, f:[0]}
	}
}
Zombie.prototype.setDirection = function(x, y){
	
	for(var pZ in Player.all){ //szukanie najblizszego playera
		this.tmp_targetDistance = (Player.all[pZ].bX - x) * (Player.all[pZ].bX - x) + (Player.all[pZ].bY - y) * (Player.all[pZ].bY - y);
		if(this.tmp_targetDistance <= this.targetDistance){
			this.targetDistance = this.tmp_targetDistance;
			this.targetX = Player.all[pZ].bX;
			this.targetY = Player.all[pZ].bY;
		}		
	}
	this.bX_last = this.bX;
	this.bY_last = this.bY;

		if(this.targetX <= x && this.targetY <=y){
			if(this.targetX == x && Board.map[x][y-1].type == 'free'){
				this.state = 'up_go';
			}else if(this.targetY == y && Board.map[x-1][y].type == 'free'){
				this.state = 'left_go';
			}else if(Board.map[x-1][y-1].type == 'free'){
				this.state = 'up_left_go';
			}else{
				this.state = 'wait';
			}
		}else if(this.targetX > x && this.targetY <y){
			if(Board.map[x+1][y-1].type == 'free'){
				this.state = 'up_right_go';
			}else{
				this.state = 'wait';
			}
		}else if(this.targetX >= x && this.targetY >=y){
			if(this.targetX == x && Board.map[x][y+1].type == 'free'){
				this.state = 'down_go';
			}else if(this.targetY == y && Board.map[x+1][y].type == 'free'){
				this.state = 'right_go';
			}else if(Board.map[x+1][y+1].type == 'free'){
				this.state = 'down_right_go';
			}else{
				this.state = 'wait';
			}
		}else if(this.targetX < x && this.targetY >y){
			if(Board.map[x-1][y+1].type == 'free'){
				this.state = 'down_left_go';
			}else{
				this.state = 'wait';
			}
		}
		if(this.tmp_targetDistance <= 2){
		 	this.state = 'attack';
		 	//Board.map[x][y].type = 'zombieStay';
		}
		console.log(this.state);

	
	this.targetDistance = Zombie.type[this.type].rangeView;
}

Zombie.prototype.move = function(){

	if(this.x % VAR.space == 0){
		this.bX = Game.board.checkX(this.x);
		this.bY = Game.board.checkY(this.y);

		Zombie.all[this.id].setDirection(this.bX, this.bY);
	}
	
	switch(this.state){
		case 'left_go':
			this.x-= Zombie.type[this.type].speed;
			break;
		case 'right_go':
			this.x+= Zombie.type[this.type].speed;
			break;
		case 'down_go':
				this.y+= Zombie.type[this.type].speed;
			break;
		case 'up_go':
				this.y-= Zombie.type[this.type].speed;
			break;
		case 'up_left_go':
			this.x-= Zombie.type[this.type].speed*0.5;
			this.y-= Zombie.type[this.type].speed*0.5;
			break;
		case 'up_right_go':
			this.x+= Zombie.type[this.type].speed*0.5;
			this.y-= Zombie.type[this.type].speed*0.5;
			break;
		case 'down_left_go':
			this.x-= Zombie.type[this.type].speed*0.5;
			this.y+= Zombie.type[this.type].speed*0.5;
			break;
		case 'down_right_go':
			this.x+= Zombie.type[this.type].speed*0.5;
			this.y+= Zombie.type[this.type].speed*0.5;
			break;
	}


}

Zombie.prototype.draw = function(){

	
	if(this.change_f_delay==this.f_max_delay){
		this.current_f++;
		this.change_f_delay = 0;
	}
	if(this.current_f>this.states[this.state].f.length-1){
		this.current_f = 0;
	}
	Game.ctx.drawImage(
		Game.zombie_spr,
		3+this.FX*Zombie.type[this.type].FmodX+this.states[this.state].SX*this.states[this.state].f[this.current_f],
		this.states[this.state].SY,
		this.FX,
		this.FY,
		(this.x)*VAR.scale,
		(this.y-this.FY+VAR.space)*VAR.scale,
		this.FX*VAR.scale,
		this.FY*VAR.scale
	);	

	this.change_f_delay++;
}
Zombie.life = function(){
	for(var z in Zombie.all){	
		Zombie.all[z].move();
		Zombie.all[z].draw();
	}
}
