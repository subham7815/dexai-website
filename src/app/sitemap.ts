import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { FEATURE_SLUGS } from "@/lib/content/features";
import { INTEGRATION_SLUGS } from "@/lib/content/integrations";
import { PRODUCT_SLUGS } from "@/lib/content/product";
import { SOLUTION_SLUGS } from "@/lib/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/product",
    ...PRODUCT_SLUGS.map((s) => `/product/${s}`),
    "/solutions",
    ...SOLUTION_SLUGS.map((s) => `/solutions/${s}`),
    "/features",
    ...FEATURE_SLUGS.map((s) => `/features/${s}`),
    "/integrations",
    ...INTEGRATION_SLUGS.map((s) => `/integrations/${s}`),
    "/product/agentic-ai",
    "/product/data-migration",
    "/technology",
    "/case-studies",
    "/customer-stories",
    "/resources",
    "/resources/documentation",
    "/resources/ai-insights",
    "/resources/faqs",
    "/demo",
    "/why-dexai",
    "/security",
  ];
  return paths.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
