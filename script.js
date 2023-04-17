// elements
const lettersSection = document.querySelector(".letters");
const letters = [...lettersSection.children];
const hangImage = document.querySelector(".hangman");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");

const answerPhrases = [
  "never",
  "how",
  "phone",
  "index",
  "frined",
  "pill",
  "love",
  "hangman",
  "class",
];

// global variables
let randomPhrase = "";
let clicked = [];
let result = "";
let fauls = 0;

function selectRandomPhrase() {
  randomPhrase =
    answerPhrases[Math.floor(Math.random() * answerPhrases.length)];
  letters.forEach((letter) => {
    letter.addEventListener("click", () => buttonHandler(letter));
    window.addEventListener("keydown", keyHandler);
  });
}

function setSpace() {
  const splittedPhrase = randomPhrase.split("");
  const mappedPhrase = splittedPhrase.map((letter) =>
    clicked.includes(letter.toUpperCase()) ? letter : "_"
  );
  result = mappedPhrase.join("");
  guess.innerHTML = `<p>${result}</p>`;
}

function checkIfWin() {
  if (result === randomPhrase) {
    message.children[0].innerText = "Congrats :))))) You Win";
    message.style.display = "block";
    guess.className = "win_answer";
    hangImage.innerHTML = `<img src="assets/winner.png" alt="win"/>`;
  }
}

function checkIfLoose() {
  if (fauls === 6) {
    message.children[0].innerText = "Aw you Lost :(((";
    message.style.display = "block";
    hangImage.innerHTML = `<img src="./assets/hangman6.png" alt="lost" />`;
    guess.innerHTML = `<p class="lost_answer">${randomPhrase}</P`;
  } else if (fauls < 6) {
    hangImage.innerHTML = `<img src="./assets/hangman${fauls}.png" alt="hangman" />`;
  }
}

function letterHandler(letter) {
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
  const index = letters.findIndex((item) => item.id === letter);
  letters[index].classList = "used";

  console.log(clicked);
  if (randomPhrase.includes(letter.toLowerCase())) {
    setSpace();
    checkIfWin();
  } else if (!randomPhrase.includes(letter)) {
    fauls++;
    checkIfLoose();
  }
}

function buttonHandler(letter) {
  letterHandler(letter.innerHTML);
}

function keyHandler(event) {
  console.log(event);
  letterHandler(event.key.toUpperCase());
}

selectRandomPhrase();
setSpace();
