import Link from 'next/link'
import {
  SiOpenai,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiLaravel,
  SiTailwindcss,
  SiPython,
  SiZapier,
} from 'react-icons/si'
import { HiSparkles, HiCode, HiLightningBolt } from 'react-icons/hi'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'

function ArrowRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link
      className="group rounded-full border border-zinc-200/70 p-2 transition hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-zinc-700/60 dark:hover:border-indigo-400/60 dark:hover:bg-indigo-500/10"
      {...props}
    >
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-indigo-500 dark:fill-zinc-400 dark:group-hover:fill-indigo-400" />
    </Link>
  )
}

const techStack = [
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiReact, name: 'React' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiLaravel, name: 'Laravel' },
  { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiOpenai, name: 'OpenAI' },
  { icon: SiPython, name: 'Python' },
  { icon: SiZapier, name: 'Zapier' },
]

const stats = [
  { value: '3+', label: 'Years building products' },
  { value: '20+', label: 'Web apps shipped' },
  { value: '15+', label: 'AI workflows automated' },
]

const services = [
  {
    icon: HiCode,
    title: 'Web Development',
    description:
      'Production-grade web apps with Next.js, React, Laravel, and TypeScript — clean architecture, fast load times, accessible UI.',
    tags: ['Next.js', 'React', 'Laravel', 'TypeScript'],
  },
  {
    icon: HiSparkles,
    title: 'AI Automation',
    description:
      'GPT-powered workflows that replace repetitive ops: lead qualification, content repurposing, document processing, support.',
    tags: ['OpenAI', 'n8n', 'Zapier', 'Make'],
  },
  {
    icon: HiLightningBolt,
    title: 'AI Agents & RAG',
    description:
      'Custom chatbots and autonomous agents with retrieval-augmented generation grounded on your data — Pinecone, Supabase, LangChain.',
    tags: ['RAG', 'LangChain', 'Pinecone', 'Vector DB'],
  },
]

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/15"
          />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
              I build{' '}
              <span className="relative inline-block bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                web apps &amp; AI automations
              </span>{' '}
              that move teams forward.
            </h1>

            <p className="mt-6 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              I&apos;m John Lemuel — a Full-Stack Engineer and AI Automation
              Builder based in the Philippines. I help startups and small teams
              ship modern web products and automate the busywork with
              GPT-powered workflows, agents, and integrations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="/projects"
                variant="primary"
                className="bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-violet-700 hover:text-white dark:from-indigo-500 dark:to-violet-600 dark:hover:from-indigo-600 dark:hover:to-violet-700"
              >
                See my work
                <ArrowRightIcon className="h-4 w-4 stroke-current" />
              </Button>
              <Button href="/contact" variant="secondary" className="px-5 py-2.5">
                Hire me
              </Button>
              <div className="ml-1 flex items-center gap-2">
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

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                Working with
              </span>
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  title={tech.name}
                >
                  <tech.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200/70 bg-white/60 p-6 backdrop-blur transition hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-indigo-500/40"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            What I help teams with
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Two specialties, one goal: ship things that work and save your team
            real hours every week.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white p-6 transition hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-500/40"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 opacity-0 blur-2xl transition group-hover:opacity-100"
              />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-indigo-500 dark:text-zinc-300 dark:hover:text-indigo-400"
          >
            Explore featured projects
            <ArrowRightIcon className="h-4 w-4 stroke-current transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </>
  )
}
