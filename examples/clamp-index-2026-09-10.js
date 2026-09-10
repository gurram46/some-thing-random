function clampIndex(index, length) {
  if (length <= 0) return -1;
  return Math.min(Math.max(index, 0), length - 1);
}

console.log(clampIndex(8, 5));
