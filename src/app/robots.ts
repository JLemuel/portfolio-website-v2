import { type MetadataRoute } from 'next'

import { siteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The contact endpoint and the post-submit page have nothing to index.
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
