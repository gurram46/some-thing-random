function averageValues(numbers) {
  if (!numbers.length) return 0;
  return numbers.reduce((total, value) => total + value, 0) / numbers.length;
}

console.log(averageValues([2, 4, 6, 8]));
