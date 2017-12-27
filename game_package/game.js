/*获取容器宽高*/
var screenH = document.body.offsetHeight;
var screenW = document.body.offsetWidth;
var RX = screenW - $('.pk').width();
var RY = screenH - $('.pk').height();
var TIMER = '';
var TIMERCLOCK = '';

/*红包模块*/
function PACKAGE() {
	this.speed = '';
	this.x = '';
	this.y = '';
	this.luck_key = 999;
}

PACKAGE.prototype.init = function () { // 初始化
	this.basic();
	this.bindDom();
}

PACKAGE.prototype.randomNum = function(begin, end) { // 范围随机数生成器
	return Math.floor(Math.random()*(end - begin)) + begin;
}

PACKAGE.prototype.basic = function() {
	this.x = parseInt(this.randomNum(0, RX)); // 红包起始x坐标
	this.y = parseInt(this.randomNum(70, 300)); // 红包起始y坐标
	this.speed = this.randomNum(3000, 5000); // 红包运动总时长
}

PACKAGE.prototype.eases = function() { // 红包运动模式
	var easeNum = parseInt(this.randomNum(0, 5));
	switch (easeNum) {
		case 0:
			return 'easeInQuad';
			break;
		case 1:
			return 'swing';
			break;
		case 2:
			return 'easeInExpo';
			break;
		case 3:
			return 'easeInQuint';
			break;
		case 4:
			return 'easeInOutBounce';
			break;
	}
}

PACKAGE.prototype.theme = function(num) { // 红包皮肤
	var themeNum = num || parseInt(this.randomNum(0, 3));
	switch (themeNum) {
		case 0:
			return 'pk1';
			break;
		case 1:
			return 'pk2';
			break;
		case 2:
			return 'pk3';
			break;
		case 3:
			return 'pk4';
			break;
	}
}

PACKAGE.prototype.bindDom = function() {
	var lock = this.randomNum(0, 20);
	var _key = this.luck_key;
	var luck = this.theme();
	/*参数*/
	if (_key == lock) {
		console.log('%cthis is package','background:#aaa;color:red;font-size:16px;');
		luck = this.theme(3);
	}
	console.log('key', _key)
	console.log('lock', lock)
	console.log('speed',this.speed)

	var pkDom = $('<div class="pk '+ luck +'" data-rom='+ lock +'></div>');
	pkDom.css({'left': this.x + 'px' ,'top': '-'+ this.y +'px'});
	pkDom.animate({ top : RY }, this.speed, this.eases(), function() {
		$(this).remove();
	});
	pkDom.on('touchstart', function() {
		if ($(this).attr('data-rom') == _key) {
			/* 中奖操作 */
			alert(' 恭 喜 你 中 奖 !');

			clearInterval(TIMER);
			clearInterval(TIMERCLOCK);
			$('.pk').remove();
		}

		$(this).addClass('boom');
		setTimeout(function() {
			$(this).remove();
		}.bind(this),200)
		
	})
	$('body').append(pkDom);
}

PACKAGE.prototype.start = function(alltime, amount) {
	var time = 0;
	alltime? alltime = alltime : alltime = 30000;
	amount ? amount =  amount : amount = 50;
	var intervalTime = parseInt(alltime / amount);
	TIMER = setInterval(function() {
		pks.init();
		time++;
		if (time >= amount/2) { // 前半数红包不进行"钥匙"生成
			this.luck_key = this.randomNum(0, 20);
		}
		if (time > amount) {
			pks.stop();
		}
	}.bind(this), intervalTime);
}
PACKAGE.prototype.stop = function() {
	clearInterval(TIMER);
	clearInterval(TIMERCLOCK);
	$('.pk').remove();
}

var $clock = $('.clock');
function clock(time) {
	var times = time / 1000;
	$clock.html(times)
	TIMERCLOCK = setInterval(function() {
		times--;
		$clock.html(times);
		if (times <= 0) {
			pks.stop();
		}
	}, 1000);
}

var pks = new PACKAGE();

// 游戏生成器
$(document).ready(function() {
	var ok = confirm('请否开始游戏');
	if (ok) {
		clock(20000)
		pks.start(20000, 50);
	}
})