import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/site'

import '@/styles/tailwind.css'
import { satoshi } from '@/styles/fonts'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s — John Lemuel',
    default: siteTitle,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: [
    'Full-Stack Engineer',
    'AI Automation',
    'Next.js',
    'React',
    'Laravel',
    'Shopify',
    'Liquid',
    'WordPress',
    'Philippines',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    title: 'johnlemuel',
    statusBarStyle: 'default',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  url: siteUrl,
  jobTitle: 'Full-Stack Engineer & AI Automation Builder',
  description: siteDescription,
  email: 'mailto:johnlemuelnicolas@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PH',
  },
  sameAs: [
    'https://github.com/JLemuel',
    'https://www.linkedin.com/in/john-lemuel-nicolas-9287ba163',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Laravel',
    'Shopify Liquid',
    'WordPress',
    'AI automation',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        {/* Cookieless, so no consent banner is required. */}
        <Analytics />
      </body>
    </html>
  )
}
