export function isJapanese(text: string) {
  const japaneseRegex = /[\u3040-\u30FF\u4E00-\u9FAF\uFF66-\uFF9F]+/;
  return japaneseRegex.test(text);
}

// Usage
console.log(isJapanese("こんにちは")); // true (Japanese)
console.log(isJapanese("Hello")); // false (Not Japanese)
console.log(isJapanese("サンプル")); // true (Japanese Katakana)
