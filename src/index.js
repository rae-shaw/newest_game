let i = 0
let score = 0
let interval = 0
let timer = 1000
const colors = ['#00bfb2', '#d3273e', '#e56db1', '#41b6e6']

const button = document.getElementById('btn')
const gameArea = document.getElementById('game')
const slider = document.getElementById('game-slider')
const output = document.getElementById('speed')
const scoreTrack = document.getElementById("score")
let turnedOn = false
const dots = () => {
  document.getElementsByClassName('.dot')
}

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
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100).toString()
  const dotColor = getRanItemFromArr(colors)
  console.log(dotColor)
  span.setAttribute = ('class', 'dot')
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = dotColor
  span.style.borderRadius = '50%'
  span.style.top = '10px';
  span.style.left = '10px';
  span.addEventListener('click', clickedDot)
  gameArea.append(span);
}
function getRandomColor(arr) {
   return arr[Math.floor(Math.random() * arr.length)]
 }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

