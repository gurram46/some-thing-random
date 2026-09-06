function objectValues(record) {
  return Object.keys(record).map((key) => record[key]);
}

console.log(objectValues({ one: 1, two: 2 }));
