function compactArray(values) {
  return values.filter(Boolean);
}

console.log(compactArray(['alpha', '', null, 'beta', 0, 'gamma']));
