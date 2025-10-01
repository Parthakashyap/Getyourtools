import { MetadataRoute } from 'next'
import { tools, siteConfig } from '@/config/site'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = tools.map((tool) => ({
    url: `${siteConfig.url}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
 
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...toolRoutes,
  ]
}
