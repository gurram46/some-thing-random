function countTruthy(values) {
  return values.filter(Boolean).length;
}

console.log(countTruthy([0, 1, '', 'ok', null, true]));
