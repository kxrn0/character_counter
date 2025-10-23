export default function count_sentences(text: string) {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.trim() !== "")
    .length.toString()
    .padStart(2, "0");
}
