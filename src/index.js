let request;

const button = document.getElementById("btn")
let turnedOn = false

button.addEventListener('click', e => {

  if (turnedOn) {
    turnedOn = false
    e.currentTarget.textContent = 'Stop'
  } else {
    turnedOn = true;
    e.currentTarget.textContent = 'Start'
  }
})
