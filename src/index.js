let request;
let i = 0;
let score = 0;

const button = document.getElementById('btn');
const game = document.getElementById('game');
let turnedOn = false


button.addEventListener('click', e => {
  if (turnedOn) {
    turnedOn = false
    e.currentTarget.textContent = 'Pause'
    startAnimation()
  } else {
    turnedOn = true;
    e.currentTarget.textContent = 'Start'
    stopAnimation()
  }
})

const slider = document.getElementById('game-slider');
const output = document.getElementById('speed');
output.innerHTML = slider.value; 

slider.oninput = function() {
  output.innerHTML = this.value;
}

const scoreTrack = document.getElementById("score")

function clickedIt() {
  score++;
  scoreTrack.innerHTML = score
}


function startAnimation() {
    game.innerHTML += '<div onclick="clickedIt()" class="absolute w-[100px] h-[100px] rounded-full bg-fun-green"></div>'
    requestAnimationFrame(performAnimation)
  }
function stopAnimation() {
    game.innerHTML = ''
    cancelAnimationFrame(request)
  }

  function performAnimation() {
    request = requestAnimationFrame(performAnimation)
  }

  // tailwindcss custom animations: https://tailwindcss.com/docs/animation#using-custom-values
  // tailwindcss arbitrary values: https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
  // css data types: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types
  // points only increase when in moving state
  // dot "pops" when clicked on
  // inline styles/using variable for dot in innerHTML
  // dots appear @top
  // dots appear with random sizes
  // dots move down from top to bottom (tailwind animation config?)
