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
                main();
                //音频元数据加载完成执行
                musicArr[4].loop = true;
                musicArr[4].volume = 0.2;
                musicArr[4].play();
            }
        }
    }
}
//背景
var bgImg = new Image();
bgImg.src = './img/background.png';
var background = {
    w: 320,
    h: 568,
    y: 0,
    row: Math.ceil(canMap.height / 568),
    col: Math.ceil(canMap.width / 320),
    draw: function() {
        //背景设置满屏
        for (var i = -this.row; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                // console.log('i='+i+'  j='+j);
                ctx.drawImage(bgImg, this.w*j, this.h*i + this.y);
            }
        }
    },
    move: function() {
        this.y ++;
        if (this.y == this.row*this.h) {
            this.y = 0;
        }
    }
}
//英雄
var heroImg = new Image();
heroImg.src = './img/herofly.png';
var bulletImg1 = new Image();
bulletImg1.src = './img/bullet1.png';
var bulletImg2 = new Image();
bulletImg2.src = './img/bullet2.png';
var hero = {
    w: 66,
    h: 82,
    x: canMap.width/2 - 33,
    y: canMap.height - 100 - 82,
    i: 0,               //英雄图片从0开始，共5
    heroFlag: 0,        //控制图片切换的频率
    bulletType: 1,      //子弹类型 单排or双排
    bulletArr: [],      //记录子弹数组
    bulletFlag: 0,      //子弹发射频率
    boom: false,
    draw: function() {
        this.heroFlag ++;
        if (this.heroFlag == 10) {
            if (this.boom) {
                this.i ++;
                if (this.i == 5) {
                    //gameover
                }
            } else {
                this.i = (++this.i) % 2;
            }
            this.heroFlag = 0;
        }
        ctx.drawImage(heroImg, this.w * this.i, 0, this.w, this.h, this.x, this.y, this.w, this.h)
    },
    shot: function() {
        if (! this.boom) {
            this.bulletFlag ++;
        }
        if (this.bulletFlag == 10) {
            musicArr[0].play();
            if (this.bulletType) {  //双排子弹
                var bullet = new Bullet(this.x + this.w/2 - 24, this.y+20,48,14 ,bulletImg2, 2)
            } else {                //单排子弹
                var bullet = new Bullet( this.x + this.w/2 - 3, this.y-14, 6, 14, bulletImg1, 1);
            }
            this.bulletArr.push(bullet);
            this.bulletFlag = 0;
        }
        
        for (var i = 0; i < this.bulletArr.length; i++) {
            if (this.bulletArr[i].y <= -this.bulletArr[i].h) {  //子弹是否移出屏幕
                this.bulletArr.splice(i, 1);
                i --;
            } else {
                this.bulletArr[i].draw();
                this.bulletArr[i].move();
            }
        }
    }
}
//子弹类
function Bullet(x, y, w, h, img, hurt) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.hurt = hurt;
}
Bullet.prototype.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}
Bullet.prototype.move = function() {
    this.y -= 15;
}
//敌机类
var enemyImg1 = new Image();
enemyImg1.src = "./img/enemy1.png";
var enemyImg2 = new Image();
enemyImg2.src = "./img/enemy2.png";
var enemyImg3 = new Image();
enemyImg3.src = "./img/enemy3.png";

function Enemy(x, y, w, h, img, speed, picLen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.picLen = picLen;
    this.i = 0;
    this.flagI = 0;
    this.img = img;
    this.speed = speed;
    this.boom = false;
    this.isDie = false;
    this.enemyArr = [];     //敌机数组
}
Enemy.prototype.draw = function() {
    if (this.boom) {
        this.flagI ++;
        if (this.flagI == 10) {
            this.i ++;
            if (this.i == this.picLen) {
                this.isDie = true;      //敌机被击毁
            }
        }
        this.flagI = 0;
    }
    ctx.drawImage(this.img, this.w*this.i, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}
Enemy.prototype.move = function() {
    this.y += this.speed;
}
//随机产生敌机
function randomEnemy() {
    var random = randomNum(1,1000);
    if (random <= 50) {
        if (num <= 40) {
            newEnemy(38, 34, enemyImg1, 5);     //小
        } else if (num <= 48) {
            newEnemy(46, 64, enemyImg2, 6);     //中型  
        } else {
            newEnemy(110, 164, enemyImg3, 10);  //大型
        }
    }
    for (var i = 0; i < this.enemyArr.length; i++) {
        var element = this.enemyArr[i];
        if (element.y >= canMap.height || element.isDie) {
            element.splice(i, 1);
            i --;           // ?
        } else {
            element.draw();
            element.move();
        }
    }
}
function newEnemy(w, h, enemyImg, picLen) {
    var randomX = randomNum(0, canMap.width/2 - w);
    var randomSpeed = randomNum(0, 5);
    var enemyObj = new Enemy(randomX, -w, w, h, enemyImg, randomSpeed, picLen );
    this.enemyArr.push(enemyObj); 
}


function randomNum(begin, end) {
    return Math.floor(Math.random()*(end-begin)+begin);
}
//鼠标控制英雄
canMap.onmousedown = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if (x>=hero.x && x<=hero.x+hero.w && y<=hero.y+hero.h && y>=hero.y) {
        canMap.onmousemove = function(e) {
            e.preventDefault();
            hero.x = e.offsetX - hero.w/2;
            hero.y = e.offsetY - hero.h/2;
        }
    }
}
canMap.onmouseup = function() {
    canMap.onmousemove = null;
}

var reqAni = '';
function main() {
    ctx.clearRect(0,0,canMap.width, canMap.height);
    background.draw();
    background.move();

    hero.draw();
    hero.shot();

    reqAni = requestAnimationFrame(main);
}

var stop1 = document.getElementsByClassName('stop')[0];
stop1.onclick=function(){
    cancelAnimationFrame(reqAni);
    musicArr[4].pause()
}