function drawStar(context, R, x, y, rot) {

	context.save();

	context.translate(x, y);
	context.rotate(rot / 180 * Math.PI);

	context.scale(R, R);

	starPath(context);

	context.fillStyle = "#fb3";
	context.fill();

	context.restore();
	
}


function starPath(context) {
	context.beginPath();
	for(var i = 0; i < 5; i++) {
		context.lineTo( Math.cos( (18 + i * 72 ) / 180 * Math.PI), -Math.sin( (18 + i * 72 ) / 180 * Math.PI));
		context.lineTo( Math.cos( (54 + i * 72 ) / 180 * Math.PI) * 0.5, -Math.sin( (54 + i * 72 ) / 180 * Math.PI) *0.5);
	}
	context.closePath();
}