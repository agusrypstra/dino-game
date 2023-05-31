import Dino from "./dino.js";

export default class GameManager {
  constructor(dinoRef, pointsRef, containerRef, timeRef, skyRef, floorRef) {
    this.animationReq = null;
    this.inGame = true;
    this.points = 0;
    this.containerRef = containerRef;
    this.pointsRef = pointsRef;
    this.dinoRef = dinoRef;
    this.dino = new Dino(dinoRef);
    this.dino.run();
    this.time = 60;
    this.elements = [];
    this.timeRef = timeRef;
    this.skyRef = skyRef;
    this.floorRef = floorRef;
    this.audio = new Audio();
  }
  gameLoop() {
    this.procces_user_input();
    this.actualizarJuego();
    this.render();
    if (this.inGame && this.time > 0) {
      this.animationReq = requestAnimationFrame(() => this.gameLoop());
    } else {
      alert("Juego finalizado");
    }
  }
  procces_user_input() {
    document.addEventListener("click", () => {
      this.dino.jump();
    });
  }
  actualizarJuego() {
    this.clearElements();
    this.checkDinoColission();
    this.points++;
  }
  render() {
    this.timeRef.innerHTML = `Time: ${this.time}`;
    this.pointsRef.innerHTML = `Points: ${this.points}`;
  }
  checkDinoColission() {
    let elements = document.querySelectorAll(".element");
    elements.forEach((element) => {
      if (this.checkColission(element)) {
        let type = element.classList[0];
        switch (type) {
          case "meteorite":
            this.meteoriteColission(element);
            break;
          case "star":
            this.starColission(element);
            break;
          case "clock":
            this.clockColission(element);
            break;
          default:
            console.log("error");
            break;
        }
      }
    });
  }
  clockColission(element) {
    this.time += 10;
    this.audio.src = "../sounds/time.mp3";
    this.audio.volume = 0.2;
    this.audio.play();
    element.remove();
  }
  starColission(element) {
    this.points += 50;
    element.remove();
    this.audio.src = "../sounds/coin.mp3";
    this.audio.volume = 0.5;
    this.audio.play();
  }
  meteoriteColission(element) {
    this.dino.die();
    element.remove();
    this.inGame = false;
    cancelAnimationFrame(this.animationReq);
  }
  checkColission(element) {
    let elementPosition = element.getBoundingClientRect();
    let dinoPosition = this.dinoRef.getBoundingClientRect();
    return (
      dinoPosition.left < elementPosition.right &&
      dinoPosition.right > elementPosition.left &&
      dinoPosition.top < elementPosition.bottom &&
      dinoPosition.bottom > elementPosition.top
    );
  }
  clearElements() {
    this.elements = document.querySelectorAll(".element");
    this.elements.forEach((element) => {
      let position = element.getBoundingClientRect();
      if (position.x <= 0) {
        element.remove();
      }
    });
  }
}
