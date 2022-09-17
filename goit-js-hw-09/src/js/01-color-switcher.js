let startButton = document.querySelector('[data-start]');
let stopButton = document.querySelector('[data-stop]');
startButton.addEventListener('click', startColorChanging);
stopButton.addEventListener('click', stopColorChanging);
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorChanging(e) {
  e.preventDefault();
  startButton.disabled = true;
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChanging(e) {
  e.preventDefault();
  clearTimeout(timerId);
  startButton.disabled = false;
}