let request;
let i = 0;

const button = document.getElementById('btn');
const game = document.getElementById('game');
let turnedOn = false


button.addEventListener('click', e => {
  if (turnedOn) {
    turnedOn = false;
    e.currentTarget.textContent = 'Stop';
    startAnimation();
  } else {
    turnedOn = true;
    e.currentTarget.textContent = 'Start';
    stopAnimation();
  }
})


function startAnimation() {
    game.innerHTML += '<div class="absolute w-10 h-10 rounded-full bg-fun-green"></div>'
    requestAnimationFrame(performAnimation);
  }
  function stopAnimation() {
    cancelAnimationFrame(request);
  }

  function performAnimation() {
    request = requestAnimationFrame(performAnimation);
    console.log('request', request);
    console.log(i++);
  }
