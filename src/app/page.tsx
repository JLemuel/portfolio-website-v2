import Link from 'next/link'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export default async function Home() {
  
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Building exceptional digital experiences from the Philippines.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm John Lemuel, a Full-Stack Software Engineer passionate about crafting 
            scalable solutions and delivering high-quality web applications. With a focus 
            on clean code and user-centric design, I transform complex challenges into 
            elegant solutions.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/JLemuel"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/john-lemuel-nicolas-9287ba163"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>

    </>
  )
}
