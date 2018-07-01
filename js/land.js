
function drawLand(context, width, height) {

	context.beginPath();
	context.moveTo(0, height * 0.75);
	context.bezierCurveTo(width *0.6, height * 0.5, width * 0.4, height * 1.1, width, height * 0.8);
	context.lineTo(width, height);
	context.lineTo(0, height);
	context.closePath();

	var landStyle = context.createLinearGradient(0, 0, 0, canvas.height);
	landStyle.addColorStop(0.0, "#030");
	landStyle.addColorStop(1.0, "#580");
	context.fillStyle = landStyle;
	context.fill();
}