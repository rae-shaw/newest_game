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
const popUp = document.getElementById("menu")
const scoreTrack = document.getElementById("score")
const slider = document.getElementById('game-slider')
const sliderLabel = document.getElementById('speed')

// compute values to use in dot creation and dot animation
const computedStyles = window.getComputedStyle(gameArea)
const height = parseInt(computedStyles.getPropertyValue('height').replace('px', ''))
const bottomOfGameScreen = height * 1.5;
const width = parseInt(computedStyles.getPropertyValue('width').replace('px', ''))

// on click action
button.addEventListener('click', e => {
  // when the button is clicked to start the game, the following happens:
  console.log(turnedOn)
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'PAUSE'
    popUp.classList.add("hidden")
    animate([
      {
        time: 2,
        run: function() {
          let currentPosition = parseInt(dot.style.top.slice(0, -2))
            if (currentPosition > bottomOfGameScreen) {
              dot.remove()
            }
            dot.style.top = `${pixelIncrement + currentPosition}px`
        }
      }
    ]);
  } else {
    // when the button is clicked to pause the game, the following happens:
    turnedOn = false
    e.currentTarget.textContent = 'START'
    popUp.classList.remove("hidden")
  }
})


//_______________________________________________________//
//                  slider                               //
//_______________________________________________________//
// slider.addEventListener('change', setSpeedText)
// function setSpeedText() {
//   sliderLabel.innerHTML = `Speed: ${slider.value}`
// }

//_______________________________________________________//
//                   dot                                 //
//_______________________________________________________//
// create a dot
function createDot() {
  console.log('createDot')
  const span = document.createElement('div')
  const dotSize = getRandomInt(10, 100)
  const leftPosition = getRandomInt(0, width)
  // const dotValue = calcValue(dotSize)

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
  gameArea.append(span)
}


// --- Global

const FRAME_DURATION = 1000 / 60; // 60fps frame duration
const getTime = typeof performance === 'function' ? performance.now : Date.now;
const MAX_POSITION = 575

// ---- Request animation frame with delta fix

const dots = document.querySelector('.dot')


function animate(dots) {
  let item
  let duration
  let end = 0;
  console.log('in animate', item);

  const step = function() {

    let current = +new Date()
    let = remaining = end - current;

    if(remaining < 60) {

      if (item) {
        item.run(1)  //1 = progress is at 100%

        item = dots.shift()  //get the next item
      }

      if(item) {
        duration = item.time*1000;
        end = current + duration;
        item.run(0);  //0 = progress is at 0%
      } else {
        return;
      }

    } else {
      let rate = remaining/duration;
      rate = 1 - Math.pow(rate, 3);  //easing formula
      item.run(rate);
    }

    requestAnimationFrame(step);
  }
  step();
}

button.addEventListener('click', e => {
  // when the button is clicked to start the game, the following happens:
  if (!turnedOn) {
    turnedOn = true
    e.currentTarget.textContent = 'PAUSE'
    popUp.classList.add("hidden")
  } else {
    // when the button is clicked to pause the game, the following happens:
    turnedOn = false
    e.currentTarget.textContent = 'START'
    popUp.classList.remove("hidden")
  }
})
