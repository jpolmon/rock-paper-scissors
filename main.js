let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d")

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width
canvas.height = window_height

canvas.style.background = "#ff8"

class Point {
  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  }
}


class Circle {
  constructor(xpos, ypos, rad, color, text, speed, value) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.rad = rad;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.value = value;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw() {
    context.beginPath();

    context.strokeStyle = this.color
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.xpos, this.ypos);
    
    context.strokeStyle = this.color;
    context.lineWidth = 5;
    context.arc(this.xpos, this.ypos, this.rad, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update() {
    
    this.draw(context);

    if ( (this.xpos + this.rad) > window_width) {
      this.dx = -this.dx;
    }

    if ( (this.xpos - this.rad) < 0) {
      this.dx = -this.dx;
    }

    if ( (this.ypos - this.rad) < 0) {
      this.dy = -this.dy;
    }

    if ( (this.ypos + this.rad) > window_height) {
      this.dy = -this.dy;
    }

    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

let getDistance = function(xpos1, ypos1, xpos2, ypos2) {
  return Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
}

let radius = 30;
let numGroups = 7;
let numCircles = numGroups * 3;
let circles = [];

let randNum = function(min, max) {
  return Math.random() * (max - min) + min;
}

let generateStartPoints = function() {
  let points = [];
  for (let i = 0; i < numCircles; i++) {
    let thisPoint = new Point(randNum(radius, (window_width - radius)),randNum(radius, (window_height - radius)))
    if (points) {
      for (const point of points) {
        if (getDistance(thisPoint.xpos, thisPoint.ypos, point.xpos, point.ypos) <= ((2 * radius) + 50)) {
          while (getDistance(thisPoint.xpos, thisPoint.ypos, point.xpos, point.ypos) <= ((2 * radius) + 50)) {
            thisPoint.xpos = randNum(radius, (window_width - radius));
            thisPoint.ypos = randNum(radius, (window_height - radius));
          } 
        }
      }
    }
    points.push(thisPoint);
  }
  console.log(points);
  return points;
}

// generateStartPoints(numCircles);

let pointIndex = 0;

for (let i = 0; i < numGroups; i++) {
  let points = generateStartPoints(numCircles);
  let new_rock = new Circle(points[pointIndex].xpos, points[pointIndex].ypos, radius, "red", "R", 0.5, "rock");
  pointIndex++;
  let new_paper = new Circle(points[pointIndex].xpos, points[pointIndex].ypos, radius, "purple", "P", 0.5, "paper");
  pointIndex++;
  let new_scissors = new Circle(points[pointIndex].xpos, points[pointIndex].ypos, radius, "black", "S", 0.5, "scissors");
  pointIndex++;
  circles.push(new_rock);
  circles.push(new_paper);
  circles.push(new_scissors);
}

let updateCircle = function() {
  requestAnimationFrame(updateCircle);
  context.clearRect(0, 0, window_width, window_height);

  for (const circle of circles) {
    for (const circle2 of circles) {
      if ((getDistance(circle.xpos, circle.ypos, circle2.xpos, circle2.ypos) <= (circle2.rad + circle.rad)) && (getDistance(circle.xpos, circle.ypos, circle2.xpos, circle2.ypos) != 0)) {
        switch (circle.value) {
          case "rock":
            if (circle2.value == "paper") {
              circle.value = "paper";
              circle.text = "P";
              circle.color = "purple";
            } else if (circle2.value == "scissors") {
              circle2.value = "rock";
              circle2.text = "R";
              circle2.color = "red";
            }
            break;
          case "paper":
            if (circle2.value == "scissors") {
              circle.value = "scissors";
              circle.text = "S"
              circle.color = "black";
            } else if (circle2.value == "rock") {
              circle2.value = "paper";
              circle2.text = "P";
              circle2.color = "purple";
            }
            break;
          case "scissors":
            if (circle2.value == "rock") {
              circle.value = "rock";
              circle.text = "R";
              circle.color = "red";
            } else if (circle2.value == "paper") {
              circle2.value = "scissors";
              circle2.text = "S";
              circle2.color = "black";
            }
            break;
        }
        if ((circle.dx * circle2.dx) > 0) {
          circle.dy = -circle.dy;
          circle2.dy = -circle2.dy;
        }
        else if ((circle.dy * circle2.dy) > 0) {
          circle.dx = -circle.dx;
          circle2.dx = -circle2.dx;
        }
        else {
          circle.dx = -circle.dx;
          circle.dy = -circle.dy;
          circle2.dx = -circle2.dx;
          circle2.dy = -circle2.dy;  
        }
      }
    }
    circle.update();
  }
}

updateCircle();

