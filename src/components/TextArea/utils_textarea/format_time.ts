export default function format_time(minutes: number) {
  minutes = Number(minutes.toFixed(2));

  if (minutes === 0) return "0 minutes";
  else if (minutes < 1) return "< 1 minute";
  else if (minutes === 1) return "one minute";
  else if (minutes < 60) return `${minutes} minutes`;

  const hours = minutes / 60;

  if (hours < 24) return `${hours.toFixed(2)} hours`;

  const days = hours / 24;

  return `${days.toFixed(2)} days`;
}
