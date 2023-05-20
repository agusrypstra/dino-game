"use strict";

import Dino from "./classes/dino.js";

let jump = false;
let dinoWidth = 682;
let dinoHeight = 474;

let dinoLeft;
let dinoRight;
let dinoTop;
let dinoBottom;
const dino = document.getElementById("dino");
let position = dino.getBoundingClientRect();

const newDino = new Dino(
  dinoWidth,
  dinoHeight,
  position.x,
  position.y,
  0,
  dino,
  5000
);
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("mousedown", () => {
    newDino.jump();
  });
  window.requestAnimationFrame(animar);
});
function animar() {
  dinoLeft = position.x;
  dinoRight = position.x + dinoWidth;
  dinoTop = position.y;
  dinoBottom = position.y + dinoHeight;
  window.requestAnimationFrame(animar);
}
