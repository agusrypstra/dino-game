import Dino from "./dino.js";
import Clock from "./Clock.js";
import Meteorite from "./Meteorite.js";
import Star from "./Star.js";
export default class GameManager {
  constructor(dinoRef, pointsRef, containerRef, timeRef, menuRef) {
    this.animationReq = null;
    this.inGame = true;
    this.points = 0;
    this.containerRef = containerRef;
    this.pointsRef = pointsRef;
    this.dinoRef = dinoRef;
    this.menuRef = menuRef;
    this.time = 60;
    this.elements = [];
    this.timeRef = timeRef;
    this.dino = new Dino(dinoRef);
    this.start();
  }
  // setea las configuraciones iniciales del juego
  start() {
    this.meteorite = new Meteorite(this.containerRef);
    this.star = new Star(this.containerRef);
    this.clock = new Clock(this.containerRef);
    this.audio = new Audio();
    this.audio.src = "./sounds/soundtrack.mp3";
    this.audio.volume = 0.4;
    this.audio.play();
    this.dino.run();
    setInterval(() => {
      if (this.inGame && this.time > 0) {
        this.meteorite.generateObject();
      }
    }, 2500);
    setInterval(() => {
      if (this.inGame && this.time > 0) {
        this.clock.generateObject();
      }
    }, 10000);
    setInterval(() => {
      if (this.inGame && this.time > 0) {
        this.star.generateObject();
      }
    }, 4500);
    setInterval(() => {
      if (this.inGame) {
        this.time--;
      }
    }, 1000);
  }
  // funcion recursiva que se encarga de modificar el estado de las variables como el tiempo y los puntos
  // ademas comprueba el estado del juego, es decir, comprueba si hubo alguna colison
  gameLoop() {
    this.procces_user_input();
    this.actualizarJuego();
    this.render();
    if (this.inGame && this.time > 0) {
      this.animationReq = requestAnimationFrame(() => this.gameLoop());
    } else {
      this.menuRef.classList.toggle("display-none");
    }
  }
  // procesa la entrada del usuario
  procces_user_input() {
    if (this.inGame) {
      document.addEventListener("click", () => {
        this.dino.jump();
      });
    }
  }
  actualizarJuego() {
    this.clearElements(); // limpia los elementos que ya no estan en pantalla
    this.checkDinoColission(); //comprueba si el dinosaurio golpeó algun elemento
    this.checkTime(); //comprueba que el tiempo sea mayor a 0
    this.points++;
  }
  checkTime() {
    if (this.time <= 0) {
      this.inGame = false;
      this.dino.die();
      cancelAnimationFrame(this.animationReq);
    }
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
  // si el dinosaurio obtiene un clock se le suma tiempo
  clockColission(element) {
    this.time += 10;
    this.clock.sound();
    element.remove();
  }
  // si el usuario alcanza una estrella le da puntos
  starColission(element) {
    this.points += 50;
    this.star.sound();
    element.remove();
  }
  //si el dinosaurio golpea contra un cometa, muere
  meteoriteColission(element) {
    this.meteorite.sound();
    this.endGame(element);
  }
  //fin del juego
  endGame(element) {
    this.dino.die();
    this.inGame = false;
    element.remove();
    this.audio.pause();
    cancelAnimationFrame(this.animationReq);
  }
  //compara la posicion de los divs con la del dino
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
