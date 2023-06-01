import GameElement from "./GameElement.js";
export default class Meteorite extends GameElement {
  constructor(containerRef) {
    super(containerRef);
    this.audio = new Audio();
  }
  generateObject() {
    super.generateObject("meteorite");
  }
  sound() {
    this.audio.src = "../sounds/hit.mp3";
    this.audio.volume = 0.2;
    this.audio.play();
  }
}
