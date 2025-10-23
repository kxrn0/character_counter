export default function count_chars(text: string, excludeSpaces: boolean) {
  if (excludeSpaces === false) return text.length;

  let count = 0;

  for (const char of text) if (/\s/.test(char) === false) count++;

  return count;
}
