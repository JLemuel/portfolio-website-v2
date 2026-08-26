import { type Metadata } from 'next'

/**
 * Single source of truth for site-wide identity used by metadata, the
 * sitemap, robots, and the generated Open Graph image.
 *
 * NEXT_PUBLIC_SITE_URL should be set in the deployment environment. The
 * fallback keeps local builds and previews working without it.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://johnlemuel.xyz'
).replace(/\/$/, '')

export const siteName = 'John Lemuel'

export const siteTitle =
  'John Lemuel — Full-Stack Engineer & AI Automation Builder'

export const siteDescription =
  "I'm John Lemuel — a Full-Stack Engineer and AI Automation Builder from the Philippines. I help teams ship modern web apps and automate the busywork with GPT-powered workflows, RAG chatbots, and agents."

/**
 * Skills shown as chips on the social share card (the image people see when
 * this site is posted to LinkedIn, Twitter, Slack, etc).
 *
 * EDIT THIS LIST to change what appears — it is plain text, no icons involved,
 * so any label works. Six short labels fit on one row, which is what the card
 * is tuned for; a seventh wraps onto a second row on its own and looks
 * lopsided. Order runs left to right, so lead with whatever matters most for
 * the roles you are targeting.
 */
export const ogSkills = [
  'Next.js',
  'React',
  'TypeScript',
  'Laravel',
  'Shopify',
  'Docker',
]

/**
 * Builds per-page metadata.
 *
 * Page-level `openGraph` / `twitter` objects REPLACE the root layout's rather
 * than merging into them, so the share image and card type have to be repeated
 * on every page or those pages end up with no preview image and downgrade to a
 * small `summary` card. This keeps that in one place.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} — ${siteName}`
  const images = ['/opengraph-image']

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName,
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  }
}

export const siteRoutes = [
  { path: '/', priority: 1, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
]
