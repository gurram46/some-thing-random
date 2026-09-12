function uniqueCount(items) {
  return new Set(items).size;
}

console.log(uniqueCount(['a', 'b', 'a', 'c']));
