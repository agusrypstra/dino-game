"use strict";

import GameManager from "./classes/GameManager.js";
let dinoRef;

const containerRef = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
  dinoRef = document.getElementById("dino");
  let pointsRef = document.getElementById("points");
  const Game = new GameManager(dinoRef, pointsRef, containerRef);
  Game.gameLoop();
});
