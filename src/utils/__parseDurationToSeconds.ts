export default function __parseDurationToSeconds(duration: string): number {
  const regex = /^(\d+)([smhd])$/; // Regex to match digits followed by one of s, m, h, or d
  const match = duration.match(regex);

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60; // Convert minutes to seconds
    case "h":
      return value * 3600; // Convert hours to seconds
    case "d":
      return value * 86400; // Convert days to seconds
    default:
      return undefined;
  }
}
