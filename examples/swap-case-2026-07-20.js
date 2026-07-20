function swapCase(text) {
  return text
    .split('')
    .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
    .join('');
}

console.log(swapCase('Sandbox'));
