Pipe.type = {
	'redup':{FXmod: 0, FYmod: 0},
	'redpipeup':{FXmod: 0, FYmod: 1},
	'reddown':{FXmod: 1, FYmod: 0},
	'redpipedown':{FXmod: 1, FYmod: 1},

	'greenup':{FXmod: 3, FYmod: 0},
	'greenpipeup':{FXmod: 3, FYmod: 1},
	'greendown':{FXmod: 2, FYmod: 0},
	'greenpipedown':{FXmod: 2, FYmod: 1}
}
Pipe.color = ['red', 'green'];
Pipe.position = [];
function Pipe(id_color){
	this.column = VAR.W/40/VAR.scale;
	this.FX = 26;
	this.FY = 13;
	this.column = Math.round(VAR.W/20*VAR.scale);
	this.row = Math.round((VAR.H*(3/4))/16*VAR.scale);
	this.type = '';
	this.pipeHeight = VAR.rand(1,7);
	this.color = Pipe.color[id_color];

	this.draw(this.color);
}

Pipe.prototype.draw = function(color){
	for(var i = 2; i<=10; i++){
		this.pipeHeight = VAR.rand(1,4);

		for(var n = 0; n<10;n++){
			if(n == this.pipeHeight){
				for(var y=-5; y<this.pipeHeight*this.row; y++){
					this.type = color+'pipedown';
					Game.ctx_background.drawImage(
							Game.pipe_spr,
							this.FX*Pipe.type[this.type].FXmod,
							this.FY*Pipe.type[this.type].FYmod,
							this.FX,
							this.FY,
							i*this.column,
							y,
							this.FX*VAR.scale,
							this.FY*VAR.scale
					);
				}
				Pipe.position.push({x:i*this.column, y1:n*this.row+this.FY, y2:(n+3)*this.row, w:this.FX*VAR.scale, h:this.FY*VAR.scale});
				this.type = color+'down';
				Game.ctx_background.drawImage(
						Game.pipe_spr,
						this.FX*Pipe.type[this.type].FXmod,
						this.FY*Pipe.type[this.type].FYmod,
						this.FX,
						this.FY,
						i*this.column,
						n*this.row,
						this.FX*VAR.scale,
						this.FY*VAR.scale
				);
			}

			if(n == this.pipeHeight+3){
				for(var y=n*this.row+this.FY; y<VAR.H*(3/4); y++){
					this.type = color+'pipeup';
					Game.ctx_background.drawImage(
						Game.pipe_spr,
						this.FX*Pipe.type[this.type].FXmod,
						this.FY*Pipe.type[this.type].FYmod,
						this.FX,
						this.FY,
						i*this.column,
						y,
						this.FX*VAR.scale,
						this.FY*VAR.scale
					);
				}
				this.type = color+'up';
				Game.ctx_background.drawImage(
						Game.pipe_spr,
						this.FX*Pipe.type[this.type].FXmod,
						this.FY*Pipe.type[this.type].FYmod,
						this.FX,
						this.FY,
						i*this.column,
						n*this.row,
						this.FX*VAR.scale,
						this.FY*VAR.scale
				);
			}

		}
		
	}	
}

