function padNumber(value, length = 2) {
  return String(value).padStart(length, '0');
}

console.log(padNumber(7));
