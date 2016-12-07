var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var GRAVITY = 0.3;
var JUMP = -5;
var numGroundSprites;
var player;
var obstacleSprites;
var isGameOver;
var score;




function setup(){
    
    score = 0;
    
    isGameOver = false;
    createCanvas(500, 380);
    
    background(150, 200, 250);
    

    groundSprites = new Group();   
    obstacleSprites = new Group();

  
    numGroundSprites = width/GROUND_SPRITE_WIDTH + 1;
    
    
    
    for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
    groundSprites.add(groundSprite);
  }
  player = createSprite(100, height-75, 50, 50);
}

function endGame() {
  isGameOver = true;
}

function draw(){
    score = score + 1;

     if (isGameOver) {
    background(0);
    fill(255);
    textAlign(CENTER);
    //text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    text("Your score was: " + score, camera.position.x, camera.position.y - 20);
    text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);

  } else {
      
    
    background(150, 200, 250);

    camera.position.x = player.position.x + (width/4);
    
    player.position.x = player.position.x + 5;
    
    var firstGroundSprite = groundSprites[0];

    if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
        groundSprites.remove(firstGroundSprite);
        firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
        groundSprites.add(firstGroundSprite);
        
         
        }
    player.velocity.y = player.velocity.y + GRAVITY;

if (groundSprites.overlap(player)) {
  player.velocity.y = 0;
  player.position.y = (height-50) - (player.height/2);
}

if (keyDown(UP_ARROW)) {
  player.velocity.y = JUMP;
}


    if (random() > 0.95) {
        var obstacle = createSprite(camera.position.x + width, (height-50) - 15, 30, 30);
        obstacleSprites.add(obstacle);
        }
    var firstObstacle = obstacleSprites[0];
    if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
        removeSprite(firstObstacle);
        }


    obstacleSprites.overlap(player, endGame);
    textAlign(CENTER);
    text(score, camera.position.x, 10);


    

  }
    
    drawSprites();
    
    
}

function mouseClicked() {
  if (isGameOver) {
      score = 0;


    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();

    isGameOver = false;
  }
}
