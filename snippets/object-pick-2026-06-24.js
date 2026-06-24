function pickKeys(source, keys) {
  return keys.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = source[key];
    }
    return result;
  }, {});
}

console.log(pickKeys({ name: 'demo', type: 'note', skip: true }, ['name', 'type']));
