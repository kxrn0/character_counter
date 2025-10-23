export default function count_words(text: string) {
  return text.split(/\s+/).filter((word) => word !== "").length;
}
