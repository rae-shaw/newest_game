// let request;
let i = 0
let score = 0
let interval = 0
let timer = 1000

const button = document.getElementById('btn')
const gameArea = document.getElementById('game')
const slider = document.getElementById('game-slider')
const output = document.getElementById('speed')
const scoreTrack = document.getElementById("score")
let turnedOn = false

button.addEventListener('click', e => {
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'Pause'
    interval = setInterval(game, timer);
  } else {
    turnedOn = false
    e.currentTarget.textContent = 'Start'
    clearInterval(interval);
  }
})

function game() {
  createDot();
}

// slider
output.innerHTML = slider.value;
slider.onInput = function() {
  output.innerHTML = this.value;
}

// dot
function clickedDot() {
  if (turnedOn) {
    score++;
    scoreTrack.innerHTML = score
  } else {
  }
}

function createDot() {
  console.log('in create dot');
  const span = document.createElement('div')
  span.style.width = '100px'
  span.style.height = '100px'
  span.style.backgroundColor = '#00bfb2'
  span.style.borderRadius = '50%'
  span.style.display = 'inline-block'
  span.addEventListener('click', clickedDot)
  console.log(span);
  gameArea.append(span);
}
