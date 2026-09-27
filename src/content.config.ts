import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { careerSchema, projectSchema } from "./lib/content-schema.ts";

export const collections = {
  career: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/career" }),
    schema: careerSchema,
  }),
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/projects" }),
    schema: projectSchema,
  }),
};
