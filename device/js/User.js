User.all = {};
User.count = 0;
function User(id){
	User.count++;

	this.id = 'User_' + User.count;
	User.all[this.id] = this;
	
	this.name = '';


}

module.exports = User;
//