var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var GRAVITY = 0.3;
var JUMP = -5;
var DOWNJUMP = 5;
var numGroundSprites;
var player;
var obstacleSprites;
var isGameOver;
var score;




function setup() {


  score = 0;

  isGameOver = false;
  createCanvas(1366, 700);

  // background(30, 0, 0);


  groundSprites = new Group();
  obstacleSprites = new Group();


  numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;



  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(n * 50, height - 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
    groundSprites.add(groundSprite);
  }
  player = createSprite(100, height - 75, 50, 50);
}

function endGame() {
  isGameOver = true;
}

function draw() {

  obstacleSprites.overlap(player, endGame);
  textAlign(CENTER);
  


  if (isGameOver) {
    background(20,0,0);
    // fill(255);
    textAlign(CENTER);
    //text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    text("Your score was: " + score, camera.position.x, camera.position.y - 20);
    text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    player.velocity.y = 0;
    player.velocity.x = 0;

  }
  else {
    player.velocity.y = player.velocity.y + GRAVITY;






    background(20, 0, 0);

    camera.position.x = player.position.x + (width / 4);

    player.position.x = player.position.x + 5;

    var firstGroundSprite = groundSprites[0];

    text(score, camera.position.x, 10);
    score = score + 1;

    if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
      groundSprites.remove(firstGroundSprite);
      firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width;
      groundSprites.add(firstGroundSprite);


    }

    if (groundSprites.overlap(player)) {
      player.velocity.y = 0;
      player.position.y = (height - 50) - (player.height / 2);
    }

    if (keyDown(UP_ARROW)) {
      player.velocity.y = JUMP;
    }
    else if (keyDown(DOWN_ARROW)) {
      player.velocity.y = DOWNJUMP;
    }
    else if (keyDown(RIGHT_ARROW) && player.velocity.x < 20) {
      player.velocity.x = player.velocity.x + .5;
    }
    else if (keyDown(LEFT_ARROW) && player.velocity.x > .5) {
      player.velocity.x = player.velocity.x - .5;
    }



    if (random() > 0.95) {
      //var obstacle = createSprite(camera.position.x + width, (height - 50) - 15, 30, 30);
      var obstacle = createSprite(camera.position.x + width, random(0, (height - 50) - 15), 30, 30);

      obstacleSprites.add(obstacle);
    }
    var firstObstacle = obstacleSprites[0];
    if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width / 2 + firstObstacle.width / 2)) {
      removeSprite(firstObstacle);
    }







  }
  if (player.position.y < 40){
    endGame();
  }

  drawSprites();


}

function mouseClicked() {
  if (isGameOver) {
    score = 0;


    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n * 50;
    }

    player.position.x = 100;
    player.position.y = height - 75;

    obstacleSprites.removeSprites();

    isGameOver = false;
  }
}
