function maskEmail(email) {
  const [name, domain] = email.split('@');
  return `${name[0]}***@${domain}`;
}

console.log(maskEmail('demo@example.com'));
