"use strict";

import Dino from "./classes/dino.js";
import Meteorite from "./classes/meteorite.js";

const dinoWidth = 682;
const dinoHeight = 474;

const meteoriteWidth = 500;
const meteoriteHeight = 151;

const dino = document.getElementById("dino");
const newDino = new Dino(dinoWidth, dinoHeight, 0, 0, 0, dino, 5000);
const meteorite = document.getElementById("meteorite");
let req;

document.addEventListener("DOMContentLoaded", () => {
  req = requestAnimationFrame(animar);
  document.addEventListener("mousedown", () => {
    newDino.jump();
  });
});
function animar() {
  let dinoPosition = dino.getBoundingClientRect();
  let meteoritePosition = meteorite.getBoundingClientRect();
  req = requestAnimationFrame(animar);
  console.log("object");
  if (checkIfMeteoriteTouchDino(dinoPosition, meteoritePosition)) {
    cancelAnimationFrame(req);
  }
}
const checkIfMeteoriteTouchDino = (dinoPosition, meteoritePosition) => {
  return (
    dinoPosition.left < meteoritePosition.right &&
    dinoPosition.right > meteoritePosition.left &&
    dinoPosition.top < meteoritePosition.bottom &&
    dinoPosition.bottom > meteoritePosition.top
  );
};
