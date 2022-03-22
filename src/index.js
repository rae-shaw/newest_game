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
const output = document.getElementById('speed')
const scoreTrack = document.getElementById("score")
let turnedOn = false
let dotValue;

let popUp = document.getElementById("menu");
let flag = false
function showMenu(flag) {
  popUp.classList.toggle("hidden");
};

function getSpeed() {
  return parseInt(slider.value);
}

function move() {
  animateDots()
  request = requestAnimationFrame(move);
}

button.addEventListener('click', e => {
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'Pause'
    interval = setInterval(createDot, timer)
    request = requestAnimationFrame(move)
  } else {
    turnedOn = false
    e.currentTarget.textContent = 'Start'
    clearInterval(interval)
    request = cancelAnimationFrame(request)
  }
})




// slider
output.innerHTML = slider.value;
slider.onInput = function() {
  output.innerHTML = this.value;
}

// dot
function clickedDot() {
  if (turnedOn) {
    score += dotValue;
    scoreTrack.innerHTML = score
    let dot = this
    this.parentNode.removeChild(dot);
  } else {
    showMenu(true)
  }
}

function createDot() {
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100)
  const dotColor = getRandomColor(colors)
  const leftPosition = getRandomInt(0, width)
  const topPosition = 0 - dotSize - getSpeed()
  dotValue = calcValue(dotSize)

  span.classList.add('dot')
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = dotColor
  span.style.top = `${topPosition}px`
  span.style.left = `${leftPosition}px`
  span.addEventListener('click', clickedDot)
  gameArea.append(span);
}

function animateDots() {
  console.log('in animate dots')
 let dots = document.querySelectorAll('.dot')
  const playgroundHeight = gameArea.offsetHeight
  const speed = getSpeed();

  for (var i = 0; i < dots.length; i++) {
    var positionY = parseInt(dots[i].style.top, 10),
        velocity  = positionY += speed;

    if (positionY > playgroundHeight) {
      removeEl(dots[i]);
    }
    dots[i].style.top = velocity + "px";
  }
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

function removeEl(el) {
  el.parentNode.removeChild(el);
}


