import GameElement from "./GameElement.js";
export default class Clock extends GameElement {
  constructor(containerRef) {
    super(containerRef);
  }
  generateObject() {
    super.generateObject("clock");
  }
}
