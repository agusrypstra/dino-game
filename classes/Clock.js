import GameElement from "./GameElement.js";
export default class Clock extends GameElement {
  constructor(containerRef) {
    super(containerRef);
    this.audio = new Audio();
  }
  generateObject() {
    super.generateObject("clock");
  }
  sound() {
    this.audio.src = "../sounds/time.mp3";
    this.audio.volume = 0.2;
    this.audio.play();
  }
}
