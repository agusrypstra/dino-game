export default class GameElement {
  constructor(containerRef) {
    this.containerRef = containerRef;
    this.elements = [];
  }
  generateObject(type) {
    let element = document.createElement("div");
    element.className = `${type} element`;
    let posY = this.generateRandomY();
    element.style.top = posY + "px";
    this.containerRef.appendChild(element);
    this.elements.push(element);
  }
  generateRandomY() {
    let n = Math.floor(
      Math.random() *
        (this.containerRef.offsetHeight / 2 -
          (this.containerRef.offsetHeight - 150)) +
        this.containerRef.offsetHeight -
        150
    );
    return n;
  }
}
