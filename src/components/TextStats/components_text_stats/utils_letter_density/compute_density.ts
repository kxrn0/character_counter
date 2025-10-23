export default function compute_density(text: string) {
  const counts = new Map<string, number>();

  for (let char of text) {
    char = char.toUpperCase();

    if (/[A-Z]/.test(char) === false) continue;

    const count = counts.get(char) || 0;

    counts.set(char, count + 1);
  }

  return Array.from(counts).sort((a, b) => b[1] - a[1]);
}
