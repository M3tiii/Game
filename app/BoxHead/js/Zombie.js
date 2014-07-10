Zombie.all = {};
Zombie.count = 0;
Zombie.type = {
	'zombie1':{hp:100, attack:5, speed:2, FmodX:0, FmodY:0},
	'zombie2':{hp:200, attack:10, speed:4, FmodX:3, FmodY:0},
	'zombie3':{hp:1000, attack:20, speed:2, FmodX:6, FmodY:0}

};

function Zombie(x, y){
	Zombie.count++;
	this.id = Zombie.count;
	Zombie.all[this.id] = this;
	this.x = x;
	this.y = y;
	this.targetX = 0;
	this.targetY = 0;
	this.last_x = Game.board.check(Zombie.all[this.id].x, Zombie.all[this.id].y).x;
	this.last_y = Game.board.check(Zombie.all[this.id].x, Zombie.all[this.id].y).y;
	this.targetDistance = 300;	//zasieg widzenia zombi
	this.tmp_targetDistance = 0;

	this.count_move = VAR.space;
	this.direction = '';

	this.current_f = 0;
	this.change_f_delay = 0;
	this.f_max_delay = 2;

	this.FX = 34;
	this.FY = 45;
	

	this.state = 'down';
	this.states = {
		'down':{SX:0, SY:72, f:[0]},
		'down_go':{SX:0, SY:72, f:[0,1,0,2]},
		'up':{SX:0, SY:72, f:[0]},
		'up_go':{SX:0, SY:72, f:[0,1,0,2]},
		'left':{SX:0, SY:72, f:[0]},
		'left_go':{SX:0, SY:72, f:[0,1,0,2]},
		'right':{SX:0, SY:72, f:[0]},
		'right_go':{SX:0, SY:72, f:[0,1,0,2]}
	}
}

Zombie.prototype.setDirection = function(x, y){
	//console.log(Zombie.all['1'].count_move)
	
	if(this.count_move==VAR.space){
			for(var pZ in Player.all){ //szukanie najblizszego playera
				this.tmp_targetDistance = (Player.all[pZ].checkX - x) * (Player.all[pZ].checkX - x) + (Player.all[pZ].checkY - y) * (Player.all[pZ].checkY - y);
				if(this.tmp_targetDistance <= this.targetDistance){
					this.targetDistance = this.tmp_targetDistance;
					this.targetX = Player.all[pZ].checkX;
					this.targetY = Player.all[pZ].checkY;
				}			
			}
			this.targetDistance = 300; ///zasieg widzenia
			
		if(VAR.rand(0,1)){
			if(x > this.targetX && Board.map[x-1][y].type == 'free'){
				this.state = 'left_go';
				Board.map[x-1][y].type = 'zombieStay';
			}else if(x < this.targetX && Board.map[x+1][y].type == 'free'){
				this.state = 'right_go';
				Board.map[x+1][y].type = 'zombieStay';
			}else if(y < this.targetY && Board.map[x][y+1].type == 'free'){
				this.state = 'down_go';
				Board.map[x][y+1].type = 'zombieStay';
			}else if(y > this.targetY && Board.map[x][y-1].type == 'free'){
				this.state = 'up_go';
				Board.map[x][y-1].type = 'zombieStay';
			}else{
				this.state = 'wait';
				Board.map[x][y].type = 'zombieStay';
			}
		}
		else{
			if(y < this.targetY && Board.map[x][y+1].type == 'free'){
				this.state = 'down_go';
				Board.map[x][y+1].type = 'zombieStay';
			}else if(y > this.targetY && Board.map[x][y-1].type == 'free'){
				this.state = 'up_go';
				Board.map[x][y-1].type = 'zombieStay';
			}else if(x > this.targetX && Board.map[x-1][y].type == 'free'){
				this.state = 'left_go';
				Board.map[x-1][y].type = 'zombieStay';
			}else if(x < this.targetX && Board.map[x+1][y].type == 'free'){
				this.state = 'right_go';
				Board.map[x+1][y].type = 'zombieStay';
			}else{
				this.state = 'wait';
				Board.map[x][y].type = 'zombieStay';
			}
		}

		if(this.tmp_targetDistance <= 2){
		 	this.state = 'attack';
		 	Board.map[x][y].type = 'zombieStay';
		}

		this.count_move = 0;
	}
	if(this.count_move == (VAR.space/2 -2) && this.state != 'wait' && this.state != 'attack'){
		Board.map[this.last_x][this.last_y].type = 'free';
		Game.ctx.fillStyle = 'blue';
		Game.ctx.fillRect(this.last_x*30, this.last_y*30, 30, 30);
	}
	if(this.count_move == 1){
	this.last_x = x;
	this.last_y = y;
	Game.ctx.fillStyle = 'red';
	Game.ctx.fillRect(x*30, y*30, 30, 30);
	}
	if(this.tmp_targetDistance > this.targetDistance){
		this.state = 'wait';
		Board.map[x][y].type = 'zombieStay';
	}
	this.count_move++;
}
Zombie.prototype.move = function(){
	Zombie.all[this.id].setDirection(Game.board.check(Zombie.all[this.id].x, Zombie.all[this.id].y).x, Game.board.check(Zombie.all[this.id].x, Zombie.all[this.id].y).y);
	if(this.state == 'left_go'){ //case czy tam switch
		Zombie.all[this.id].x--;
	}else if(this.state == 'right_go'){
		Zombie.all[this.id].x++;
	}else if(this.state == 'down_go'){
		Zombie.all[this.id].y++;
	}else if(this.state == 'up_go'){
		Zombie.all[this.id].y--;
	}

}

Zombie.prototype.draw = function(){
	Game.ctx.drawImage(
		Game.zombie_spr,
		this.FX*Zombie.type.zombie3.FmodX,
		this.FY*Zombie.type.zombie3.FmodY,
		this.FX,
		this.FY,
		this.x*VAR.scale,
		this.y*VAR.scale,
		this.FX*VAR.scale,
		this.FY*VAR.scale
	);
}

Zombie.life = function(){
	for(var z in Zombie.all){
		
		
			// for(var j = 1; j<z; j++){
			// 	if(Zombie.all[j].y > Zombie.all[j+1].y) {
			// 		console.log('aa');
   //                  var temp = Zombie.all[j];
   //                  Zombie.all[j] = Zombie.all[j+1];
   //                  Zombie.all[j+1] = temp;
   //              }
			// }
			// console.log(Zombie.all[z].y);
		Zombie.all[z].move();
		Zombie.all[z].draw();
	}
}
	


