let score=0;

class character {
  constructor(x,y,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

// Enemies our player must avoid
class Enemy extends character {
  constructor(x,y,sprite) {
    super(x,y,sprite='images/enemy-bug.png');
    this.speed = 100 + Math.floor(Math.random() * 512);

  };

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x>550){
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
    }
    if ((player.y >= this.y - 50 && player.y <= this.y + 50) && (player.x >= this.x - 50 && player.x <= this.x + 50)){
      player.x = 200;
      player.y = 300
    }
  };
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends character {
  constructor(x,y,sprite) {
    super(x,y,sprite='images/char-boy.png');
  };

  update() {
    if (this.x > 400) this.x = 400;
    if (this.x < 0) this.x = 0;
    if (this.y > 380) this.y = 380;
    if (this.y < 0){
      this.y = 380;
      this.x = 200;
      score += 1;
      swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Congratulations! You Won!',
        text: 'Your ' + (( score> 1) ? "scores are " : "score is ") + score +' .\n Woooooo!',
        type: 'success',
        confirmButtonColor: '#02ccba',
        confirmButtonText: 'Play again!'
      }).then(function (isConfirm) {
        if (isConfirm) {
          // do nothing as the player will be back by default;
        }
      })

    }
  };

  handleInput(key) {
    switch (key) {
      case 'right':
      this.x += 101;
      break;
      case 'left':
      this.x -= 101;
      break;
      case 'down':
      this.y += 90;
      break;
      case 'up':
      this.y -= 90;
      break;
      // default:
    }
  };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies=[], ePosition=[60,140,220];
let player = new Player(200,380,50), e;

ePosition.forEach(function(y){
  // debugger
  ss = 100 + Math.floor(Math.random()*512);
  e = new Enemy(0,y,ss);
  allEnemies.push(e);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
