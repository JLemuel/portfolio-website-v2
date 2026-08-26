import { type MetadataRoute } from 'next'

import { siteRoutes, siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return siteRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
