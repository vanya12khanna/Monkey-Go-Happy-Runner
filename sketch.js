var ground,groundImage;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY;
var END;
var gameState = PLAY;
var score = 0;  
var survivaltime = 0;

function preload(){
  
  //To load the images of monkey moving
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadImage ("sprite_0.png")
  
 // To load the image of banana
  bananaImage = loadImage("banana.png");
  
  //To load the image of obstacle
  obstacleImage = loadImage("obstacle.png");
 
  //loading ground image
  groundImage = loadImage("ground.jpg");
  }

function setup() {
  
  createCanvas(400,400)
  
  //To add the images of monkey running
  monkey = createSprite(30,330,0,0);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //creating the ground
  ground = createSprite(300,836);
  ground.addImage(groundImage);
  ground.scale = 1.5;
  
  //creating the groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
 
  //monkey.setCollider("rectangle",0,0,100,100)
  }


function draw() {
  background("lightblue")
  
    //moving the ground
    ground.velocityX = -4;
   if (ground.x < 0){
      ground.x = ground.width/2;
   }
    
    //creating the functions
    spawnBananas();
    spawnObstacles();
    
    //making the monkey jump
    if (keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -8;
    }
    
    //adding gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.2;
    
    //making the bananas disappear when the monkey touches it
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 5;
    }
    
    //survival time
    survivaltime = Math.ceil(frameCount/frameRate())
    
    //changing the game state to end
   if (monkey.isTouching(obstacleGroup)){
  
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    

     ground.velocityX = 0;
     monkey.velocityY = 0;
     
     //displaying game over
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("GAME OVER",120,200);
    
     //displaying press r to restart
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("Press 'R' to restart the game",120,220);
    
     survivaltime = 0;
     
    if (keyDown ("r")){
      reset();
    }
   }
  
  //stop monkey from falling
  monkey.collide(ground);
  
  drawSprites();
  
   
  //adding the no. of bananas collected
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("Bananas collected : "+ score,30,30);
  
  //adding the survival time
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("Survival Time : " + survivaltime,30,50)

  }
 
function spawnBananas(){
  if (frameCount % 80 === 0){
  //creating the bananas
 var banana = createSprite (500,Math.round(random (100,250)) ,10,10 );
 banana.addImage (bananaImage);
  banana.scale = 0.1;
    
    //moving the banana
  banana.velocityX = -4;
    
    //giving the banana a lifetime
banana.lifetime = 250;
    
    //adding banana in its group
    bananaGroup.add (banana);
  }
}

function spawnObstacles(){
  if (frameCount % 140 === 0){
    //creating the obstacles
    var obstacle = createSprite (500,323,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.2;
    
    //moving the obstacles
    obstacle.velocityX = -4;
    
    //giving the obstacles a lifetime
    obstacle.lifetime = 250;
    
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200)
    
    //adding obstacle in its group
    obstacleGroup.add(obstacle);
  
  }
}

function reset(){
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
  survivaltime = 0;
}