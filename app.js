"use strict";

import GameManager from "./classes/GameManager.js";

const containerRef = document.getElementById("container");
const dinoRef = document.getElementById("dino");
const pointsRef = document.getElementById("points");

document.addEventListener("DOMContentLoaded", () => {
  const Game = new GameManager(dinoRef, pointsRef, containerRef);
  Game.gameLoop();
  setInterval(() => {
    Game.generateMeteorite();
  }, 2000);
});
