function getFileExtension(fileName) {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop() : '';
}

console.log(getFileExtension('notes.txt'));
