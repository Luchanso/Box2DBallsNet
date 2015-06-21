(function(exports) {

	var Circle = function(id, x, y, radius, color) {
		Phaser.Graphics.call(this, game, x, y);

		this.radius = radius || 15;
		this.color = color;

		this.id = id || -1;

		this.beginFill(color);
		this.drawCircle(0, 0, this.radius);
		this.endFill();

		game.world.add(this);
	};

	Circle.prototype = Object.create(Phaser.Graphics.prototype);
	Circle.prototype.constructor = Circle;

	exports.Circle = Circle;

})(this);