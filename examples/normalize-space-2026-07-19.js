function normalizeSpace(text) {
  return text.trim().replace(/\s+/g, ' ');
}

console.log(normalizeSpace('  small   sandbox   example  '));
