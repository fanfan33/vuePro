var canMap = document.getElementById('map');
var ctx = canMap.getContext('2d');

canMap.width = document.documentElement.clientWidth;
canMap.height = document.documentElement.clientHeight;


var picsnames = ["background.png", "bullet1.png", "bullet2.png", "enemy1.png", "enemy2.png", "enemy3.png", "herofly.png", "loading.gif", "prop.png"];
var musicNames = ["bullet.mp3", "enemy1_down.mp3", "enemy2_down.mp3", "enemy3_down.mp3", "game_music.mp3", "game_over.mp3"];

var picCount = 0;
var musicCount = 0;
var musicArr = [];
preLoadImg();
function preLoadImg() {
    for (var index = 0; index < picsnames.length; index++) {
        var img = new Image();
        img.src = './img/' + picsnames[index];
        img.onload = function() {
            picCount++;
            if (picCount == picsnames.length) {
                loadMusic();
            }
        }
    }
}
function loadMusic() {
    for (var index = 0; index < musicNames.length; index++) {
        var music = new Audio();
        music.src = './audio/' + musicNames[index];
        musicArr.push(music);
        music.onloadedmetadata = function() {
            musicCount ++;
            if (musicCount == musicNames.length) {
                // main();
                //音频元数据加载完成执行
                musicArr[4].loop = true;
                musicArr[4].volume = 0.2;
                musicArr[4].play();
            }
        }
    }
}

var bgImg = new Image();
bgImg.src = './img/background.png';

var background = {
    y: 0,
    row: Math.ceil(canMap.height / 568),
    col: Math.ceil(canMap.width / 320),
    draw: function() {
        //背景设置满屏
        for (var i = -this.row; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                console.log('i='+i+'  j='+j);
                ctx.drawImage(bgImg, 320*j, 568*i + this.y);
            }
            
        }
    },
    move: function() {
        this.y ++;
        if (this.y == this.row*568) {
            this.y = 0;
        }

    }
}
function main() {
    ctx.clearRect(0,0,canMap.width, canMap.height);
    background.draw();
    background.move();

    requestAnimationFrame(main);
}
