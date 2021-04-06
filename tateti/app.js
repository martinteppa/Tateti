document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#grilla");
  const score = document.querySelector("#score");
  let turnox = "Turno del jugador X: ";
  score.textContent = turnox;
  const jugadorX = document.querySelector("#x");
  const jugadorO = document.querySelector("#o");

  let turnosTotales = 4;
  let turno = true;
  let resultX = [];
  let resultO = [];
  let contX = 0;
  let contO = 0;

  function createBoard() {
    const bot = document.getElementById("boton");
    bot.addEventListener("click", empezar);
    for (let i = 1; i < 10; i++) {
      const square = document.createElement("div");
      square.addEventListener("click", insertar);
      square.setAttribute("id", i);
      square.className = "cuadrado elem" + i; //para darle forma de tateti en css
      grid.appendChild(square);
    }
  }
  function checkGame(arr, jug) {
    if (
      (arr.includes(1) && arr.includes(4) && arr.includes(7)) ||
      (arr.includes(2) && arr.includes(5) && arr.includes(8)) ||
      (arr.includes(3) && arr.includes(6) && arr.includes(9)) ||
      (arr.includes(1) && arr.includes(2) && arr.includes(3)) ||
      (arr.includes(4) && arr.includes(5) && arr.includes(6)) ||
      (arr.includes(7) && arr.includes(8) && arr.includes(9)) ||
      (arr.includes(1) && arr.includes(5) && arr.includes(9)) ||
      (arr.includes(3) && arr.includes(5) && arr.includes(7))
    ) {
      for (i = 1; i < 10; i++) {
        a = document.getElementById(i);
        a.removeEventListener("click", insertar);
      }
      if (jug == "O") {
        contO++;
        jugadorO.textContent = "Cantidad de juegos ganados por O: " + contO;
      } else {
        contX++;
        jugadorX.textContent = "Cantidad de juegos ganados por X: " + contX;
      }
      turnosTotales = 0;
      return (score.textContent = "Ha ganado el jugador: " + jug);
    }
    if (turnosTotales == 0) {
      return (score.textContent = "No hay mas turnos, hay empate");
    }
  }

  function insertar() {
    if (turnosTotales > 0) {
      this.removeEventListener("click", insertar);

      if (turno) {
        turno = !turno; //cambia turno
        this.textContent = "X"; //escribe en el cuadrado la X
        resultX.push(parseInt(this.getAttribute("id"))); //guarda en array el id en forma int
        score.textContent = "Turno del jugador O: ";
        if (resultX.length >= 3) {
          return checkGame(resultX, this.textContent);
        }
      } else {
        turno = !turno;
        this.textContent = "O";
        turnosTotales--;
        resultO.push(parseInt(this.getAttribute("id")));
        score.textContent = turnox;
        if (resultO.length >= 3) {
          return checkGame(resultO, this.textContent);
        }
      }
    } else {
      score.textContent = "No hay mas turnos, hay empate ";
    }
  }
  const empezar = () => {
    if (turnosTotales > 0 && turno) {
      //si al jugador O le queda todavia un turno
      return (score.textContent = "Termine este juego primero." + turnox);
    } else if (turnosTotales > 0 && !turno) {
      return (score.textContent = //si al jugador O le quedan turnos y ademas es su turno
        "Termine este juego primero. Turno del jugador: O");
    } else {
      turnosTotales = 4; //resetea los valores y agrega los eventos a los cuadrados
      resultO = [];
      resultX = [];
      turno = true;
      score.textContent = "Turno del jugador X: ";
      for (i = 1; i < 10; i++) {
        const a = document.getElementById(i);
        a.textContent = " ";
        a.addEventListener("click", insertar);
      }
    }
  };
  createBoard();
});
