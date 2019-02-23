var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.player1 = new Component(60, 60, 'red', 50, 0)
        this.obstacle_list = [];
        for (var i=0; i<30; i++) {
          this.obstacle_list.push(new Obstacle(i, this.context))
        }
        this.interval = setInterval(this.updateCanvas.bind(this), 10)

        document.onkeydown = (e) => {
          switch (e.keyCode) {
            case 38:
              this.player1.moveUp();
              break;
            case 40:
              this.player1.moveDown();
              break;
            case 37:
              this.player1.moveLeft();
              break;
            case 39:
              this.player1.moveRight();
              break;
          }
        }


    },
    updateCanvas: function () {
      this.context.clearRect(0,0,1500,500)
      this.player1.draw()
      for (var i=0; i<30; i++) {
        this.obstacle_list[i].update()
        var col = this.obstacle_list[i].checkCollision(this.player1)
        if (col) {
          alert("collision")
        }
        this.obstacle_list[i].draw()
      }

    }
}
function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.draw = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.moveUp = function () {
        this.y -= 10;
    }

    this.moveDown = function () {
        this.y += 10;
    }

    this.moveLeft = function () {
        this.x -= 10;
    }

    this.moveRight = function () {
        this.x += 10;
    }
}

function Obstacle(index, ctx){
  this.x = 300*index;
  this.y = Math.floor(Math.random()*(500-120))
  this.height = 120;
  this.width = 40;
  this.ctx = ctx;

  this.update = function () {
    this.x -= 1;
  }
  this.draw = function() {
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(this.x, 0, this.width, this.y)
    this.ctx.fillRect(
      this.x,
      this.y + this.height,
      this.width,
      500 - (this.y + this.height))
  }
  this.checkCollision = function(player) {
    var obs1x = this.x;
    var obs1y = 0;
    var obs1w = 40;
    var obs1h = this.y;

    var obs2x = this.x;
    var obs2y = this.y + this.height;
    var obs2w = 40;
    var obs2h = 500 - (this.y + this.height);

    var result = (obs1x - player.width < player.x) && (player.x < obs1x + obs1w) && (obs1y - player.height < player.y) && (player.y < obs1y + obs1h)

    return result || (obs2x - player.width < player.x) && (player.x < obs2x + obs2w) && (obs2y - player.height < player.y) && (player.y < obs2y + obs2h)
  }
}


myGameArea.start()