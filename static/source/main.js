var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var play = function(game) {
	this.balls = [];
}

play.prototype = {
	preload: function() {
		this.disableVisibilityChange = true;
	},

	create: function() {
		this.socketConnect();
	},

	update: function() {
	},

	createBall: function(id, x, y, radius, color) {
		var ball = new Circle(id, x, y, radius * 2, color);

		this.balls.push(ball);
	},

	createWall: function(x, y, width, height) {
		var graphics = game.add.graphics(x - width, y - height);
		graphics.beginFill(0xFF0000);
		graphics.drawRect(0, 0, width * 2, height * 2);
		graphics.endFill();
	},

	changePositionBall: function(id, x, y) {
		for (var i in this.balls) {
			if (this.balls[i].id == id) {
				this.balls[i].x = x;
				this.balls[i].y = y;
				break;
			}
		}
	},

	socketConnect: function() {
		var socket = io.connect('ws://localhost:2000');

		socket.on('createBall', (function(data) {			
			this.createBall(data.id, data.x, data.y, data.radius, data.color);
		}).bind(this));

		socket.on('ballMove', (function(data) {
			this.changePositionBall(data.id, data.x, data.y);
		}).bind(this));
	}
};


game.state.add("Play", play);
game.state.start("Play");