var canMap = document.getElementById('map');
var ctx = canMap.getContext('2d');
var reqAni = '';
canMap.width = document.documentElement.clientWidth;
canMap.height = document.documentElement.clientHeight;

var totalScore = 0;     //记录总分数

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
                console.log('22222')
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
    bulletType: 0,      //子弹类型 单排or双排
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
                    gameOver();
                    console.log('11111111')
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
                var bullet = new Bullet(this.x + this.w/2 - 24, this.y+20, 48, 14, bulletImg2, 2);
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
//敌机对象
var enemyObject = {
    enemyArr: [],      //敌机数组
    enemyFlag: 0,      //敌机出现频率
    enemy1: {
        w: 38,
        h: 34,
        picLen: 5,
        score: 1,
        hp: 2
    },
    enemy2: {
        w: 46,
        h: 64,
        picLen: 6,
        score: 2,
        hp: 4
    },
    enemy3: {
        w: 110,
        h: 164,
        picLen: 10,
        score: 5,
        hp: 10
    }
}    

function Enemy(x, y, w, h, img, speed, picLen, score, hp) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.picLen = picLen;
    this.score = score;
    this.hp = hp;
    this.i = 0;
    this.flagI = 0;
    this.img = img;
    this.speed = speed;
    this.boom = false;
    this.isDie = false;
}
Enemy.prototype.draw = function() {
    if (this.boom) {
        this.flagI ++;
        if (this.flagI == 10) {
            this.i ++;
            if (this.i == this.picLen) {
                this.isDie = true;      //敌机被击毁
            }
            this.flagI = 0;
        }
    }
    ctx.drawImage(this.img, this.w*this.i, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}
Enemy.prototype.move = function() {
    this.y += this.speed;
}
//随机产生敌机
function randomEnemy() {
    enemyObject.enemyFlag ++;
    if (enemyObject.enemyFlag == 2) {
        var random = randomNum(1,1000);
        // console.log('random= '+random);
        if (random <= 50) {
            if (random <= 40) {
                var randomSpeed = randomNum(3, 5);
                newEnemy(enemyObject.enemy1.w, enemyObject.enemy1.h, enemyImg1, enemyObject.enemy1.picLen, randomSpeed, enemyObject.enemy1.score, enemyObject.enemy1.hp);     //小
            } else if (random <= 48) {
                var randomSpeed = randomNum(2, 4);
                newEnemy(enemyObject.enemy2.w, enemyObject.enemy2.h, enemyImg2, enemyObject.enemy2.picLen, randomSpeed, enemyObject.enemy2.score, enemyObject.enemy2.hp);     //中型  
            } else {
                var randomSpeed = randomNum(1, 3);
                newEnemy(enemyObject.enemy3.w, enemyObject.enemy3.h, enemyImg3, enemyObject.enemy3.picLen, randomSpeed, enemyObject.enemy3.score, enemyObject.enemy3.hp);      //大型
            }
        }
        enemyObject.enemyFlag = 0;
    }
    for (var i = 0; i < enemyObject.enemyArr.length; i++) {
        var element = enemyObject.enemyArr[i];
        if (element.y >= canMap.height || element.isDie) {
            enemyObject.enemyArr.splice(i, 1);
            i --;           
        } else {
            element.draw();
            element.move();
        }
    }  
}
//实例每个敌机
function newEnemy(w, h, enemyImg, picLen, randomSpeed, score, hp) {
    var randomX = randomNum(0, canMap.width - w);
    var enemyObj = new Enemy(randomX, -h, w, h, enemyImg, randomSpeed, picLen ,score, hp );
    enemyObject.enemyArr.push(enemyObj); 
}
//加成礼包
var propImg = new Image();
propImg.src = './img/prop.png';
var propArr = [];       //背包数组
function prop(x, y, w, h, type, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.speed = speed;
    this.isUsed = false;
}
prop.prototype.draw = function() {
    ctx.drawImage(propImg, this.w*this.type, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}
prop.prototype.move = function() {
    this.y += this.speed;
}
function randomProp() {
    if (randomNum(1,1000) <= 5) {
        var randomX = randomNum(0, canMap.width - 38);
        var type = randomNum(0, 1);
        var speed = randomNum(2,6);
        var newProp = new prop(randomX, -68, 38, 68, type, speed );
        propArr.push(newProp);
        // console.log(propArr);
    }
    for (var i = 0; i < propArr.length; i++) {
        var element = propArr[i];
        if (element.y >= canMap.height || element.isUsed) {
            propArr.splice(i, 1);
            i--;
        } else {
            element.move();
            element.draw();
        }
    }
}
//检查是否碰撞
function crash(obj1, obj2) {
    var left1 = obj1.x,
        right1 = obj1.x + obj1.w,
        top1 = obj1.y,
        bottom1 = obj1.y + obj1.h;

    var left2 = obj2.x,
        right2 = obj2.x + obj2.w,
        top2 = obj2.y,
        bottom2 = obj2.y + obj2.h;
    
        if (right1<left2 || left1>right2 || top1>bottom2 || bottom1<top2) {
            //没有碰撞 返回false
            return false;
        } else {
            return true;
        }
}
var timeout = '';       //双排子弹计时器
//碰撞检测
function justify() {
    //礼包与hero
    for (var i = 0; i < propArr.length; i++) {
        var element = propArr[i];
        if (hero.boom) {
            continue;
        }
        if (!crash(element, hero)) {
            continue;
        }
        if (element.type) {     //type=1  双排子弹背包
            hero.bulletType = 1; //英雄打双排子弹,持续5s回归单排子弹
            clearTimeout(timeout);      //清楚之前定时器，重新开始   
            timeout = setTimeout(function() {
                hero.bulletType = 0;
            }, 5000);
        } else {                //type=0  所有敌机爆炸的背包
            for (var j = 0; j < enemyObject.enemyArr.length; j++) {
                enemyObject.enemyArr[j].boom = true;
                totalScore += enemyObject.enemyArr[j].score;    //累加分数
            }
        }
        element.isUsed = true;
    }
    //敌机与hero
    for (var i = 0; i < enemyObject.enemyArr.length; i++) {
        var element = enemyObject.enemyArr[i];
        if (element.boom) {
            continue;
        }
        if (crash(element, hero)) {
            hero.boom = true;
        }
    }
    //敌机与子弹
    for (var i = 0; i < enemyObject.enemyArr.length; i++) {
        var element1 = enemyObject.enemyArr[i];
        for (var j = 0; j < hero.bulletArr.length; j++) {
            var element2 = hero.bulletArr[j];
            if (element1.boom) {
                continue;
            }
            if (!crash(element1, element2)) {
                continue;
            }
            //发生碰撞
            element1.hp -= element2.hurt;
            console.log('element1.hp='+element1.hp)
            if (element1.hp <= 0) {
                element1.boom = true;
                totalScore += element1.score;
                switch (element1.score) {
                    case 1:
                        musicArr[1].play();
                        break;
                    case 2:
                        musicArr[2].play();
                        break;
                    case 5:
                        musicArr[3].play();
                        break;
                }
            }
            //碰撞的子弹消失
            hero.bulletArr.splice(j, 1);
            j--;
        }
    }
}
function randomNum(begin, end) {
    return parseInt(Math.random()*(end-begin+1)+begin);
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


function main() {
    ctx.clearRect(0,0,canMap.width, canMap.height);
    background.draw();
    background.move();

    hero.draw();
    hero.shot();

    randomEnemy();      //产生敌机函数
    randomProp();       //道具函数

    if (! hero.boom) {
        justify();
        stop1.innerHTML = totalScore;
    }
    reqAni = requestAnimationFrame(main);
}

var stop1 = document.getElementsByClassName('stop')[0];
stop1.onclick = gameOver;
function gameOver(){
    musicArr[4].pause();
    musicArr[5].play();
    cancelAnimationFrame(reqAni);
    console.log('game over')
    return;
}