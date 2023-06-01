"use strict";

import GameManager from "./classes/GameManager.js";
import Clock from "./classes/Clock.js";
import Meteorite from "./classes/Meteorite.js";
import Star from "./classes/Star.js";

const containerRef = document.getElementById("container");
const pointsRef = document.getElementById("points");
const timeRef = document.getElementById("time");
const playBtn = document.getElementById("play-btn");
const guideBtn = document.getElementById("guide-btn");
const menuContainer = document.querySelector(".menu-container");
const guideContainer = document.querySelector(".guide-container");
const closeBtn = document.querySelector(".close-button");

closeBtn.addEventListener("click", () => {
  guideContainer.classList.add("display-none");
});

playBtn.addEventListener("click", () => {
  menuContainer.classList.add("display-none");
  playGame();
});
guideBtn.addEventListener("click", () => {
  guideContainer.classList.toggle("display-none");
});

const playGame = () => {
  const dinoRef = document.getElementById("dino");

  const Game = new GameManager(
    dinoRef,
    pointsRef,
    containerRef,
    timeRef,
    menuContainer
  );
  Game.gameLoop();
};
