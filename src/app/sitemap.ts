import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Three pages, and all of them worth finding. `lastModified` is left off on purpose: a
 * build-time date would tell crawlers the privacy policy changed every deploy, which is
 * the one claim on this site that has to stay true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/support`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
