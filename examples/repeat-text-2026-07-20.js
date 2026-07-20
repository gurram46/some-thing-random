function repeatText(text, count) {
  return Array.from({ length: count }, () => text).join('');
}

console.log(repeatText('go', 3));
