function limitText(text, maxLength) {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

console.log(limitText('small sandbox example', 10));
