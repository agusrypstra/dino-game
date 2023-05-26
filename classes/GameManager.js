import Dino from "./dino.js";

export default class GameManager {
  constructor(dinoRef, pointsRef, containerRef) {
    this.animationReq;
    this.inGame = true;
    this.obstacles = [];
    this.stars = [];
    this.points = 0;
    this.containerRef = containerRef;
    this.pointsRef = pointsRef;
    this.dinoRef = dinoRef;
    this.dino = new Dino(dinoRef);
    this.dino.run();
  }

  render() {
    this.pointsRef.innerHTML = `Points: ${this.points}`;
  }
  procces_user_input() {
    document.addEventListener("click", () => {
      this.dino.jump();
    });
  }
  endGameValidation() {
    for (const meteorite of this.obstacles) {
      let dinoPosition = this.dinoRef.getBoundingClientRect();
      let meteoritePosition = meteorite.getBoundingClientRect();
      if (this.checkIfMeteoriteTouchDino(dinoPosition, meteoritePosition)) {
        this.inGame = false;
        this.dino.die();
        cancelAnimationFrame(this.animationReq);
        alert("You lose");
      }
    }
  }
  checkIfMeteoriteTouchDino(dinoPosition, meteoritePosition) {
    return (
      dinoPosition.left < meteoritePosition.right &&
      dinoPosition.right > meteoritePosition.left &&
      dinoPosition.top < meteoritePosition.bottom &&
      dinoPosition.bottom > meteoritePosition.top
    );
  }
  generateMeteorite() {
    let meteorite = document.createElement("div");
    meteorite.className = "meteorite";
    let posY = Math.floor(
      Math.random() *
        (this.containerRef.offsetHeight / 2 -
          (this.containerRef.offsetHeight - 150)) +
        this.containerRef.offsetHeight -
        150
    );
    meteorite.style.top = posY + "px";
    this.containerRef.appendChild(meteorite);
    this.obstacles.push(meteorite);
  }
  verificarObstaculos() {
    for (var i = 0; i < this.obstacles.length; i++) {
      var obstacle = this.obstacles[i];
      var obstacleRect = obstacle.getBoundingClientRect();
      var containerRect = this.containerRef.getBoundingClientRect();
      // Verifica si el obstáculo ha pasado de cierta posición en el eje  Y
      if (obstacleRect.right < containerRect.left) {
        this.containerRef.removeChild(obstacle); // Elimina el obstáculo del contenedor
        this.obstacles.splice(i, 1); // Elimina el obstáculo del array
        i--; // Actualiza el índice para evitar saltar elementos
      }
    }
  }
  procces_user_input() {
    document.addEventListener("click", () => {
      this.dino.jump();
    });
  }
  gameLoop() {
    this.procces_user_input();
    this.endGameValidation();
    this.verificarObstaculos();
    this.render();

    if (this.inGame) {
      this.animationReq = requestAnimationFrame(this.gameLoop);
    } else {
      alert("Juego finalizado");
    }
  }
}
