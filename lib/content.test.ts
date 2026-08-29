import { describe, it, expect } from "vitest";
import { calculateReadTime, extractHeadings, getDisplayDate } from "./content";

describe("calculateReadTime", () => {
  it("rounds up and enforces a 1 min minimum", () => {
    expect(calculateReadTime("word ".repeat(50))).toBe("1 min");
    expect(calculateReadTime("word ".repeat(250))).toBe("2 min");
  });
});

describe("extractHeadings", () => {
  it("extracts ## headings with slugified ids", () => {
    const content =
      "## What the browser receives\n\ntext\n\n## HTML parsing → the DOM";
    expect(extractHeadings(content)).toEqual([
      { text: "What the browser receives", slug: "what-the-browser-receives" },
      { text: "HTML parsing → the DOM", slug: "html-parsing-the-dom" },
    ]);
  });
});

describe("getDisplayDate", () => {
  it("falls back to date when updated is absent", () => {
    expect(
      getDisplayDate({
        title: "x",
        slug: "x",
        readTime: "1 min",
        description: "x",
        published: true,
        date: "2026-08-01",
      }),
    ).toBe("2026-08-01");
  });

  it("prefers updated when present", () => {
    expect(
      getDisplayDate({
        title: "x",
        slug: "x",
        readTime: "1 min",
        description: "x",
        published: true,
        date: "2026-08-01",
        updated: "2026-09-15",
      }),
    ).toBe("2026-09-15");
  });
});
