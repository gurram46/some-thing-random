function filterNumbers(values) {
  return values.filter((value) => typeof value === 'number');
}

console.log(filterNumbers([1, 'two', 3, null]));
