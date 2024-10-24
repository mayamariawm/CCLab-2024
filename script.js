let character;
let monsters = [];
let explosionCount = 0;
let explosionParticles = [];
let confetti = [];

function setup() {
  createCanvas(800, 600);
  character = {
    x: width / 2,
    y: height / 2,
    size: 50,
    color: color(255, 200, 150)
  };
}

function draw() {
  background('lightblue');
  
  // Draw and move character (representing a person using geometric shapes)
  fill(character.color);
  ellipse(character.x, character.y, character.size); // head
  rect(character.x - 15, character.y + 25, 30, 50); // body
  line(character.x - 15, character.y + 50, character.x - 30, character.y + 80); // left arm
  line(character.x + 15, character.y + 50, character.x + 30, character.y + 80); // right arm
  line(character.x - 15, character.y + 75, character.x - 15, character.y + 120); // left leg
  line(character.x + 15, character.y + 75, character.x + 15, character.y + 120); // right leg
  
  if (explosionCount < 10 && monsters.length > 0) {
    // Move character towards mouse when pressed
    if (mouseIsPressed) {
      character.x = lerp(character.x, mouseX, 0.1);
      character.y = lerp(character.y, mouseY, 0.1);
    }
    
    // Draw and move monsters (abstract and smoother movement)
    for (let i = monsters.length -1; i >=0; i--) {
      let monster = monsters[i];
      fill(255, random(100), random(100), random(100)); // more transparent
      ellipse(monster.x, monster.y, monster.size);
      
      // Smooth movement
      monster.x += random(-1.5,1.5);
      monster.y += random(-1.5 ,1.5);
      
      // Check collision with character
      if(dist(character.x ,character.y ,monster.x ,monster.y)<(character.size+monster.size)/2){
        character.size -=1;
        if(character.size <10){
          explode();
        }
      }
      
      // Make monsters less "angry" over time
      monster.size += explosionCount *-0.05; // gradually reduce size increase
      
      // Remove small monsters
      if(monster.size <=5){
        monsters.splice(i ,1);
      }
    }
    
   } else {
    // Game over state with confetti celebration
    textSize(32);
    textAlign(CENTER,CENTER);
    fill(0);
    text("Congratulations! You've overcome your fears!", width/2,height/2);

    // Draw confetti particles
    for(let c of confetti){
      fill(c.color);
      ellipse(c.x,c.y,c.size);
      c.y +=c.speed; // move downwards
      if(c.y >height) c.y=random(-100); // reset position to top if it goes off screen
    }
   }
  
   // Draw explosion particles
   for(let i=explosionParticles.length -1; i >=0; i--){
     let p=explosionParticles[i];
     fill(p.color);
     ellipse(p.x,p.y,p.size);
     p.size -=0.5;
     if(p.size <=0){
       explosionParticles.splice(i ,1);
     }
   }
}

function mousePressed() {
 if(explosionCount <10){
   // Add new monster
   monsters.push({
     x:random(width),
     y:random(height),
     size:30 
   });
   
   // Grow existing monsters slightly less aggressively over time
   for(let monster of monsters){
     monster.size += max(5 - explosionCount *0.5 ,1); 
   }
 }
}

function explode() {
 explosionCount++;
 character.size=50;
 character.x=random(width);
 character.y=random(height);

 // Create explosion particles
 for(let i=0;i<50;i++){
   explosionParticles.push({
     x:character.x+random(-50 ,50),
     y:character.y+random(-50 ,50),
     size:random(5 ,15),
     color:color(random(255),random(255),random(255))
   });
 }

 // Create confetti particles for celebration
 for(let i=0;i<100;i++){
   confetti.push({
     x:random(width),
     y:random(-height ,0),
     size:random(3 ,7),
     speed:random(1 ,3),
     color:color(random(255),random(255),random(255))
   });
 }
}

