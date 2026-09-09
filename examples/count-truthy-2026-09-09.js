function countTruthy(items) {
  return items.filter(Boolean).length;
}

console.log(countTruthy([0, 1, '', 'ok', null, true]));
