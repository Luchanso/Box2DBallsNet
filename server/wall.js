var b2d = require("box2d");

var Wall = function(x, y, width, height, world) {

	this.x = x;
	this.y = y;
	this.width = width || 0;
	this.height = height || 0;

	var shapeDef = new b2d.b2PolygonDef();

	// Плотность
	shapeDef.density = 0;
	// Упругость
	shapeDef.restitution = 1;
	shapeDef.SetAsBox(this.width, this.height);

	var bodyDef = new b2d.b2BodyDef();
	bodyDef.position.Set(this.x, this.y);

	var body = this.body = world.CreateBody(bodyDef);
	body.CreateShape(shapeDef);
	body.SetMassFromShapes();
}

Wall.prototype = {
};

module.exports = Wall;