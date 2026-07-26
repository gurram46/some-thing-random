function sumByKey(items, key) {
  return items.reduce((total, item) => total + item[key], 0);
}

const rows = [
  { count: 2 },
  { count: 5 },
  { count: 3 },
];

console.log(sumByKey(rows, 'count'));
