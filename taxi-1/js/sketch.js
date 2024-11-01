let taxiInstance;



function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  taxiInstance= new Taxi(50,300,0.5); //make an instance, make a cookie/object/make copy
  console.log(taxiInstance)
}

function draw() {
  background(220)
  
  taxiInstance.display(); //call the object's method
}

class Taxi{
  // inside a class we list all its functions/methods

// one method is special, because it 
//1. must exist in every class
//2. it contains all classes properties
  constructor(startX,startY,s){
    // taxi's properties:
this.x= startX;
this.y= startY;
this.scaleFactor = s;
  }

display(){
push();
translate(this.x, this.y);
scale(this.scaleFactor);

noStroke();
fill(240, 220, 60);

// base:
rect(-50, -50, 100, 30);
// top"
rect(-25, -70, 50, 20);
// wheel 1:
this.drawWheel(-30,-15)
// wheel 2:
this.drawWheel( 30, -15);


// just to see origin 
// of translation matrix:
fill("red");
circle(0, 0, 5); 
}
drawWheel(x, y){
  push();
  translate(x, y);
  
    noStroke();
    fill(0);
    // circle(0,0,30);
    ellipse(0,0,28, 32);
  
  pop();
}

}