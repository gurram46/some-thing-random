function roundNumber(value, places = 2) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

console.log(roundNumber(12.3456));
