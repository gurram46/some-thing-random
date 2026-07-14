function pluralizeWord(word, count) {
  return count === 1 ? word : `${word}s`;
}

console.log(`2 ${pluralizeWord('file', 2)}`);
