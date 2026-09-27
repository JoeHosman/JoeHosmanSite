/** Inclusive bounds preserve uncertainty when a career date contains only a year. */
export function careerDateBounds(value: string): {
  first: number;
  last: number;
} {
  if (!/^\d{4}(-\d{2})?$/.test(value))
    throw new Error("Use YYYY or YYYY-MM for career dates.");
  const [year, month] = value.split("-").map(Number);
  if (
    year < 1000 ||
    year > 9999 ||
    (month !== undefined && (month < 1 || month > 12))
  )
    throw new Error("Invalid career date.");
  return {
    first: Date.UTC(year, (month ?? 1) - 1, 1),
    last: Date.UTC(year, month ?? 12, 0, 23, 59, 59, 999),
  };
}

export function formatCareerDate(value: string): string {
  if (!value) return "Present";
  const { first } = careerDateBounds(value);
  if (value.length === 4) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(first);
}

export function formatProjectDate(value: Date | string): string {
  if (typeof value === "string") return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}
