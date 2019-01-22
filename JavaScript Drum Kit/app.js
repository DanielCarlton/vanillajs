// Play Sound
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return; // Stop null in console

  key.classList.add('playing'); // Add transition animation

  audio.currentTime = 0; // Allows for key spam
  audio.play();
}

// Remove Transition
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;

  this.classList.remove('playing');
}

// Event Listeners
window.addEventListener('keydown', playSound);
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
