Background.type = {
	'b0':{FXmod: 0, FYmod: 0}, //day
	'b1':{FXmod: 1, FYmod: 0}, //night
}

function Background(id_background){
	this.FX = 144;
	this.FY = 256;
	this.type = 'b'+id_background;

	this.draw(id_background);
}


Background.prototype.draw = function(id_background){
	for(var x=0; x<=Math.ceil(VAR.W/((VAR.H*(3/4)/this.FY)*this.FX))+1; x++){
		Game.ctx_background.drawImage(
			Game.background_spr,
			this.FX*Background.type[this.type].FXmod,
			this.FY*Background.type[this.type].FYmod,
			this.FX-1,
			this.FY,
			x*(VAR.H*(3/4)/this.FY)*this.FX,
			0,
			(VAR.H*(3/4)/this.FY)*this.FX,
			(VAR.H*(3/4)/this.FY)*this.FY
		);
	}
}