
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,esound,esound1;
var score=0
var survivalTime;
var bg, bgImage;
var f,fImage
var gameState=1;
var PLAY=1,
    END=0,
    WIN=100,
    BEG=-1
    col=0;
function preload(){
  
  bgImage= loadImage("city.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  fImage= loadImage("stone.png")
  
  bananaImage = loadImage("bomb-removebg-preview.png");
  obstacleImage = loadImage("soldierre-removebg-preview.png");
  esound =loadSound("Explosion+7.mp3")
}



function setup() {
  
  bg=createSprite(200,200,10,10)
  bg.addImage(bgImage)
  bg.scale=0.28
  bg.velocityX=-2
  
  
  f=createSprite(200,570,10,10)
  f.addImage(fImage)
  f.scale=0.5
  
  
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  monkey.depth=monkey.depth+1
  
  ground=createSprite(400,360,900,10)
  ground.velocityX=-4
  ground.visible=false
  ground.x= ground.width/2
  console.log(monkey.y)
 
  
  monkeyGroup=new Group()
   FoodGroup= new Group ();
   obstacleGroup= new Group ();
      
}

function draw() {
   createCanvas(400,400);
background("white")
  
  if(bg.x < 50){
    bg.x= width/2
  }
  
 
  if(gameState===PLAY){
    Obstacle()
    bananas()
    
    
   
    
      if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach()
    score=score+8
    monkey.scale=0.15
        esound.play()
        col=col-1
        
  }
 
      if (ground.x<150) {
          ground.x= 200
         }   
  
        if (keyDown ("space")&& monkey.y>=300) {
      monkey.velocityY= -20;  
          } 
  
  
        
     monkey.velocityY= monkey.velocityY + 0.8 ;
  
     
  
  
   if(obstacleGroup.isTouching(monkey)){
   obstacleGroup.destroyEach()
    score=score-5
    monkey.scale=0.09
     col+=1
  }
  if (score % 100 === 0 && score > 0) {
    monkey.scale = monkey.scale + 0.01;
  }
    
     if(score===100){
    gameState=WIN
       
  }
    
    
    
    if(col===3){
      gameState=END
    }
  
  }
  
   if(gameState===END){
    obstacleGroup.destroyEach()
    FoodGroup.destroyEach()
   }
  
 
  monkey.collide (ground); 
  
  drawSprites()
  
  if(gameState===END){
    
    fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
   text("GAME OVER",135,210)
    
     fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Press R to Restart",120,250);
    
    bg.velocityX=0
    monkey.visible=false
    
     if (keyWentDown("r") && gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
    gameState = PLAY;
    monkey.scale = 0.13;
    col = 0;
    monkey.visible=true
  }
    
  }
  
  stroke("black")
  textSize(20)
  fill("white")
  text("Destruction Caused "+score+ "%" ,15,50)
  
 
  if(gameState===WIN) {
        obstacleGroup.destroyEach()
        FoodGroup.destroyEach()
      monkey.visible=false
      bg.velocityX=0
      
       fill(250);
    textSize(22);
    stroke("white");
    strokeWeight(2);
   text("YOU HAVE DESTOYED THE CITY",30,210)
    
        fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Press R to Restart",120,250);
    
       if (keyWentDown("r") && gameState === WIN) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
    gameState = PLAY;
    monkey.scale = 0.13;
    col = 0;
    monkey.visible=true
  }
    
        
      }
  
}


function bananas () {
  if (frameCount%90===0) {
    banana= createSprite (360,170,10,10);  
    banana.addImage ( bananaImage);
    banana.scale= 0.1 ;
    banana.velocityX= -3;
    banana.y=Math.round(random(250,300))
  
      banana.lifetime= 150;
    
    FoodGroup.add(banana)
    
  }
}

function Obstacle(){
  if(frameCount%110===0){
    obstacle= createSprite(270,320 ,10,10)
    obstacle.x=Math.round(random(250,400))
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.17
    obstacle.velocityX=-3
    
    obstacle.lifetime=150
    
    obstacleGroup.add(obstacle)
    obstacle.setCollider("rectangle",10,10,50,50,50)
    
  }
}








