function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

console.log(clampNumber(12, 0, 10));
