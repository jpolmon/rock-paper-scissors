let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d")

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width
canvas.height = window_height

canvas.style.background = "#ff8"

// context.fillStyle = "red";

// context.fillRect(300, 0, 100, 100);

// context.fillRect(100, 200, 50, 100);

// context.beginPath();
// context.strokeStyle = "blue";
// context.lineWidth = 10;
// context.arc(100, 100, 50, 0, Math.PI * 2, false);
// context.stroke();
// context.closePath();

class Circle {
  constructor(xpos, ypos, rad, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.rad = rad;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(this.xpos, this.ypos, this.rad, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
}

let my_circle = new Circle(100, 100, 50, "black");

my_circle.draw(context);

let numCircles = 10
let circles = [];

let createCircle = function(circle) {
  circle.draw(context);
}

for (let i = 0; i < numCircles; i++) {
  let new_circle = new Circle(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 50, "black")
  circles.push(new_circle);
  createCircle(new_circle);
}

console.log(circles);