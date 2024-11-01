/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let cloudy;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  cloudy = new CloudDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(135, 206, 235);  // Sky blue background
  drawFloor(); // for reference only

  cloudy.update();
  cloudy.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class CloudDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.cloudWidth = 180;
    this.cloudHeight = 100;
    this.raindrops = [];
    this.rainbowAngle = 0;
    this.swayAngle = 0;
    this.blinkTimer = 0;
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.swayAngle += 0.02;
    this.x = width / 2 + sin(this.swayAngle) * 50;

    if (random() < 0.3) {
      this.raindrops.push({
        x: random(this.x - this.cloudWidth / 2, this.x + this.cloudWidth / 2),
        y: this.y + this.cloudHeight / 2,
        speed: random(2, 5)
      });
    }

    for (let i = this.raindrops.length - 1; i >= 0; i--) {
      this.raindrops[i].y += this.raindrops[i].speed;
      if (this.raindrops[i].y > height) {
        this.raindrops.splice(i, 1);
      }
    }

    this.rainbowAngle += 0.01;
    this.blinkTimer++;
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    // Draw cloud
    fill(255);
    noStroke();
    ellipse(0, 0, this.cloudWidth, this.cloudHeight);
    ellipse(-this.cloudWidth / 4, -this.cloudHeight / 4, this.cloudWidth / 2, this.cloudHeight / 2);
    ellipse(this.cloudWidth / 4, -this.cloudHeight / 4, this.cloudWidth / 2, this.cloudHeight / 2);

    // Draw cute face
    fill(0);
    
    // Eyes
    let leftEye = -this.cloudWidth / 6;
    let rightEye = this.cloudWidth / 6;
    let eyeY = -this.cloudHeight / 6;
    
    if (this.blinkTimer % 150 < 5) {
      // Blinking
      stroke(0);
      strokeWeight(2);
      line(leftEye - 10, eyeY, leftEye + 10, eyeY);
      line(rightEye - 10, eyeY, rightEye + 10, eyeY);
    } else {
      // Open eyes
      noStroke();
      ellipse(leftEye, eyeY, 20, 20);
      ellipse(rightEye, eyeY, 20, 20);
      
      // Pupils
      fill(255);
      ellipse(leftEye + 3, eyeY - 3, 8, 8);
      ellipse(rightEye + 3, eyeY - 3, 8, 8);
    }

    // Smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, this.cloudHeight / 8, this.cloudWidth / 3, this.cloudHeight / 4, 0, PI);

    // Rosy cheeks
    noStroke();
    fill(255, 150, 150, 100);
    ellipse(-this.cloudWidth / 4, this.cloudHeight / 8, 20, 15);
    ellipse(this.cloudWidth / 4, this.cloudHeight / 8, 20, 15);

    // Draw raindrops
    stroke(0, 0, 255);
    strokeWeight(2);
    for (let raindrop of this.raindrops) {
      line(raindrop.x - this.x, raindrop.y - this.y, raindrop.x - this.x, raindrop.y - this.y + 10);
    }

    // Draw rainbow
    noFill();
    strokeWeight(3);
    let rainbowRadius = 80;
    let rainbowColors = [color(255, 0, 0), color(255, 127, 0), color(255, 255, 0), 
                         color(0, 255, 0), color(0, 0, 255), color(75, 0, 130), color(143, 0, 255)];
    
    for (let i = 0; i < rainbowColors.length; i++) {
      stroke(rainbowColors[i]);
      arc(0, 0, rainbowRadius + i * 10, rainbowRadius + i * 10, 
          PI + sin(this.rainbowAngle) * 0.2, TWO_PI - sin(this.rainbowAngle) * 0.2);
    }

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    pop();
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/