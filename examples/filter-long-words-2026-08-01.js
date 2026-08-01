function filterLongWords(words, minLength) {
  return words.filter((word) => word.length >= minLength);
}

console.log(filterLongWords(['sun', 'moon', 'galaxy'], 5));
