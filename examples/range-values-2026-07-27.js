function rangeValues(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

console.log(rangeValues(3, 7));
