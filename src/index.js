let i = 0
let score = 0
let interval = 0
let timer = 1000
const colors = ['#00bfb2', '#d3273e', '#e56db1', '#41b6e6']
let request

const button = document.getElementById('btn')
const gameArea = document.getElementById('game')
const computedStyles = window.getComputedStyle(gameArea)
const height = parseInt(computedStyles.getPropertyValue('height').replace('px', ''));
const width = parseInt(computedStyles.getPropertyValue('width').replace('px', ''));

const slider = document.getElementById('game-slider')
const sliderLabel = document.getElementById('speed')
const scoreTrack = document.getElementById("score")
let turnedOn = false
let dotValue;

let popUp = document.getElementById("menu");
let flag = false
function showMenu(flag) {
  popUp.classList.toggle("hidden");
};

function getSpeed() {
  const speedInt = parseInt(slider.value)
  const speed = speedInt / 10
  return speed
}

// slider
function setSpeed() {
  sliderLabel.innerHTML = `Speed: ${slider.value}`
}

function move() {
  animateDots()
  request = requestAnimationFrame(move);
}

slider.addEventListener('change', setSpeed);

button.addEventListener('click', e => {
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'Pause'
    interval = setInterval(createDot, 1000)
    request = requestAnimationFrame(move)
  } else {
    turnedOn = false
    e.currentTarget.textContent = 'Start'
    clearInterval(interval)
    request = cancelAnimationFrame(request)
  }
})

// dot
function clickedDot() {
  if (turnedOn) {
    score += dotValue;
    scoreTrack.innerHTML = score
    let dot = this
    this.remove();
  } else {
    showMenu(true)
  }

}

function createDot() {
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100)
  const dotColor = getRandomColor(colors)
  const leftPosition = getRandomInt(0, width)
  dotValue = calcValue(dotSize)

  span.setAttribute('class', 'dot')
  span.classList.add("dotty");
  span.style.borderRadius = '50%'
  span.style.position = 'absolute'
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = dotColor
  span.style.top = '-100px'
  span.style.left = `${leftPosition}px`
  span.style.overflow = 'inherited'
  span.style.transition =  'opacity 0.5s ease'
  span.addEventListener('click', clickedDot)
  gameArea.append(span);
}

let bottomOfGameScreen = height * 1.5;
function animateDots() {
  let pixelIncrement = getSpeed()
  let dots = document.querySelectorAll(".dot")
  dots.forEach((dot) => {
    let currentPosition = parseInt(dot.style.top.slice(0, -2));
    if (currentPosition > bottomOfGameScreen) {
      dot.remove();
    }
    dot.style.top = `${pixelIncrement + currentPosition}px`;
  });
}

function getRandomColor(arr) {
   return arr[Math.floor(Math.random() * arr.length)]
 }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function calcValue(size) {
  return Math.round(11 - (size * 0.1))
}
