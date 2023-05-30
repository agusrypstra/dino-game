import GameElement from "./GameElement.js";
export default class Meteorite extends GameElement {
  constructor(containerRef) {
    super(containerRef);
  }
  generateObject() {
    super.generateObject("meteorite");
  }
}
