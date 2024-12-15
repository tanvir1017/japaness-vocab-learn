export function isJapanese(text: string) {
  const japaneseRegex = /[\u3040-\u30FF\u4E00-\u9FAF\uFF66-\uFF9F]+/;
  return japaneseRegex.test(text);
}
