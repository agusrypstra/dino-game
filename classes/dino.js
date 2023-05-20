export default class Dino {
  constructor(width, height, positionX, positionY, points, node, time) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.points = points;
    this.node = node;
    this.time = time;
    this.jumpState = false;
  }
  jump() {
    if (!this.jumpState) {
      this.node.classList.add("dino-jump");
      this.jumpState = true;
      setTimeout(() => {
        this.node.classList.remove("dino-jump");
        this.jumpState = false;
      }, 1500);
    }
  }
  showPoints() {
    return this.points;
  }
}
