function safeParseJson(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

console.log(safeParseJson('{"ok":true}'));
