function trimValues(values) {
  return values.map((value) => value.trim());
}

console.log(trimValues([' alpha ', ' beta ', ' gamma ']));
