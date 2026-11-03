import { describe, expect, it } from "vitest";
import { joinCmsUrl } from "./cms";

const BASE = "https://cms.example.com";

describe("joinCmsUrl", () => {
  it("prefixes a relative media path with the CMS base", () => {
    expect(joinCmsUrl(BASE, "/api/media/file/a.jpg")).toBe("https://cms.example.com/api/media/file/a.jpg");
  });

  it("leaves absolute https URLs untouched", () => {
    expect(joinCmsUrl(BASE, "https://cdn.example.com/a.jpg")).toBe("https://cdn.example.com/a.jpg");
  });

  it("leaves protocol-relative //cdn URLs untouched", () => {
    expect(joinCmsUrl(BASE, "//cdn.example.com/a.jpg")).toBe("//cdn.example.com/a.jpg");
  });

  it("returns undefined for null/undefined/empty", () => {
    expect(joinCmsUrl(BASE, null)).toBeUndefined();
    expect(joinCmsUrl(BASE, undefined)).toBeUndefined();
    expect(joinCmsUrl(BASE, "")).toBeUndefined();
  });

  it("yields exactly one slash for a base with trailing slash", () => {
    expect(joinCmsUrl(`${BASE}/`, "/api/media/file/a.jpg")).toBe("https://cms.example.com/api/media/file/a.jpg");
  });
});
