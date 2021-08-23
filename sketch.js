var START=0;
var PLAY=1;
var SECONDCHANCE=2;
var THIRDCHANCE=3;
var END=4;
var gameState=START;
var planeImg,plane;
var spaceImg,space;
var bulletGroup,missileImg;
var obstacle;
var lives,lives2,lives3livesImg;
var live=0;
var score=0;

function preload(){
  planeImg=loadAnimation("images/fighterPlane2.jpg");

  spaceImg=loadImage("images/spaceImg.png");

  missileImg=loadImage("images/missile.png");

  obstacleImg=loadAnimation("images/asteroid1.png","images/asteroid2.png","images/asteroid3.png","images/asteroid4.png","images/asteroid5.png","images/asteroid6.png","images/asteroid7.png","images/asteroid8.png","images/asteroid9.png","images/asteroid10.png","images/asteroid11.png","images/asteroid12.png","images/asteroid13.png","images/asteroid14.png")

  obstacleImg2=loadAnimation("images/asteroid1.png");

  livesImg=loadImage("images/lives.png");
}

function setup() {
  createCanvas(750,750);

  space=createSprite(300,-100,10,10);
  space.addImage(spaceImg);
  space.scale=2.2;
  space.velocityY=(8 + 1*score/400);

  plane=createSprite(350,900,10,10);
  plane.velocityY=-8;
  plane.addAnimation("running",planeImg);
  plane.scale=0.8;

  invisibleGround=createSprite(375,800,750,5);
  invisibleGround.visible=false;

  //write code for making three lives
  lives=createSprite(20,30,10,10);
  lives.addImage(livesImg);
  lives.scale=0.04;

  lives2=createSprite(70,30,10,10);
  lives2.addImage(livesImg);
  lives2.scale=0.04;

  lives3=createSprite(120,30,10,10);
  lives3.addImage(livesImg);
  lives3.scale=0.04;

  bulletGroup=new Group();

  obstacleGroup=new Group();

  live=0;

  score=0;
}

function draw() {
  background(0);


  if(gameState===START){
    plane.visible=false;
    space.visible=false;
    plane.velocityY=0;
    space.velocityY=0;
    if(keyDown("space")){
      gameState=PLAY;
    }
  }


  if(obstacleGroup.isTouching(invisibleGround)){
    live++
    obstacleGroup.destroyEach();
  }

  if(live===1){
    gameState=SECONDCHANCE;
    live++

  }

  if(gameState===PLAY){
    
    if(live===3){
      gameState=THIRDCHANCE;
      live++

    }

    if(live===5){
      gameState=END;

    }

    score = score + Math.round(getFrameRate()/60);

    plane.visible=true;
    space.visible=true;
    
    plane.velocityY=-8;

     if(plane.y<=680){
    plane.velocityY=0;
  }

  if(space.y>800){
    space.y=-100;
    space.velocityY=(8 + 1*score/400);
  }

  if(keyDown(RIGHT_ARROW)){
    plane.x=plane.x+10;
  }

  if(keyDown(LEFT_ARROW)){
    plane.x=plane.x-10;
  }

  if(bulletGroup.isTouching(obstacleGroup)){
    bulletGroup.destroyEach();
    obstacleGroup.destroyEach();
  }

  if(obstacleGroup.isTouching(plane)){
    ++live;
    obstacleGroup.destroyEach();
  }

  obstacleGroup.setVelocityYEach((8 + 1*score/400));
  space.velocityY=(8 + 1*score/400);

  console.log(live);

  Obstacle();
  
  if (keyWentDown("space"))
  {
      var temp_bullet = createbullet();
      temp_bullet.addImage(missileImg);
      temp_bullet.scale=0.5;
      temp_bullet.y = plane.y-80;
      temp_bullet.x=plane.x;
      temp_bullet.velocityY =-15;
      temp_bullet.lifetime=100;
  }
  

  }

  if(gameState===SECONDCHANCE){
    lives3.visible=false;
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityYEach(0);
    space.velocityY=0;
    if(keyDown("c")){
      gameState=PLAY;

    }
  }

  if(gameState===THIRDCHANCE){
    lives2.visible=false;
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityYEach(0);
    space.velocityY=0;
    if(keyDown("c")){
      gameState=PLAY;

    }
  }
 
if(gameState===END){
  lives.visible=false;
  plane.visible=false;
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityYEach(0);
  space.velocityY=0;
  if(keyDown("space")){
    live=0;
    gameState=PLAY;
    score=0;
    lives.visible=true;
    lives2.visible=true;
    lives3.visible=true;
  }
}

  drawSprites();

  fill("blue");
  textSize(30);
  text("Score:"+score,10,80)

  if(gameState===START){
    fill("red");
    textSize(20);
    text("You are the astronaut, you are in the mission.",165,250);
    text("Which is known as 'Save the Earth'. You need to destroy the asteroids.",50,300);
    text("If asteroid cross you or go out of screen so it will hit the Earth and Earth will destroy",5,350);
    text("Press Space button to launch the missile to destroy the asteroid",70,400);
    text("when you go on mission.",270,450);
    text("You got three chance to save the Earth.",200,500)
    text("Press Space button to go on the mission.",200,550);
    
  }

  if(gameState===SECONDCHANCE){
    fill("red");
    textSize(20);
    text("You had lost your first chance but you have second chance to win the game.",50,350);
    text("Press C button to get the second chance.",230,400);

  }
  
  if(gameState===THIRDCHANCE){
    fill("blue");
    textSize(20);
    text("Oops, you had lost your second chance now you have only last chance to win the",10,350);
    text("game.",300,400);
    text("Press again C button to get the last chance.",160,450);

  }

  if(gameState===END){
    fill("lightGreen");
    textSize(20);
    text("GAMEOVER",330,300);
    text("Oops, you had lost your last chance also. You can't save the Earth",50,380);
    text("Press space button to play again the game.",180,430);

  }

}

function createbullet()
{        
       bullet=createSprite(200, 250, 100, 100);
       bullet.scale=0.1;
       bulletGroup.add(bullet);
       return bullet;
}

function Obstacle(){
  if(frameCount%150===0){
      obstacle=createSprite(random(50,700),50,10,10);
    obstacle.addAnimation("running",obstacleImg);
    obstacle.scale=0.2;
    obstacle.velocityY=(5 + 1*score/400);;
    obstacle.lifetime=170;
    obstacleGroup.add(obstacle);

    console.log(obstacle.y);

   

  }
}