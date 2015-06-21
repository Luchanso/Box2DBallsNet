var	io = require('socket.io')(2000),
	Ball = require('./ball'),
	Wall = require('./wall'),
	b2d = require("box2d"),
	fps = 30;

var world;
var iterations = 100; // Количество итераций для точности Box2D
var doSleep = false, gravity = new b2d.b2Vec2(0, 0);
var balls = [], walls = [], id = 0;
var countBalls = 30;

box2Init();
gameInit();

io.on('connect', function(socket) {
	for (var i = 0; i < countBalls; i++) {
		socket.emit('createBall', {
			id: balls[i].id,
			x: balls[i].x,
			y: balls[i].y,
			radius: balls[i].radius,
			color: balls[i].color,
		});
	}
});

function gameInit() {
	createWalls();

	for (var i = 0; i < countBalls; i++) {
		var ball = createBall();
		balls.push(ball);
	}
}

function box2Init() {	
	var worldAABB = new b2d.b2AABB();

	worldAABB.lowerBound.Set(-100, -100);
	worldAABB.upperBound.Set(900, 700);
	world = new b2d.b2World(worldAABB, gravity, doSleep);
}

function createBall() {
	var x = Math.random() * 800,
		y = Math.random() * 600;

	var color = 0xFF0000;
	var radius = 15;

	var ball = new Ball(++id, x, y, color, radius, world);
	return ball;
}

function update() {
	world.Step(1.0/fps, iterations);

	for (var i = 0; i < countBalls; i++) {
		io.sockets.emit('ballMove', {
			id: balls[i].id,
			x: balls[i].body.GetPosition().x,
			y: balls[i].body.GetPosition().y,
		});
	}
	//console.log(balls[0].body.GetPosition().y);
}

function createWalls() {
	walls.push(new Wall(400, -5, 400, 5, world));
	walls.push(new Wall(805, 300, 5, 300, world));
	walls.push(new Wall(400, 605, 400, 5, world));
	walls.push(new Wall(-5, 300, 5, 300, world));
}

setInterval(update, 1000/fps);