function sortAscending(numbers) {
  return [...numbers].sort((a, b) => a - b);
}

console.log(sortAscending([4, 1, 3, 2]));
