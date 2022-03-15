let request;
let i = 0;

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

const slider = document.getElementById("game-slider");
const output = document.getElementById("speed");
output.innerHTML = slider.value; // Display the default slider value

slider.oninput = function() {
  output.innerHTML = this.value;
}

// const diameter = 10 + Math.floor(Math.random() * 41);

const diameter = 50
const xPosition = 10
const yPosition = 10

function startAnimation() {
  console.log(diameter)
    game.innerHTML += '<div class="absolute w-10 h-10 rounded-full bg-fun-green"></div>'
    requestAnimationFrame(performAnimation)
  }
function stopAnimation() {
    game.innerHTML = ''
    cancelAnimationFrame(request)
  }

  function performAnimation() {
    request = requestAnimationFrame(performAnimation)
  }

  // logs for slider
  // points increase when clicking dot
  // points only increase when in moving state
  // dot "pops" when clicked on
  // inline styles/using variable for dot in innerHTML
  // dots appear @top
  // dots appear with random sizes
  // dots move down from top to bottom (tailwind animation config?)
