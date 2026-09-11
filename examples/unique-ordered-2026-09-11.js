function uniqueKeepingOrder(values) {
  const seen = new Set();
  return values.filter((v) => {
    if (seen.has(v)) return false;
    seen.add(v);
    return true;
  });
}

console.log(uniqueKeepingOrder([3, 1, 3, 2, 1]));
