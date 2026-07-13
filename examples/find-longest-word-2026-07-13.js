function findLongestWord(text) {
  return text.split(' ').reduce((longest, word) => word.length > longest.length ? word : longest, '');
}

console.log(findLongestWord('small sandbox utility example'));
