import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiLaravel,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiSupabase,
  SiOpenai,
  SiPython,
  SiZapier,
  SiPhp,
  SiWordpress,
} from 'react-icons/si'

import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { N8nIcon, GhlIcon } from '@/components/BrandIcons'
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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-emerald-600 dark:group-hover:fill-emerald-400" />
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

function SkillIcon({
  icon: Icon,
  name,
}: {
  icon: React.ComponentType<{ className?: string }>
  name: string
}) {
  return (
    <div className="group flex flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-emerald-50/60 dark:hover:bg-emerald-500/10">
      <Icon className="h-8 w-8 text-zinc-600 transition-colors group-hover:text-emerald-600 dark:text-zinc-400 dark:group-hover:text-emerald-400" />
      <span className="text-xs text-zinc-600 dark:text-zinc-400">{name}</span>
    </div>
  )
}

const webStack = [
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiReact, name: 'React' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiLaravel, name: 'Laravel' },
  { icon: SiPhp, name: 'PHP' },
  { icon: SiWordpress, name: 'WordPress' },
  { icon: SiMysql, name: 'MySQL' },
  { icon: SiSupabase, name: 'Supabase' },
  { icon: SiGit, name: 'Git' },
]

const aiStack = [
  { icon: SiOpenai, name: 'OpenAI' },
  { icon: N8nIcon, name: 'n8n' },
  { icon: GhlIcon, name: 'GHL' },
  { icon: SiZapier, name: 'Zapier' },
  { icon: SiPython, name: 'Python' },
  { icon: SiSupabase, name: 'Vector DB' },
]

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm John Lemuel, a Full-Stack Engineer and AI Automation Builder based in the Philippines, helping teams ship modern web apps and automate the busywork.",
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
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover ring-1 ring-zinc-900/5 transition duration-500 hover:rotate-0 dark:bg-zinc-800 dark:ring-white/10"
            />
          </div>
        </div>

        <div className="lg:order-first lg:row-span-2">
          <span
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            style={{ animationDelay: '0ms' }}
          >
            Based in the Philippines · Working globally
          </span>
          <h1
            className="mt-5 animate-fade-up text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            style={{ animationDelay: '80ms' }}
          >
            I&apos;m John Lemuel — Full-Stack Engineer and{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              AI Automation Builder
            </span>
            .
          </h1>
          <div
            className="mt-6 animate-fade-up space-y-6 text-base text-zinc-600 dark:text-zinc-400"
            style={{ animationDelay: '180ms' }}
          >
            <p>
              For the last three years I&apos;ve been shipping production web
              apps for clients across the US, Europe, and Asia — building with
              React, Next.js, Laravel, and TypeScript. I care about clean
              architecture, fast load times, and interfaces that feel obvious
              to use.
            </p>
            <p>
              Over the past year I&apos;ve gone deep into AI automation. I build
              GPT-powered workflows, RAG chatbots, and small autonomous agents
              that quietly handle the work nobody wants to do — qualifying
              leads, processing documents, drafting content, answering
              tier-1 support. The stack: OpenAI, LangChain-style RAG over
              Pinecone or Supabase, glued together with n8n, Zapier, or
              hand-rolled Node/Python workers.
            </p>
            <p>
              What I bring is the rare combo: I can ship the polished web app{' '}
              <em>and</em> wire up the AI behind it. No handoffs, no &ldquo;the
              dev says it can&apos;t be done&rdquo; — just the whole thing,
              built and running.
            </p>
            <p>
              When I&apos;m not coding I&apos;m usually exploring new AI tools,
              contributing to open source, and trading notes with other
              builders in the Philippine dev community.
            </p>
          </div>
        </div>

        <Reveal as="div" className="lg:pl-20">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              Web Development
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              My day-to-day toolkit for shipping web apps.
            </p>
            <div className="mt-5 grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5">
              {webStack.map((s) => (
                <SkillIcon key={s.name} icon={s.icon} name={s.name} />
              ))}
            </div>

            <h2 className="mt-10 text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              AI &amp; Automation
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              The stack I reach for to automate workflows and build agents.
            </p>
            <div className="mt-5 grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5">
              {aiStack.map((s) => (
                <SkillIcon key={s.name} icon={s.icon} name={s.name} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <ul role="list" className="space-y-4">
              <SocialLink href="https://github.com/JLemuel" icon={GitHubIcon}>
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/john-lemuel-nicolas-9287ba163"
                icon={LinkedInIcon}
              >
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
        </Reveal>
      </div>
    </Container>
  )
}
