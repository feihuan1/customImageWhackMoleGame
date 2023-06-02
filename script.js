let feihuanPipe;
let vitaPipe;
let isGameOver = false;
let score = 0;
let level = 1;

const music = document.querySelector("audio");
const board = document.getElementById("board");
const enemy = document.querySelector("#enemy");
const player = document.getElementById("player");
const final = document.querySelector(".final");
const pop = document.querySelector(".pop");

function playSound(path, vol) {
  let sound = new Audio();
  sound.src = path;
  sound.volume = vol;
  sound.play();
}

board.addEventListener("click", () => {
  if (!isGameOver) {
    music.play();
  } else {
    music.pause();
  }
});

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 16; i++) {
    let tile = document.createElement("div");

    tile.id = i.toString();

    tile.addEventListener("click", (e) => {
      if (isGameOver) {
        return;
      }
      board.style.cursor = "url('./image/hammerdown.png'), auto";
      setTimeout(() => {
        board.style.cursor = "url('./image/hammerup.png'), auto";
      }, 50);
      if (e.target.id === "enemy") {
        playSound("./audio/feihuanhit.mp3", 0.5);
        playSound("./audio/hammerhead.mp3", 0.5);
        score += 10;
        level = Math.floor(score / 100 + 1);
        document.getElementById("level").innerText = level.toString();
        document.getElementById("score").innerText = score.toString();
        e.target.style.transform = "scale(1.5 , 0.3)";
        e.target.style.transformOrigin = "bottom";
        e.target.id = "";
      } else if (e.target.id === "player") {
        playSound("./audio/vitahit.mp3", 0.5);
        playSound("./audio/hammerhead.mp3", 0.5);
        pop.classList.remove("hidden");
        final.innerText = score.toString();
        score < 100
          ? (final.style.color = "red")
          : (final.style.color = "green");
        e.target.style.transform = "scale(1.5 , 0.3)";
        e.target.style.transformOrigin = "bottom";
        isGameOver = true;
        music.pause();
      } else {
        playSound("./audio/hammerpipe.mp3", 0.5);
      }
    });
    board.appendChild(tile);
  }
  setInterval(setFeihuan, 3000 / level);
  setInterval(setVita, 4000 / level);
  setInterval(setFeihuan, 2300 / level);
  setInterval(setVita, 3200 / level);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 16);
  return num.toString();
}

function setFeihuan() {
  if (isGameOver) {
    return;
  }
  let feihuan = document.createElement("img");
  feihuan.id = "enemy";
  if (enemy.files[0]) {
    feihuan.src = URL.createObjectURL(enemy.files[0]);
  } else {
    feihuan.src = "./image/feihuan1.png";
  }
  feihuan.draggable = false;

  let num = getRandomTile();

  feihuanPipe = document.getElementById(num);
  if (feihuanPipe.children.length === 0) {
    feihuanPipe.appendChild(feihuan);
    playSound("./audio/pop.mp3", 0.2);
  }
  setTimeout(() => {
    if (!isGameOver) {
      feihuan.remove();
      playSound("./audio/out.mp3", 0.2);
    }
  }, 2500 / level);
}

function setVita() {
  if (isGameOver) {
    return;
  }

  let vita = document.createElement("img");
  vita.id = "player";
  if (player.files[0]) {
    vita.src = URL.createObjectURL(player.files[0]);
  } else {
    vita.src = "./image/vita.png";
  }
  vita.draggable = false;
  let num = getRandomTile();

  vitaPipe = document.getElementById(num);
  if (vitaPipe.children.length === 0) {
    vitaPipe.appendChild(vita);
    playSound("./audio/pop.mp3", 0.2);
  }

  setTimeout(() => {
    if (!isGameOver) {
      vita.remove();
      playSound("./audio/out.mp3", 0.2);
    }
  }, 2500 / level);
}
