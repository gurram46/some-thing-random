function daysBetween(startDate, endDate) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate - startDate) / millisecondsPerDay);
}

console.log(daysBetween(new Date('2026-08-20'), new Date('2026-08-22')));
