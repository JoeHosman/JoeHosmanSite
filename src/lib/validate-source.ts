import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { projectSchema, careerSchema } from "./content-schema.ts";

/** YAML 1.2 preserves date text, unlike Astro's timestamp-coercing reader. */
export function validateFrontmatter(
  source: string,
  collection: "projects" | "career",
  path: string,
): void {
  try {
    const match = source
      .replace(/^\uFEFF/, "")
      .match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match)
      throw new Error("Missing YAML frontmatter. Copy an entry template.");
    const data = parse(match[1], { schema: "core" });
    const result = (
      collection === "projects" ? projectSchema : careerSchema
    ).safeParse(data);
    if (!result.success)
      throw new Error(
        result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; "),
      );
  } catch (error) {
    throw new Error(
      `${path}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function validateContentSources(root: string): Promise<void> {
  for (const collection of ["career", "projects"] as const) {
    const directory = join(root, "content", collection);
    async function walk(path: string): Promise<void> {
      let entries;
      try {
        entries = await readdir(path, { withFileTypes: true });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
        throw error;
      }
      for (const entry of entries) {
        const file = join(path, entry.name);
        if (entry.isDirectory()) await walk(file);
        else if (entry.isFile() && entry.name.endsWith(".md"))
          validateFrontmatter(await readFile(file, "utf8"), collection, file);
      }
    }
    await walk(directory);
  }
}
