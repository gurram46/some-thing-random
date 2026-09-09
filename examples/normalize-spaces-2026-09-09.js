function normalizeSpaces(text) {
  return text.trim().replace(/\s+/g, ' ');
}

console.log(normalizeSpaces(' small   sandbox   example '));
