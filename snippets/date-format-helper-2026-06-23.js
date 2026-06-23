function formatDateLabel(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

console.log(formatDateLabel());
