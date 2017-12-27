var timeClock = '';
var timer = '';
var ScreenWidth = $(document.body).width();
var ScreenHeight = $(document.body).height();
var rx = ScreenWidth - $('.pk').width();
var ry = ScreenHeight - $('.pk').height();

function Package() {
    this.allTime = 20000;
    this.count = 50;
    this.x = '';
    this.y = '';
    this.speed = '';
    this.luck_key = 999;
}
Package.prototype.randomRange = function(begin ,end) {
    return Math.floor(Math.random() * (end - begin) + begin);
}
Package.prototype.init = function() {
    this.basic();
    this.bindDom();
}
Package.prototype.basic = function() {
    this.x = this.randomRange(0, rx);
    this.y = this.randomRange(70,300);
    this.speed = this.randomRange(3000, 5000);
}
Package.prototype.bindDom = function() {
    var lock = this.randomRange(0, 20);
    var luckKey = this.luck_key;
    var luck = this.theme();

    console.log('lock='+lock+'  luck='+luckKey)
    if (lock == luckKey) {
        luck = this.theme(3);
        console.log('%cthis is package', 'color: red');
    }

    var pckDom = $('<div class="pk '+ luck +'" data-lock="'+ lock +'" ></div>');
    pckDom.css({'left': this.x + 'px', 'top': '-'+ this.y + 'px'});
    pckDom.animate({top: ry}, this.speed, this.eases() ,function() {
        $(this).remove();
    })
    pckDom.appendTo('body');

    
    pckDom.on('touchstart', function() {
        if ($(this).data('lock') == luckKey) {        //击中正确目标后处理
            alert('击中目标！');
            pkg.stop(100);
        } else {
            $(this).addClass('boom');
            setTimeout(function() {
                $(this).remove();
            }.bind(this), 200)
        }
    })
}
Package.prototype.start = function() {
    var time = 0;
    var amount = this.count;
    var intervalTime = this.allTime/amount;
    timer = setInterval(function() {
        pkg.init();
        time ++;
        if (time >= amount/2) {
            this.luck_key = this.randomRange(0, 20)
        }
        if (time >= amount) {
            pkg.stop();
        }
    }.bind(this), intervalTime);

}
Package.prototype.theme = function(num) {
    var random = num || this.randomRange(0, 3);
    switch (random) {
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
Package.prototype.eases = function() {
    var random = this.randomRange(0, 5);
    switch (random) {
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

Package.prototype.stop = function(interTime) {
    var _interTime = interTime || 4000 
    clearInterval(timeClock);
    clearInterval(timer);
    setTimeout(function() {
        $('.top-btn').show();
    }, _interTime);

}


var $clock = $('.clock');
function clock(time) {
    var _time = time/1000;
    $clock.html(_time)
    timeClock = setInterval(function() {
        _time --;
        $clock.html(_time);
        if (_time <= 0) {
            pkg.stop();
        }
    }, 1000)
}

var pkg = new Package();
$('.top-btn').click(function() {
    pkg.luck_key = 999;
    $(this).hide();
    clock(pkg.allTime);
    pkg.start();
})