function groupByLength(words) {
  return words.reduce((groups, word) => {
    const length = word.length;
    groups[length] = groups[length] || [];
    groups[length].push(word);
    return groups;
  }, {});
}

console.log(groupByLength(['sun', 'moon', 'sky']));
