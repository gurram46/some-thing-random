function summarizeArray(items) {
  return {
    count: items.length,
    first: items[0] ?? null,
    last: items.length ? items[items.length - 1] : null,
  };
}

console.log(summarizeArray(['alpha', 'beta', 'gamma']));
