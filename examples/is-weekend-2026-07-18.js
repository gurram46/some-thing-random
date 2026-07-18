function isWeekend(date = new Date()) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

console.log(isWeekend(new Date('2026-07-18')));
