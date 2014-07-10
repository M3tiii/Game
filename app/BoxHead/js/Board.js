
Board.map = [];
function Board(){
	this.row = Math.round(VAR.H/VAR.space);
	this.column = Math.round(VAR.W/VAR.space);
	
}

Board.prototype.parse = function(){
	for(var i=0; i<this.column; i++){
		Board.map.push([]);
		for(var j=0; j<this.row; j++){
			Board.map[i].push({x:i*VAR.space, y:j*VAR.space, type:'free'});
		}
	}
}

Board.prototype.checkX = function(x){
	return Math.floor(x/VAR.space);
}
Board.prototype.checkY = function(y){
	return Math.floor(y/VAR.space);
}
