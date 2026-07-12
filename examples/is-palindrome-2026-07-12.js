function isPalindrome(text) {
  const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}

console.log(isPalindrome('level'));
