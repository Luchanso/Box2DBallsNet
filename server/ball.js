var b2d = require("box2d");

var Ball = function(id, x, y, color, radius, world) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.color = color;
	this.radius = radius;

	var shapeDef = new b2d.b2CircleDef();
	shapeDef.radius = this.radius;

	// Плотность
	shapeDef.density = 1;
	shapeDef.friction = 0;
	// Упругость
	shapeDef.restitution = 0.5;

	var bodyDef = new b2d.b2BodyDef();
	bodyDef.position.Set(this.x, this.y);

	var body = this.body = world.CreateBody(bodyDef);
	body.CreateShape(shapeDef);
	body.SetMassFromShapes();

	var power = 240000.0;
	var ax = Math.random() * 2 * Math.PI;
	var ay = Math.random() * 2 * Math.PI;

	body.ApplyImpulse(
		new b2d.b2Vec2(Math.sin(ax) * power, Math.cos(ay) * power),
		new b2d.b2Vec2(body.GetWorldCenter().x, body.GetWorldCenter().y)
	);
}

Ball.prototype = {
};

module.exports = Ball;