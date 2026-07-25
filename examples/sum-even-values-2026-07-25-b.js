function sumEvenValues(numbers) {
  return numbers
    .filter((number) => number % 2 === 0)
    .reduce((total, number) => total + number, 0);
}

console.log(sumEvenValues([1, 2, 3, 4, 5, 6]));
