import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogCategories, tools } from "./tools";
import { posts } from "./posts";

const staticRoutes = new Set([
  "/",
  "/calculadoras",
  "/blog",
  "/contacto",
  "/sobre-nosotros",
  "/privacidad",
  "/cookies",
  "/terminos",
  "/aviso-legal",
]);

const validRoutes = new Set([
  ...staticRoutes,
  ...tools.map((tool) => tool.href),
  ...posts.map((post) => `/blog/${post.slug}`),
]);

const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");

function markdownWordCount(content: string) {
  const plainText = content
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/(\*\*|__|~~|\*|_|`|>)/g, "");

  return plainText.trim().split(/\s+/).filter(Boolean).length;
}

describe("blog posts", () => {
  it("uses unique slugs", () => {
    const slugs = posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses categories defined in blogCategories", () => {
    const categories = new Set(blogCategories.map((category) => category.name));
    for (const post of posts) {
      expect(categories.has(post.category), `${post.slug}: ${post.category}`).toBe(true);
    }
  });

  it("references existing related calculators", () => {
    const toolSlugs = new Set(tools.map((tool) => tool.slug));
    for (const post of posts) {
      if (post.relatedToolSlug) {
        expect(toolSlugs.has(post.relatedToolSlug), post.slug).toBe(true);
      }
    }
  });

  it("has valid, non-future publication dates", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const post of posts) {
      const date = new Date(`${post.date}T00:00:00.000Z`);
      expect(post.date, post.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date.toISOString().slice(0, 10), post.slug).toBe(post.date);
      expect(post.date <= today, post.slug).toBe(true);
    }
  });

  it("links only to known internal routes", () => {
    for (const post of posts) {
      const links = [...post.content.matchAll(/\]\((\/[^)\s]+)\)/g)].flatMap((match) =>
        match[1] ? [match[1]] : [],
      );
      for (const link of links) {
        expect(validRoutes.has(link), `${post.slug}: ${link}`).toBe(true);
      }
    }
  });

  it("includes every post in the sitemap", () => {
    for (const post of posts) {
      expect(sitemap).toContain(`<loc>https://finanzasatubolsillo.com/blog/${post.slug}</loc>`);
    }
  });

  it("gives every article at least 1,100 editorial words", () => {
    for (const post of posts) {
      expect(markdownWordCount(post.content), post.slug).toBeGreaterThanOrEqual(1100);
    }
  });

  it("gives every article four to seven FAQ answers", () => {
    for (const post of posts) {
      const faqSection = post.content.match(/## Preguntas frecuentes\s*([\s\S]*?)(?=\n## |$)/);
      const questions = faqSection?.[1]?.match(/^### .+\?$/gm) ?? [];
      expect(questions.length, post.slug).toBeGreaterThanOrEqual(4);
      expect(questions.length, post.slug).toBeLessThanOrEqual(7);
    }
  });
});
