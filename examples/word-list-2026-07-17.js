function wordList(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

console.log(wordList('small sandbox utility'));
