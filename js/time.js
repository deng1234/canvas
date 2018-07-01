var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 500;
var RADIUS = 6;
var MARGIN_LEFT = 80;
var MARGIN_TOP = 50;


var curShowTimeSeconds = 0;

var curTime = new Date().getTime();

var nextShowTimeSeconds = 0;

var totalSeconds = 0;


// 定时器状态
var timerStatus = false;

var balls = [];
const colors = ["#EE9572", "#B23AEE","#949494", "#8E8E38", 
	"#8B1C62", "#79CDCD", "#548B54", "#32CD32", "#1874CD", "#333333"];

var timer = null;

// getData();

document.body.onclick = function() {
	startAndPause();
}

document.onkeydown = function(e) {
	var event = e || window.e;
	if(event.keyCode == 32) {
		startAndPause();
	}
};

// window.onbeforeunload = function() {
// 	var fd = new FormData();
// 	fd.append("action", "saveData");
// 	totalSeconds = nextShowTimeSeconds;
// 	fd.append("totalSeconds", totalSeconds);
// 	Request("server.php", fd).then(function(json) {

// 	}, function(error) {
// 		alert("服务器异常");
// 	});
// }

window.onresize = window.onload = function() {

	WINDOW_WIDTH = Math.round(document.documentElement.clientWidth);
	WINDOW_HEIGHT = Math.round(document.documentElement.clientHeight * 0.9);
	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
	RADIUS = Math.round(WINDOW_WIDTH * 0.8 / 108) - 1;

	var canvas = document.getElementById("canvas");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	if(canvas.getContext("2d")) {
		
		var context = canvas.getContext("2d");
		curShowTimeSeconds = getCurrentShowTimeSeconds();
		clearInterval(timer);
		timerStatus = true;
		timer = setInterval(function() {
			render(context);
			update();
		}, 50);

	} else {
		alert("您的浏览器不支持canvas,请更换浏览器");
	}
}


// function getData() {
// 	var fd = new FormData();
// 	fd.append("action", "getData");
// 	Request("server.php", fd).then(function(json) {
// 		if(json.errCode == 0) {
// 			totalSeconds = Number(json.data);
// 		}
// 	}, function(error) {
// 		alert("服务器异常");
// 	});
// }

function startAndPause() {
	if(timerStatus) {
		clearInterval(timer);
		timerStatus = false;
		totalSeconds = nextShowTimeSeconds;
	} else {
		var context = canvas.getContext("2d");
		curTime = new Date().getTime();
		timerStatus = true;
		timer = setInterval(function() {
			render(context);
			update();
		}, 50);
	}
}

function render(context) {

	context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
	var seconds = curShowTimeSeconds % 60;
	// 从0，0位置开始绘制
	
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), context);
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 15, MARGIN_TOP, parseInt(hours%10), context);
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 30, MARGIN_TOP, 10, context);

	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 39, MARGIN_TOP, parseInt(minutes/10), context);
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 54, MARGIN_TOP, parseInt(minutes%10), context);
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 69, MARGIN_TOP, 10, context);

	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 77, MARGIN_TOP, parseInt(seconds/10), context);
	renderDigit(MARGIN_LEFT + (RADIUS + 1) * 92, MARGIN_TOP, parseInt(seconds%10), context);



	for(var i=0; i<balls.length; i++) {

		context.fillStyle = balls[i].color;
		context.beginPath();

		context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);

		context.closePath();
		context.fill();

	}
}

function renderDigit(x, y, num, context) {

	context.fillStyle = "orange";

	for(var i=0; i<digit[num].length; i++) {
		for(var j=0; j<digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				var centerX = x + j*2*(RADIUS+1) + (RADIUS+1);
				var centerY = y + i*2*(RADIUS+1) + (RADIUS+1);
				context.beginPath();
				context.arc(centerX, centerY, RADIUS, 0, 2*Math.PI);
				context.closePath();
				context.fill();
			}
		}
	}
}

function getCurrentShowTimeSeconds() {
	return 0;
}

function update() {

	nextShowTimeSeconds = Math.floor(totalSeconds + (new Date().getTime() - curTime) / 1000);

	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds / 3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
	var curSeconds = curShowTimeSeconds % 60;

	if(nextSeconds != curSeconds) {

		if(parseInt(nextHours / 10) != parseInt(curHours / 10)) {
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
		}
		if(parseInt(nextHours % 10) != parseInt(curHours % 10)) {
			addBalls(MARGIN_LEFT + (RADIUS + 1) * 15 , MARGIN_TOP, parseInt(curHours % 10));
		}

		if(parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
			addBalls(MARGIN_LEFT + (RADIUS + 1) * 39, MARGIN_TOP, parseInt(curMinutes / 10));
		}
		if(parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
			addBalls(MARGIN_LEFT + (RADIUS + 1) * 54 , MARGIN_TOP, parseInt(curMinutes % 10));
		}

		if(parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
			addBalls(MARGIN_LEFT + (RADIUS + 1) * 77, MARGIN_TOP, parseInt(curSeconds / 10));
		}
		if(parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
			addBalls(MARGIN_LEFT + (RADIUS + 1) * 92 , MARGIN_TOP, parseInt(curSeconds % 10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();

}


function addBalls(x, y, num) {
	for(var i=0; i<digit[num].length; i++) {
		for(var j=0; j<digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				var aBall = {
					x: x + j*2*(RADIUS+1) + (RADIUS+1),
					y: y + i*2*(RADIUS+1) + (RADIUS+1),
					g: 1.5+ Math.random(),
					vx: -1 * Math.ceil(Math.random() * 9 + 1), // [-10, 10]
					vy: -1 * Math.ceil(Math.random() * 9 + 1), // [-10, 10]
					color: colors[Math.floor(Math.random() * colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}


function updateBalls() {

	for(var i=0; i<balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= WINDOW_HEIGHT - RADIUS) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.6;
		}
	}

	var cnt = 0;
	for(var i=0; i<balls.length; i++) {
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
			balls[cnt++] = balls[i];
		}
	}

	while(balls.length > Math.min(cnt, 300)) {
		balls.pop();
	}
}