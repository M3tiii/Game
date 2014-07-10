
function Menu(){
	this.FX = 160;
	this.FY = 50;

	this.draw();
}


Menu.prototype.draw = function(){
	for(var x=0; x<=Math.ceil(VAR.W/((VAR.H*(3/4)/this.FY)*this.FX))+1; x++){
		console.log('x');
		Game.ctx_menu.drawImage(
			Game.menu_spr,
			0,
			0,
			this.FX,
			this.FY,
			0,
			VAR.H*(3/4),
			VAR.W,
			VAR.H*(1/4)
		);
	}
	
}