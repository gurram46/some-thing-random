function isEmptyArray(items) {
  return Array.isArray(items) && items.length === 0;
}

console.log(isEmptyArray([]));
