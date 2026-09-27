import { careerDateBounds } from "./dates.ts";

export function visibleEntries<T extends { data: { draft: boolean } }>(
  entries: T[],
  includeDrafts: boolean,
): T[] {
  return entries.filter((entry) => includeDrafts || !entry.data.draft);
}
export function selectHighlights<T extends { data: { featured: boolean } }>(
  sortedEntries: T[],
  limit = 3,
): T[] {
  const featured = sortedEntries.filter((entry) => entry.data.featured);
  return (featured.length ? featured : sortedEntries).slice(0, limit);
}
export function sortCareer<T extends { id: string; data: { start: string } }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) =>
      careerDateBounds(b.data.start).first -
        careerDateBounds(a.data.start).first || a.id.localeCompare(b.id),
  );
}
export function sortProjects<T extends { id: string; data: { date: Date } }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id),
  );
}
export function categoryLabel(category: string): string {
  return category
    .split("-")
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(" ");
}
