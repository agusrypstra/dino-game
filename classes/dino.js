export default class Dino {
  constructor(ref) {
    this.ref = ref;
    this.width = this.ref.clientWidth;
    this.height = this.ref.height;
    this.jumpState = false;
    this.audio = new Audio();
  }
  run() {
    let animations = document.styleSheets[0].cssRules[0];
    let keyframes = animations.cssRules;
    keyframes[1].style.backgroundPosition = `-${this.ref.width * 8}px`;
  }
  jump() {
    if (!this.jumpState) {
      this.ref.classList.toggle("dino-jump");
      this.jumpState = true;
      this.audio.src = "../sounds/jump.mp3";
      this.audio.volume = 0.1;
      this.audio.play();
      setTimeout(() => {
        this.ref.classList.toggle("dino-jump");
        this.jumpState = false;
      }, 1200);
    }
  }
  die() {
    // alert("Perdiste");
    this.ref.classList.add("dino-die");
  }
}
