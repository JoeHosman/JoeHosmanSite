import { z } from "zod";
import { careerDateBounds } from "./dates.ts";

const text = z.string().trim().min(1);
const careerDate = z.string().refine((value) => {
  try {
    careerDateBounds(value);
    return true;
  } catch {
    return false;
  }
}, "Use a valid quoted year (2020) or year-month (2020-09).");
const projectDate = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)])
  .transform((value, ctx) => {
    const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
    if (
      !Number.isFinite(date.getTime()) ||
      (typeof value === "string" && date.toISOString().slice(0, 10) !== value)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Use a real calendar date in YYYY-MM-DD format.",
      });
      return z.NEVER;
    }
    return date;
  });

export const projectSchema = z
  .object({
    title: text,
    summary: text,
    date: projectDate,
    categories: z
      .array(text)
      .min(1)
      .transform((values) => [...new Set(values)]),
    status: z.enum(["idea", "in-progress", "completed", "paused"]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    cover: z.string().trim().default(""),
    cover_alt: z.string().trim().default(""),
  })
  .refine((entry) => !entry.cover || Boolean(entry.cover_alt), {
    message: "Describe the cover image in cover_alt.",
    path: ["cover_alt"],
  });

export const careerSchema = z
  .object({
    company: text,
    role: text,
    summary: text,
    start: careerDate,
    end: z.union([z.literal(""), careerDate]).default(""),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  })
  .refine(
    (entry) => {
      if (!entry.end) return true;
      // Field refinements report malformed dates; range checks must not throw first.
      try {
        return (
          careerDateBounds(entry.start).first <=
          careerDateBounds(entry.end).last
        );
      } catch {
        return true;
      }
    },
    { message: "End date cannot be before the start date.", path: ["end"] },
  );
