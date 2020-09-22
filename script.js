const gameContainer = document.getElementById("gameContainer");
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let ticker = document.getElementById('flips');
let flip = 0;
let matchCardArray = [];
let tryAgain = document.querySelector(".overlay-text-small");





const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



function start() {
  let overlays = Array.from(document.getElementsByClassName('start'));

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible')
    })
  })
}

function gameOver() {
  document.getElementById('game-over-text').classList.add('visible');
  tryAgain.addEventListener('click', () => {
    location.reload();
  })
}



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}


let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //J adds a black-background-color from the get-go
    //in css I added .backface below all the color class for css specificity?
    newDiv.classList.add('backface');
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  start();
}


// TODO: Implement this function!
function handleCardClick(event) {

  if (lockBoard) return;
  if (this === firstCard) return;
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  //J onClick remove target's class backface
  event.target.classList.remove('backface');
  flip++;
  ticker.innerText = flip;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = event.target;
  } else {
    hasFlippedCard = false;
    secondCard = event.target;
    lockBoard = true;

    console.log(firstCard.classList[0])
    if (firstCard.classList[0] === secondCard.classList[0]) {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);

      matchCardArray.push(firstCard.classList[0])
      matchCardArray.push(secondCard.classList[0])

      firstCard = null;
      secondCard = null;
      hasFLippedCard = false;
      lockBoard = false;

      if (matchCardArray.length === COLORS.length) {
        gameOver();
      }
    } else {
      setTimeout(() => {
        firstCard.classList.add('backface');
        secondCard.classList.add('backface');
        lockBoard = false;
      }, 1000);
    };
  };
};

// when the DOM loads
createDivsForColors(shuffledColors);