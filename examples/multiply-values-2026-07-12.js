function multiplyValues(numbers) {
  return numbers.reduce((total, value) => total * value, 1);
}

console.log(multiplyValues([2, 3, 4]));
