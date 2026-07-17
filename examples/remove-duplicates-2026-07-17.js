function removeDuplicates(items) {
  return [...new Set(items)];
}

console.log(removeDuplicates(['a', 'b', 'a', 'c']));
