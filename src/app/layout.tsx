import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { satoshi } from '@/styles/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s - John Lemuel',
    default: 'John Lemuel - Full-Stack Software Engineer',
  },
  description:
    "I'm John Lemuel, a Full-Stack Software Engineer who transforms complex problems into elegant digital solutions. I specialize in building robust and scalable web applications with modern technologies.",
  appleWebApp: {
    title: 'johnlemuel',
    statusBarStyle: 'default',
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
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
    >
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
