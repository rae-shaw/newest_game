//_______________________________________________________//
//   initatiate variables used to track  game elements   //
//_______________________________________________________//

// track score, start at 0
let score = 0

// track interval for dot creation
let interval = 0

// track whether the game is running or not
let turnedOn = false

// tracks ///////////////////////
let request

// get the elements on the screen to use and manipulate
const gameArea = document.getElementById('game')
const button = document.getElementById('btn')
const resetGame = document.getElementById('reset')
const popUp = document.getElementById('menu')
const scoreTrack = document.getElementById('score')
const slider = document.getElementById('game-slider')
const sliderLabel = document.getElementById('speed')

// compute values to use in dot creation and dot animation
const computedStyles = window.getComputedStyle(gameArea)
const height = parseInt(
  computedStyles.getPropertyValue('height').replace('px', '')
)
const width = parseInt(
  computedStyles.getPropertyValue('width').replace('px', '')
)

document.addEventListener('visibilitychange', clearInterval(interval))

// on click action
button.addEventListener('click', (e) => {
  // when the button is clicked to start the game, the following happens:
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'PAUSE'
    interval = setInterval(createDot, 1000)
    request = requestAnimationFrame(move)
    popUp.classList.add('hidden')
  } else {
    // when the button is clicked to pause the game, the following happens:
    turnedOn = false
    e.currentTarget.textContent = 'START'
    clearInterval(interval)
    request = cancelAnimationFrame(request)
    popUp.classList.remove('hidden')
  }
})

resetGame.addEventListener('click', (e) => {
  let dots = document.querySelectorAll('.dot')
  dots.forEach((dot) => {
    dot.remove()
  })
  popUp.classList.add('hidden')
  button.textContent = 'START'
  clearInterval(interval)
  request = cancelAnimationFrame(request)
  score = 0
  turnedOn = false
  slider.value = 0
  scoreTrack.innerHTML = '0'
  sliderLabel.innerHTML = `Speed: ${slider.value}`
})

// recursive function using requestAnimationFrame to slide the dots down the screen
function move() {
  animateDots()
  request = requestAnimationFrame(move)
}

//_______________________________________________________//
//                  slider                               //
//_______________________________________________________//
slider.addEventListener('change', setSpeedText)
function setSpeedText() {
  sliderLabel.innerHTML = `Speed: ${slider.value}`
}

//_______________________________________________________//
//                   dot                                 //
//_______________________________________________________//
// create a dot
function createDot() {
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100)
  const noOverFlow = width - dotSize
  const leftPosition = getRandomInt(0, noOverFlow)
  const dotValue = calcValue(dotSize)

  span.setAttribute('class', 'dot')
  span.style.borderRadius = '50%'
  span.style.position = 'absolute'
  span.style.width = `${dotSize}px`
  span.style.height = `${dotSize}px`
  span.style.backgroundColor = '#FB6970'
  span.style.top = '-100px'
  span.style.cursor = 'pointer'
  span.style.left = `${leftPosition}px`
  span.style.overflow = 'inherited'
  span.addEventListener(
    'click',
    function () {
      clickedDot(this, dotValue)
    },
    'false'
  )
  gameArea.append(span)
}

// action for when a dot is clicked
function clickedDot(el, val) {
  if (turnedOn) {
    score += val
    scoreTrack.innerHTML = score
    el.remove()
  }
}

// move dots down the screen
function animateDots() {
  let dots = document.querySelectorAll('.dot')
  const speed = slider.value
  dots.forEach((dot) => {
    let currentPosition = parseInt(dot.style.top)
    if (currentPosition > height) {
      dot.remove()
    }
    dot.style.transform = `translateY(${speed}px)`
  })
}

// caculate the value of dot based on the size
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

// helper function to get a random size for the
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
