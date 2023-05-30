import GameElement from "./GameElement.js";
export default class Star extends GameElement {
  constructor(containerRef) {
    super(containerRef);
  }
  generateObject() {
    super.generateObject("star");
  }
}
