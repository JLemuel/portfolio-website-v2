import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {
  SiJavascript,
  SiPhp,
  SiReact,
  SiTypescript,
  SiLaravel,
  SiWordpress,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiSupabase,
  SiReactquery,
} from 'react-icons/si'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/myportrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function SkillIcon({ icon: Icon, name }: { icon: any; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon className="h-8 w-8 text-zinc-600 hover:text-teal-500 transition-colors dark:text-zinc-400" />
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{name}</span>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm John Lemuel, a Full-Stack Software Engineer based in the Philippines, specializing in building modern web applications.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="John Lemuel"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm John Lemuel, a Full-Stack Software Engineer based in the Philippines.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              With three years of experience in software development, I've developed a deep understanding of both frontend and backend technologies. Based in the Philippines but working with clients globally, I bring a unique perspective to software development that combines local insights with international standards.
            </p>
            <p>
              I specialize in developing full-stack web applications using modern technologies like React, Next.js, Node.js, and various cloud services. My experience spans from crafting responsive user interfaces to designing efficient backend systems and APIs.
            </p>
            <p>
              Throughout my career, I've had the opportunity to work on diverse projects that have honed my problem-solving abilities and technical expertise. I believe in writing clean, maintainable code and implementing best practices that make applications not just functional, but scalable and future-proof.
            </p>
            <p>
              Being part of the thriving tech community in the Philippines, I'm passionate about contributing to the growth of the local tech ecosystem while maintaining global standards in software development. When I'm not coding, I enjoy staying up-to-date with the latest tech trends, contributing to open-source projects, and sharing knowledge with the developer community.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Technical Skills
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4">
              <SkillIcon icon={SiJavascript} name="JavaScript" />
              <SkillIcon icon={SiPhp} name="PHP" />
              <SkillIcon icon={SiReact} name="React" />
              <SkillIcon icon={SiTypescript} name="TypeScript" />
              <SkillIcon icon={SiLaravel} name="Laravel" />
              <SkillIcon icon={SiWordpress} name="WordPress" />
              <SkillIcon icon={SiNextdotjs} name="Next.js" />
              <SkillIcon icon={SiTailwindcss} name="Tailwind" />
              <SkillIcon icon={SiMysql} name="MySQL" />
              <SkillIcon icon={SiGit} name="Git" />

            </div>
          </div>

          <div className="mt-12">
            <ul role="list" className="space-y-4">
              <SocialLink href="https://github.com/JLemuel" icon={GitHubIcon}>
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/john-lemuel-nicolas-9287ba163" icon={LinkedInIcon}>
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:johnlemuelnicolas@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                johnlemuelnicolas@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}
