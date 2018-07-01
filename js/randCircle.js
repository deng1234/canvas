function drawRandCircle(context, width, height) {

	var R = Math.floor(Math.random() * 255);
	var G = Math.floor(Math.random() * 255);
	var B = Math.floor(Math.random() * 255);
	// 透明度
	context.globalAlpha = 0.7;
	context.globalCompositeOperation = "xor";
	context.fillStyle = "rgb(" + R + "," + G + "," + B + ")";
	context.beginPath();
	context.arc(Math.random() * width, Math.random() * height, Math.random()*80, 0, 2*Math.PI);
	context.closePath();
	context.fill();

}