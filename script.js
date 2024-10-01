// Game script  
const goat = document.getElementById('goat');  
const leaf = document.getElementById('leaf');  
const bike = document.getElementById('bike');  
const scoreDisplay = document.getElementById('score');  

// Audio elements
const leafSound = document.getElementById('leaf-sound');
const bikeSound = document.getElementById('bike-sound');

let score = 0;  
let goatPosition = 125; // Starting position of the goat  
let gameInterval;  
let gameSpeed = 5; // Speed of object movement

// Mobile touch support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchmove', (event) => {
  touchEndX = event.touches[0].clientX;
  let touchDifference = touchEndX - touchStartX;
  
  if (touchDifference < -20 && goatPosition > 0) {  // Swipe left
    goatPosition -= 20;
  } else if (touchDifference > 20 && goatPosition < 250) {  // Swipe right
    goatPosition += 20;
  }
  goat.style.left = `${goatPosition}px`;
});

// Goat Movement for desktop (keyboard controls)
document.addEventListener('keydown', (event) => {  
  if (event.key === 'ArrowLeft' && goatPosition > 0) {  
    goatPosition -= 20;  
  } else if (event.key === 'ArrowRight' && goatPosition < 250) {  
    goatPosition += 20;  
  }  
  goat.style.left = `${goatPosition}px`;  
});  

// Game Start  
function startGame() {  
  // Place initial objects randomly  
  resetObject(leaf, 'leaf');  
  resetObject(bike, 'bike');  

  gameInterval = setInterval(() => {  
    moveObject(leaf, 'leaf');  
    moveObject(bike, 'bike');  
    checkCollision();  
  }, 20); // Adjust the interval for game speed  
}  

// Object Movement  
function moveObject(object, type) {  
  let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));  

  if (objectTop >= 600) { // If object goes off the screen, reset it  
    resetObject(object, type);  
  } else {  
    object.style.top = `${objectTop + gameSpeed}px`;  
  }  
}  

// Object Reset  
function resetObject(object, type) {  
  object.style.top = '-50px'; // Start off screen at the top  
  object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position  
}  

// Collision Detection  
function checkCollision() {  
  let goatRect = goat.getBoundingClientRect();  
  let leafRect = leaf.getBoundingClientRect();  
  let bikeRect = bike.getBoundingClientRect();  

  // Check collision with leaf  
  if (goatRect.left < leafRect.right &&  
    goatRect.right > leafRect.left &&  
    goatRect.top < leafRect.bottom &&  
    goatRect.bottom > leafRect.top) {  
    score++;  
    scoreDisplay.textContent = score;  
    resetObject(leaf, 'leaf');  
    
    // Play leaf collection sound
    leafSound.play();
  }  

  // Check collision with bike  
  if (goatRect.left < bikeRect.right &&  
    goatRect.right > bikeRect.left &&  
    goatRect.top < bikeRect.bottom &&  
    goatRect.bottom > bikeRect.top) {  
    clearInterval(gameInterval);  
    
    // Play bike collision sound
    bikeSound.play();
    
    alert('Game Over! Your Score: ' + score);  
    window.location.reload();  
  }  
}  

// Start the game  
startGame();
