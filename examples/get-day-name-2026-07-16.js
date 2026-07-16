function getDayName(date = new Date()) {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

console.log(getDayName());
