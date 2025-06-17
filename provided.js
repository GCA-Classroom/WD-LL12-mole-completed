let lastHole = null;

// Generate random time between min and max
function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Select a random hole that's different from the last one
function getRandomHole(holes) {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const selectedHole = holes[randomIndex];

  if (selectedHole === lastHole) {
    return getRandomHole(holes);
  }

  lastHole = selectedHole;
  return selectedHole;
}