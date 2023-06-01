import GameElement from "./GameElement.js";
export default class Star extends GameElement {
  constructor(containerRef) {
    super(containerRef);
    this.audio = new Audio();
  }
  generateObject() {
    super.generateObject("star");
  }
  sound() {
    this.audio.src = "../sounds/star.mp3";
    this.audio.volume = 0.5;
    this.audio.play();
  }
}
