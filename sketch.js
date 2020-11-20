//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart;
var highScore;


var fireball, fireballImage;
var backgroundImg
function preload(){
  trex_running = loadAnimation("trex.png");
  trex_collided = loadImage("trex.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  fireballImage = loadImage("fireball.png")

  obstacle1 = loadImage("rock.png");
  obstacle2 = loadImage("rock2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
  backgroundImg = loadImage("background.jpg")
}

function setup() {
  createCanvas(displayWidth - 15,displayHeight - 145);
  
  trex = createSprite(50,280,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.3;
  trex.setDefaultCollider();
  
  ground = createSprite(200,560,400,20);
  ground.x = ground.width /4;
  ground.velocityX = -10;
  ground.visible = false;


  // fireball = createSprite(trex.x, trex.y, 50,50);
  // fireball.addImage("fireball", fireballImage); 
  
  invisibleGround = createSprite(200,570,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(650,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  restart = createSprite(650,300);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
  
  score = 0;
  highScore = 0;
}

function draw() {
  background(backgroundImg);
  textSize(35)
  fill("#B8300A");
  text("Score: "+ score, 1000,50);
  
  if(score>highScore){
    highScore = score;
  }

  textSize(35)
  fill("#B8300A");
  text("High Score: "+ score, 1000,100);

  if(gameState === PLAY){
   
  score = score + Math.round(getFrameRate()/60);


  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }  
  if(keyDown("DOWN_ARROW")) {
    trex.velocityY = 7;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);

  spawnObstacles();
  spawnObstacles1();
    
    if(obstaclesGroup.isTouching(trex)){
     gameState = END; 
    }
    if(invisibleGround.isTouching(trex)){
      gameState = END;
    }
    
  }
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    trex.y = 280; 
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }    
  end();
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 30 === 0) {
    var obstacle = createSprite(2000,500,10,40);
    obstacle.velocityX = -10;
    obstacle.y = Math.round(random(550, 750))
    obstacle.addImage(obstacle1);
    
    //generate random obstacles
    // var rand = Math.round(random(1,6));
    // switch(rand) {
    //   case 1: obstacle.addImage(obstacle1);
    //           break;
    //   case 2: obstacle.addImage(obstacle2);
    //           break;
    //   case 3: obstacle.addImage(obstacle3);
    //           break;
    //   case 4: obstacle.addImage(obstacle4);
    //           break;
    //   case 5: obstacle.addImage(obstacle5);
    //           break;
    //   case 6: obstacle.addImage(obstacle6);
    //           break;
    //   default: break;
    // }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = Math.round(random(0.5, 1.5));
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.setDefaultCollider();
  }
}
function reset(){
  gameOver.visible = false;
  restart.visible = false;
  
  gameState=PLAY;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  ground.velocityX = -10;

  
  score=0;
  
  trex.changeAnimation("running",trex_running);
}

function end(){
  if(score > 500){
    gameState = 3;
  }
  if(gameState === 3){
    gameOver.visible = true;
    restart.visible = true;
        //set velcity of each game object to 0
        ground.velocityX = 0;
        trex.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        
        //change the trex animation
        trex.changeAnimation("collided",trex_collided);
        
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        
        text("Bravo, You have won!!!", 500,500)
        
  }
}
function spawnObstacles1() {
  var obstacle = createSprite(2000,10,10,40);
    obstacle.y = Math.round(random(10,100));  
  if(frameCount % 30 === 0) {
    obstacle.velocityX = -10;
    obstacle.addImage(obstacle2);    
    //generate random obstacles
    // var rand = Math.round(random(1,6));
    // switch(rand) {
    //   case 1: obstacle.addImage(obstacle1);
    //           break;
    //   case 2: obstacle.addImage(obstacle2);
    //           break;
    //   case 3: obstacle.addImage(obstacle3);
    //           break;
    //   case 4: obstacle.addImage(obstacle4);
    //           break;
    //   case 5: obstacle.addImage(obstacle5);
    //           break;
    //   case 6: obstacle.addImage(obstacle6);
    //           break;
    //   default: break;
    // }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = Math.round(random(0.5, 1.5));
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

