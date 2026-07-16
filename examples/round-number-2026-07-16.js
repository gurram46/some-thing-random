function roundNumber(value, digits = 0) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

console.log(roundNumber(12.3456, 2));
