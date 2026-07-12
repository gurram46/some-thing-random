function countVowels(text) {
  return (text.match(/[aeiou]/gi) || []).length;
}

console.log(countVowels('sandbox example'));
