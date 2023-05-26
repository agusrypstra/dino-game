"use strict";

import Dino from "./classes/dino.js";
let inGame = true;
let dinoRef;
let newDino;
let pointsRef = document.getElementById("points");
let i = 0;
let req;
let meteorites = [];
const container = document.getElementById("container");

container.addEventListener("mousemove", (e) => {
  console.log("container height" + container.offsetHeight);
  console.log("y" + e.clientY);
});
document.addEventListener("DOMContentLoaded", () => {
  dinoRef = document.getElementById("dino");
  newDino = new Dino(dinoRef);
  newDino.run();

  game_loop();
  if (inGame) {
    setInterval(() => {
      generateMeteorite();
    }, 2000);
    setInterval(() => {
      i++;
    }, 100);
  }
});

function verificarObstaculos() {
  for (var i = 0; i < meteorites.length; i++) {
    var obstacle = meteorites[i];
    var obstacleRect = obstacle.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    // Verifica si el obstáculo ha pasado de cierta posición en el eje  Y
    if (obstacleRect.right < containerRect.left) {
      container.removeChild(obstacle); // Elimina el obstáculo del contenedor
      meteorites.splice(i, 1); // Elimina el obstáculo del array
      i--; // Actualiza el índice para evitar saltar elementos
    }
  }
}
const generateMeteorite = () => {
  let meteorite = document.createElement("div");
  meteorite.className = "meteorite";
  let posY = Math.floor(
    Math.random() *
      (container.offsetHeight / 2 - (container.offsetHeight - 150)) +
      container.offsetHeight -
      150
  );
  meteorite.style.top = posY + "px";
  container.appendChild(meteorite);
  meteorites.push(meteorite);
};

const game_loop = () => {
  process_user_input();
  endGameValidation();
  verificarObstaculos();

  render();
  if (inGame) {
    requestAnimationFrame(game_loop);
  } else {
    // alert("Juego finalizado");
  }
};
const process_user_input = () => {
  document.addEventListener("mousedown", () => {
    newDino.jump();
  });
};
const render = () => {
  pointsRef.innerHTML = `Points: ${i}`;
};
const endGameValidation = () => {
  for (const meteorite of meteorites) {
    let dinoPosition = dinoRef.getBoundingClientRect();
    let meteoritePosition = meteorite.getBoundingClientRect();
    if (checkIfMeteoriteTouchDino(dinoPosition, meteoritePosition)) {
      inGame = false;
      newDino.die();
      cancelAnimationFrame(req);
      alert("You lose");
    }
  }
};

const checkIfMeteoriteTouchDino = (dinoPosition, meteoritePosition) => {
  return (
    dinoPosition.left < meteoritePosition.right &&
    dinoPosition.right > meteoritePosition.left &&
    dinoPosition.top < meteoritePosition.bottom &&
    dinoPosition.bottom > meteoritePosition.top
  );
};
