import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: "https://keto-calculator.vercel.app", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  ]
  return routes
}