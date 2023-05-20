export default class Dino {
  constructor(width, height, positionX, positionY, points, ref, time) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.points = points;
    this.ref = ref;
    this.time = time;
    this.jumpState = false;
  }
  jump() {
    if (!this.jumpState) {
      this.ref.classList.add("dino-jump");
      this.jumpState = true;
      setTimeout(() => {
        this.ref.classList.remove("dino-jump");
        this.jumpState = false;
      }, 2000);
    }
  }
  die() {
    this.ref.classList.add("dino-die");
  }
}
