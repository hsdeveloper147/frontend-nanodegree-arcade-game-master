// declaring row-_width and column_Width as constants
var ROW_WIDTH = 75;
var COL_WIDTH = 101;
//score
var SCORE = 0;

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    // init value is a function that initialises the values
    this.initValues();
};

Enemy.prototype.initValues = function() {
        this.x = -ROW_WIDTH;
        //calculating random values for y and speed
        this.randY();
        this.randSpeed();

};
//function for cacluating random y coordinate for enemy
Enemy.prototype.randY = function() {
    //Calculating random row (y-coord) for enemy
    var rand = Math.floor((Math.random() * 3)+1);
    this.y = rand * ROW_WIDTH;

};

Enemy.prototype.randSpeed = function() {
    //Calculating random speed
    var minSpeed = 200;
    this.speed = Math.floor(Math.random() * 500 + minSpeed);
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    //Checking right boundry condition for enemies.
    if(this.x <= 5*COL_WIDTH)
        this.x += this.speed*dt;
    else {
        // if enemy crosses rhight boundry ... randomise the x,y and speed values
        this.initValues();
    }

    // Detecting collision with player
    if(this.x >= player.getX() && this.x < (player.getX() + COL_WIDTH) && this.y == player.getY()) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//Player
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};


//Player's update function checks the boundry conditions of the player.

Player.prototype.update = function(dt) {
    //Checking boundry conditions
    if(this.x > COL_WIDTH*4) {
        this.x = COL_WIDTH*4;
    }
    else if(this.x < 0) {
        this.x = 0;
    }
    else if(this.y > ROW_WIDTH*5) {
        this.y = ROW_WIDTH*5;
    }
    //Checking if player comes to river -- WIN CONDITION
    else if(this.y < ROW_WIDTH){
        console.log("yes");
        this.setX(2*COL_WIDTH);
        this.setY(5*ROW_WIDTH);
        SCORE++;
    }

};

//Player's render function
Player.prototype.render = function() {
    var image = Resources.get(this.sprite);
   // alert(image.width);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.displaySocre();

};

// Instantiation of objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

var player = new Player(2*COL_WIDTH,5*ROW_WIDTH);

//restting the player's position and score
Player.prototype.reset = function() {
    this.setX(2*COL_WIDTH);
    this.setY(5*ROW_WIDTH);
    SCORE = 0;
};


// getter and setter functions

Player.prototype.getX = function() {
    return this.x;
};

Player.prototype.getY = function() {
    return this.y;
};

Player.prototype.setX = function(val) {
     this.x = val;
};

Player.prototype.setY = function(val) {
     this.y = val;
};

//code to display score
Player.prototype.displaySocre = function() {
    ctx.textAlign ="center";
    ctx.font = '24pt serif';
    ctx.fillStyle = "blue";
    ctx.clearRect(0,0,200,50);
    ctx.fillText("Score -> " + SCORE,80,40);
};


//*****handle input function
Player.prototype.handleInput = function(input) {
    switch(input){
        case 'up':
            this.y -= ROW_WIDTH;
            break;
        case 'down':
            this.y += ROW_WIDTH;
            break;
        case 'left':
            this.x -= COL_WIDTH;
            break;
        case 'right':
            this.x += COL_WIDTH;
            break;
    }
    //update function checks the boundry conditions and collisions with enemy
    this.update();
};

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




