function numberSign(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'zero';
}

console.log(numberSign(-4));
