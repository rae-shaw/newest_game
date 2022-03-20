let i = 0
let score = 0
let interval = 0
let timer = 1000
const colors = ['#00bfb2', '#d3273e', '#e56db1', '#41b6e6']

const button = document.getElementById('btn')
const gameArea = document.getElementById('game')
const height = gameArea.offsetHeight
const width = gameArea.offsetWidth
var testElements = document.getElementsByClassName('dot');
var testDivs = Array.prototype.filter.call(testElements, function(testElement){
  return testElement.nodeName === 'DIV';
});

const slider = document.getElementById('game-slider')
const output = document.getElementById('speed')
const scoreTrack = document.getElementById("score")
let turnedOn = false
let dotValue;
const dots = () => {
  document.getElementsByClassName('dot')
}

let popUp = document.getElementById("menu");
let flag = false
function showMenu(flag) {
  popUp.classList.toggle("hidden");
};

function getSpeed() {
  return parseInt(output.value, 10);
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
  createDot()
  animateDots()
}

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
  const span = document.createElement('div', {id: "myId", name: "myName"})
  const dotSize = getRandomInt(10, 100).toString()
  const dotColor = getRandomColor(colors)
  const leftPosition = getRandomInt(0, width)
  const topPosition = 0 - dotSize - getSpeed()
  dotValue = calcValue(dotSize)

  span.setAttribute('class', 'dot')
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = dotColor
  span.style.borderRadius = '50%'
  span.style.top = `${topPosition}px`
  span.style.left = `${leftPosition}px`
  span.addEventListener('click', clickedDot)
  gameArea.append(span);
  console.log(span);
}

function animateDots() {
  const dots = document.querySelectorAll('.dot')
  let speed = getSpeed()
  for (let i = 0; i < dots.length; i++) {
    let positionY = parseInt(dots[i].style.top, 10)
    let velocity = positionY += speed
    
    if (positionY > height) {
      let dot = this
      this.parentNode.removeChild(dot);
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


