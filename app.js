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
  const newMeteorite = new Meteorite(containerRef);
  const newStar = new Star(containerRef);
  const newClock = new Clock(containerRef);
  Game.gameLoop();
  // setInterval(() => {
  //   newMeteorite.generateObject();
  // }, 2000);
  setInterval(() => {
    newClock.generateObject();
  }, 2000);
  // setInterval(() => {
  //   newStar.generateObject();
  // }, 3500);
  setInterval(() => {
    Game.time--;
    console.log(Game.time);
  }, 1000);
});
