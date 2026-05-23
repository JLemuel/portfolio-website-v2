import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { ProjectsClient } from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected web development and AI automation projects by John Lemuel — production builds and sample case studies showing what I can build for your team.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built — and things I can build for you."
      intro="A mix of live client work and sample case studies that show how I approach real problems. The AI automation projects below are reference builds you can hire me to adapt for your team."
    >
      <ProjectsClient />
    </SimpleLayout>
  )
}
