export default class GameElement {
  constructor(containerRef) {
    this.containerRef = containerRef;
  }
  //genera un elemento en una posicion random
  generateObject(type) {
    let element = document.createElement("div");
    element.className = `${type} element`;
    let posY = this.generateRandomY();
    element.style.top = posY + "px";
    this.containerRef.appendChild(element);
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
