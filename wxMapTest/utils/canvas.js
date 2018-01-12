function RotateBall(opt) {
  for (var key in opt) {
    this[key] = opt[key];
  }
  this.init();
}
RotateBall.prototype = {
  init: function () {
    this.loop();
  },
  loop: function () {
    
    var self = this;
    this.timer = setInterval(function () {
      self.ctx.clearRect(0, 0, 100, 100);
      self.start += 0.01 * Math.PI;
      //绘制
      self.drawBigCircle();
      self.drawSmallCircles();
      self.ctx.draw();
    }, 20);
  },
  drawBigCircle: function () {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.bigX, this.bigY, this.bigRadius, 0, 2 * Math.PI);
    ctx.setStrokeStyle("#FF6000");
    ctx.stroke();
  },
  drawSmallCircles: function () {
    var bigRadius = this.bigRadius;
    var bigX = this.bigX;
    var bigY = this.bigY;

    var startRadian = this.start;

    var b = bigRadius * Math.cos(startRadian);
    var h = bigRadius * Math.sin(startRadian);

    var smallX = bigX + b;
    var smallY = bigY + h;

    this.drawSmallCircle(smallX, smallY);

  },
  drawSmallCircle: function (smallX, smallY) {
    var ctx = this.ctx;
    ctx.save()
    ctx.beginPath();
    ctx.arc(smallX, smallY, this.smallRadius, 0, 2 * Math.PI);
    ctx.setFillStyle("#FF6000");
    ctx.fill();
    ctx.restore();
  }
};
module.exports = {
  RotateBall: RotateBall
}