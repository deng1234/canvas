function fillMoon(context, d, x, y, R, rot, fillColor) {
	context.save();
	context.translate(x, y);
	context.rotate(rot * Math.PI / 180);
	context.scale(R, R);
	pathMoon(context, d);
	context.fillStyle = fillColor || "#fb5";
	context.fill();
	context.restore();
}

function pathMoon(context, d) {
	context.beginPath();

	context.arc(0, 0, 1, 0.5*Math.PI, 1.5*Math.PI, true);
	context.moveTo(0, -1);
	context.quadraticCurveTo(1.2, 0, 0, 1);
	// context.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
	context.closePath();

}

function dis(x1, y1, x2, y2) {
	return Math.sqrt( (x1-x2) * (x1-x2) + (y1 - y2) * (y1 - y2));
}