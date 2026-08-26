import { type Metadata } from 'next'

import { pageMetadata } from '@/lib/site'

/**
 * The contact page itself is a client component, so its metadata lives here —
 * `metadata` exports are only read from `page.tsx` and `layout.tsx`.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch about a web development or AI automation role, or to scope a project. I reply within 24 hours.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
