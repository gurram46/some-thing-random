function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

console.log(countWords('small sandbox example file'));
