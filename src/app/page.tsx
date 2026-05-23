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
      className="group rounded-full border border-zinc-200 p-2 transition hover:border-emerald-500 hover:bg-emerald-50/60 dark:border-zinc-800 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10"
      {...props}
    >
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-emerald-600 dark:fill-zinc-400 dark:group-hover:fill-emerald-400" />
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
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
            I build{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
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
              className="bg-zinc-900 px-5 py-2.5 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              See my work
              <ArrowRightIcon className="h-4 w-4 stroke-current" />
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border border-zinc-200 bg-white px-5 py-2.5 hover:border-emerald-500 hover:bg-emerald-50/60 dark:border-zinc-800 dark:bg-transparent dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10"
            >
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
                className="flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                title={tech.name}
              >
                <tech.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-500/60 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-emerald-400/40"
            >
              <div className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
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
              className="group rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-500/60 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-400/40"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
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
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
          >
            Explore featured projects
            <ArrowRightIcon className="h-4 w-4 stroke-current transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </>
  )
}
