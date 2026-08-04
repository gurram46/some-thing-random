function sumPositive(numbers) {
  return numbers
    .filter((number) => number > 0)
    .reduce((total, number) => total + number, 0);
}

console.log(sumPositive([-2, 4, 6, -1]));
