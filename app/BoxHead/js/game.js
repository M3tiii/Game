
window.onload = function(){
	Game.zombie_spr = new Image();
	Game.hero1 = new Image();
	Game.hero2 = new Image();
	Game.hero1.src = 'app/image/hero1.png';
	Game.hero2.src = 'app/image/hero2.png';
	Game.zombie_spr.src = 'app/image/zombie.png';
	Game.zombie_spr.onload = Game.init;
}

VAR = {
	user_id:'',
	move:0,
	down:false,
	fps:30,
	W:0,
	H:0,
	space:30,
	scale:1,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
Game = {
	init:function(){
		Game.canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');

	

		Game.layout();
		window.addEventListener('resize', Game.layout, false);
		document.body.appendChild(Game.canvas);
		console.log('INIT SCREEN');
		//

		Game.board = new Board();
		Game.board.parse();
		for(var i = 0; i < 10; i++){
			var a = VAR.rand(0,20);
			var b = VAR.rand(0,15);
			new Zombie(a*VAR.space, b*VAR.space, 'zombie' + VAR.rand(1,8) );

			
		}
		
		//
		Game.animationLoop();
	},

	stop:function(){
	
	},

	onKey:function(ev){

	},

	layout:function(ev){
		VAR.W = Math.round(window.innerWidth/VAR.space)*VAR.space;
		VAR.H = Math.round(window.innerHeight/VAR.space)*VAR.space;
		VAR.d = Math.min(VAR.W, VAR.H);

		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;

		Game.ctx.imageSmoothingEnabled = false;
		Game.ctx.mozImageSmoothingEnabled = false;
		Game.ctx.oImageSmoothingEnabled = false;
		Game.ctx.webkitImageSmoothingEnabled = false;

	},
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);

			//
			Zombie.life();
			
			//

			if(VAR.down){
					Player.all[VAR.user_id].move(VAR.move);
			}
			Player.draw(); 
		}
	}
}
//