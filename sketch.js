
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0
var ground , invisibleGround 

function preload()
{
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(500,500);
  ground = createSprite(400,425,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor = "brown";
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.visible = "false";
  invisibleGround.shapeColor = "green";

  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() 
{
  background("green");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
  stroke("black");
  textSize(20);
  fill("black");
  //score = Math.ceil(frameCount/frameRate())
  text("Score: " + score, 400,40);
  
  if (ground.x < 0)
  {
  ground.x = ground.width/2;
  }
  
  if((touches.length > 0 || keyDown("SPACE")) && monkey.y  >= height-120) 
  {
  monkey.velocityY = -25;
  touches = [];
  }
  
  if(monkey.isTouching(bananaGroup))
    {
      score = score+1;
      bananaGroup.destroyEach();
      
    }
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);

  
  
    
    }
  
  monkey.velocityY = monkey.velocityY + 1
  
  monkey.collide(invisibleGround);
  
  spawnBananas();
  spawnObstacles();

  drawSprites();
}

function spawnObstacles()
{
 if (frameCount % 100 === 0)
 {
   var obstacle = createSprite(600,383,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
  
    var rand = Math.round(random(1,6));
   
   
          
    obstacle.scale = 0.2;
    obstacle.lifetime = 500;
   

    obstacleGroup.add(obstacle);
 }
}

function spawnBananas() 
{
 
  if (frameCount % 80 === 0) 
  {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
   
    banana.lifetime = 500;
    
   
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   
    bananaGroup.add(banana);
  }
}



