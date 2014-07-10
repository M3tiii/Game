
window.onload = function(){
	Game.pipe_spr = new Image();
	Game.pipe_spr.src = 'app/image/pipe.png';

	Game.menu_spr = new Image();
	Game.menu_spr.src = 'app/image/menu.png';

	Game.background_spr = new Image();
	Game.background_spr.src = 'app/image/background.png';

	Game.bird_spr = new Image();
	Game.bird_spr.src = 'app/image/bird.png';
	Game.bird_spr.onload = Game.init;
}

VAR = {
	user_id:'',
	move:0,
	down:false,
	fps:60,
	W:0,
	H:0,
	scale:0,
	TO_RADIANS:Math.PI/180,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
Game = {
	init:function(){

		Game.canvas_background = document.createElement('canvas');		//canvas for pipe and background
		Game.ctx_background = Game.canvas_background.getContext('2d');
		Game.canvas_menu = document.createElement('canvas'); 			//canvas for menu options
		Game.ctx_menu = Game.canvas_menu.getContext('2d');
		Game.canvas = document.createElement('canvas');					//canvas for bird
		Game.ctx = Game.canvas.getContext('2d');
	

		Game.layout();
		window.addEventListener('resize', Game.layout, false);
		
		document.body.appendChild(Game.canvas_background);
		document.body.appendChild(Game.canvas_menu);
		document.body.appendChild(Game.canvas);
		
		console.log('INIT SCREEN');
		VAR.scale = Math.round(Math.sqrt(VAR.H*(3/4)*VAR.H*(3/4)+VAR.W*VAR.W)/10)/100;

		//
		new Menu();
		new Background(0);
		new Pipe(VAR.rand(0,1));
		//
		Game.animationLoop();
	},

	stop:function(){
	
	},

	onKey:function(ev){

	},

	layout:function(ev){
		VAR.W = Math.round(window.innerWidth);
		VAR.H = Math.round(window.innerHeight);
		VAR.d = Math.min(VAR.W, VAR.H);

		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H*(3/4);
		Game.canvas_background.width = VAR.W;
		Game.canvas_background.height = VAR.H*(3/4);
		Game.canvas_menu.width = VAR.W;
		Game.canvas_menu.height = VAR.H;

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

			if(VAR.down){
					Player.all[VAR.user_id].pressKey(VAR.move);
			}
			Player.draw(); 
			
		}
	}
}
//