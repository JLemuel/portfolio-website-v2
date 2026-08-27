import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { pageMetadata } from '@/lib/site'
import { ProjectsClient } from './ProjectsClient'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Selected web development and AI automation projects by John Lemuel — production builds and sample case studies showing what I can build for your team.',
  path: '/projects',
})

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built — and things I can build for you."
      intro="Live client work alongside reference builds. Anything marked Live is shipped and in use; anything marked Sample build is a reference implementation showing how I approach the problem."
    >
      <ProjectsClient />
    </SimpleLayout>
  )
}
