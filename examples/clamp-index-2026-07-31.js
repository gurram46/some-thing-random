function clampIndex(index, length) {
  return Math.max(0, Math.min(index, length - 1));
}

console.log(clampIndex(8, 5));
