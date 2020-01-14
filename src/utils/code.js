function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
	var r = randomNum(min, max);
	var g = randomNum(min, max);
	var b = randomNum(min, max);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**绘制验证码图片**/
function drawPic(id) {
	var canvas = document.getElementById(id || 'mycode');
	var width = canvas.width;
	var height = canvas.height;

	var ctx = canvas.getContext('2d');
	ctx.textBaseline = 'bottom';

	/**绘制背景色**/
	ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
	ctx.fillRect(0, 0, width, height);
	/**绘制文字**/
	var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
	var value = '';
	for (var i = 0; i < 4; i++) {
		var txt = str[randomNum(0, str.length)];
		value += txt;
		ctx.fillStyle = randomColor(200, 250); //随机生成字体颜色
		ctx.font = randomNum(20, 30) + 'px SimHei'; //随机生成字体大小
		var x = 5 + i * 20;
		var y = randomNum(17, 20);
		var deg = randomNum(-20, 20);
		//修改坐标原点和旋转角度
		ctx.translate(x, y);
		ctx.rotate((deg * Math.PI) / 180);
		ctx.fillText(txt, 10, 20);
		//恢复坐标原点和旋转角度
		ctx.rotate((-deg * Math.PI) / 180);
		ctx.translate(-x, -y);
	}
	/**绘制干扰线**/
	/*for (let i = 0; i < 20; i++) {
		ctx.strokeStyle = randomColor(40, 180);
		ctx.beginPath();
		ctx.moveTo(randomNum(0, width), randomNum(0, height));
		ctx.lineTo(randomNum(0, width), randomNum(0, height));
		ctx.stroke();
	}*/
	/**绘制干扰点**/
	for (let i = 0; i < 200; i++) {
		ctx.fillStyle = randomColor(0, 255);
		ctx.beginPath();
		ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
		ctx.fill();
	}
	return value;
}

export default drawPic;
