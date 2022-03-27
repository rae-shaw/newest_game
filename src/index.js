let i = 0
let score = 0
let interval = 0
let timer = 1000
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
function clickedDot(val) {
  if (turnedOn) {
    score += val
    scoreTrack.innerHTML = score
    this.remove();
  } else {
    showMenu(true)
  }

}

function createDot() {
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100)
  const leftPosition = getRandomInt(0, width)
  const dotValue = calcValue(dotSize)

  span.setAttribute('class', 'dot')
  span.classList.add("dotty");
  span.style.borderRadius = '50%'
  span.style.position = 'absolute'
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = '#FB6970'
  span.style.borderColor = '#FDB876'
  span.style.borderWidth = '2px'
  span.style.top = '-100px'
  span.style.cursor = 'pointer'
  span.style.left = `${leftPosition}px`
  span.style.overflow = 'inherited'
  span.style.transition =  'opacity 0.5s ease'
  span.addEventListener('click', function () { clickedDot(dotValue) }, 'false')
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
  if (size <= 20) {
    return 10
  }
  if (size <= 40) {
    return 7
  }
  if (size <= 60) {
    return 5
  }
  if (size <= 80) {
    return 3
  }
  return 1
}
