var socket = io.connect();

var move;

function OnKeyDown(key_down){
	//console.log(User.all[User.id]);
     socket.emit('key_down', { move: key_down.keyCode});

}
function OnKeyUp(key_up){
     socket.emit('key_up', { move: key_up.keyCode});

}
function OntouchDown(touch_down){
	 touch_down.preventDefault()
     socket.emit('touch_down');


}
function OntouchUp(touch_up){
	 touch_up.preventDefault()
     socket.emit('touch_up');

}

window.onload = function() {
	window.addEventListener('keydown', OnKeyDown, false);
	window.addEventListener('keyup', OnKeyUp, false);
	window.addEventListener('touchstart', OntouchDown, false);
	window.addEventListener('touchend', OntouchUp, false);
};
//