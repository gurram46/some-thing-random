function removeDuplicates(items) {
  return [...new Set(items)];
}

console.log(removeDuplicates(['red', 'blue', 'red', 'green']));
