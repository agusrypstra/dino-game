"use strict";

import Clock from "./classes/Clock.js";
import GameManager from "./classes/GameManager.js";
import Meteorite from "./classes/Meteorite.js";
import Star from "./classes/Star.js";

const containerRef = document.getElementById("container");
const dinoRef = document.getElementById("dino");
const pointsRef = document.getElementById("points");
const timeRef = document.getElementById("time");
const skyRef = document.getElementById("sky");
const floorRef = document.getElementById("floor");

document.addEventListener("DOMContentLoaded", () => {
  const Game = new GameManager(
    dinoRef,
    pointsRef,
    containerRef,
    timeRef,
    skyRef,
    floorRef
  );
  let audio = new Audio();
  audio.src = "./sounds/soundtrack.mp3";

  document.addEventListener("click", () => audio.play());
  const newMeteorite = new Meteorite(containerRef);
  const newStar = new Star(containerRef);
  const newClock = new Clock(containerRef);
  Game.gameLoop();
  setInterval(() => {
    if (Game.inGame && Game.time > 0) {
      newMeteorite.generateObject();
    }
  }, 2000);
  setInterval(() => {
    if (Game.inGame && Game.time > 0) {
      newClock.generateObject();
    }
  }, 10000);
  setInterval(() => {
    if (Game.inGame && Game.time > 0) {
      newStar.generateObject();
    }
  }, 3500);
  setInterval(() => {
    Game.time--;
    console.log(Game.time);
  }, 1000);
});
