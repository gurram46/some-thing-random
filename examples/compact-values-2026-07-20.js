function compactValues(items) {
  return items.filter((item) => item !== null && item !== undefined);
}

console.log(compactValues([1, null, 2, undefined, 3]));
