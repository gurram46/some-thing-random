function groupByFirstLetter(words) {
  return words.reduce((groups, word) => {
    const key = word[0].toLowerCase();
    groups[key] = groups[key] || [];
    groups[key].push(word);
    return groups;
  }, {});
}

console.log(groupByFirstLetter(['apple', 'apricot', 'banana']));
