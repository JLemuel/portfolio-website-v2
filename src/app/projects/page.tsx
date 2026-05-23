import { type Metadata } from 'next'
import Link from 'next/link'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiReact,
  SiMysql,
  SiWordpress,
  SiOpenai,
  SiPython,
  SiZapier,
  SiSupabase,
  SiTwilio,
  SiStripe,
} from 'react-icons/si'
import { HiSparkles, HiCode } from 'react-icons/hi'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Reveal } from '@/components/Reveal'

type Tech = { icon: React.ComponentType<{ className?: string }>; name: string }

type Project = {
  name: string
  category: 'AI Automation' | 'Web Development'
  description: string
  highlights: string[]
  link: { href: string; label: string }
  technologies: Tech[]
  status?: 'Live' | 'Case study' | 'Sample build'
}

const projects: Project[] = [
  {
    name: 'AI Customer Support Agent',
    category: 'AI Automation',
    status: 'Sample build',
    description:
      'A RAG-powered support chatbot grounded on the client\'s help docs and product data. Handles tier-1 questions 24/7 and escalates complex cases to a human with full context.',
    highlights: [
      'Deflects ~70% of repeat support tickets',
      'Pinecone vector search over docs + FAQs',
      'Embeddable widget for any Next.js site',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiSupabase, name: 'Supabase' },
      { icon: SiTypescript, name: 'TypeScript' },
    ],
  },
  {
    name: 'Lead Qualification Pipeline',
    category: 'AI Automation',
    status: 'Sample build',
    description:
      'An end-to-end workflow that captures inbound leads, enriches them, scores intent with GPT-4, and routes hot leads straight to the sales rep in Slack with a tailored opening message.',
    highlights: [
      'Replaces ~10 hrs/week of manual triage',
      'n8n workflow + OpenAI scoring + HubSpot sync',
      'Slack alerts with AI-drafted reply',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiZapier, name: 'n8n / Zapier' },
      { icon: SiPython, name: 'Python' },
    ],
  },
  {
    name: 'Content Repurposing Engine',
    category: 'AI Automation',
    status: 'Sample build',
    description:
      'Turn one long-form input (blog post, podcast transcript, YouTube video) into LinkedIn posts, Twitter threads, and an email newsletter in under 60 seconds — all in your brand voice.',
    highlights: [
      '1 input → 6+ ready-to-publish assets',
      'Brand voice locked via fine-tuned system prompt',
      'Drafts land in Notion + Buffer for approval',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiZapier, name: 'Zapier' },
    ],
  },
  {
    name: 'Voice AI Receptionist',
    category: 'AI Automation',
    status: 'Sample build',
    description:
      'A 24/7 voice agent that picks up missed calls for service businesses, answers FAQs, books appointments straight to Google Calendar, and texts a summary to the owner.',
    highlights: [
      'Twilio + OpenAI Realtime API',
      'Captures bookings while you sleep',
      'Handoff to human after 2 failed attempts',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiTwilio, name: 'Twilio' },
      { icon: SiPython, name: 'Python' },
    ],
  },
  {
    name: 'Tough Cookies — Meal Prep Service',
    category: 'Web Development',
    status: 'Live',
    description:
      "Led the frontend rebuild of Boston's premier meal prep service from WordPress to a modern stack. Translated Figma designs into a responsive, performant storefront serving thousands of customers.",
    highlights: [
      'WordPress → React/Laravel migration',
      'Improved page speed by ~40%',
      'Pixel-perfect Figma implementation',
    ],
    link: { href: 'https://toughcookies.co/', label: 'toughcookies.co' },
    technologies: [
      { icon: SiReact, name: 'React' },
      { icon: SiLaravel, name: 'Laravel' },
      { icon: SiWordpress, name: 'WordPress' },
      { icon: SiTailwindcss, name: 'Tailwind' },
    ],
  },
  {
    name: 'JobTrack Plus — Field Service SaaS',
    category: 'Web Development',
    status: 'Live',
    description:
      'A comprehensive SaaS platform for service-based businesses. Job scheduling, customer management, invoicing, and team collaboration — all in one place.',
    highlights: [
      'End-to-end Laravel + React build',
      'Stripe billing & subscription tiers',
      'Multi-tenant architecture',
    ],
    link: { href: 'https://jobtrackplus.com/', label: 'jobtrackplus.com' },
    technologies: [
      { icon: SiLaravel, name: 'Laravel' },
      { icon: SiReact, name: 'React' },
      { icon: SiMysql, name: 'MySQL' },
      { icon: SiStripe, name: 'Stripe' },
    ],
  },
  {
    name: 'Portfolio Website',
    category: 'Web Development',
    status: 'Live',
    description:
      'This site — a modern, responsive personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Server-rendered, dark mode, and tuned for Core Web Vitals.',
    highlights: [
      'Next.js App Router + Server Components',
      'Dark mode with next-themes',
      'Lighthouse 100 on key metrics',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'github.com/JLemuel' },
    technologies: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiTailwindcss, name: 'Tailwind' },
    ],
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const isAI = project.category === 'AI Automation'
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-400/40">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105 ${
            isAI
              ? 'bg-emerald-500 text-white'
              : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
          }`}
        >
          {isAI ? (
            <HiSparkles className="h-5 w-5" />
          ) : (
            <HiCode className="h-5 w-5" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isAI
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {project.category}
          </span>
          {project.status && (
            <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {project.status}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {project.name}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400"
            title={tech.name}
          >
            <tech.icon className="h-4 w-4" />
            <span className="text-xs font-medium">{tech.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-1 items-end">
        <Link
          href={project.link.href}
          className="inline-flex items-center text-sm font-medium text-zinc-700 transition group-hover:text-emerald-600 dark:text-zinc-300 dark:group-hover:text-emerald-400"
        >
          <LinkIcon className="h-5 w-5 flex-none" />
          <span className="ml-2">{project.link.label}</span>
        </Link>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected web development and AI automation projects by John Lemuel — production builds and sample case studies showing what I can build for your team.',
}

export default function Projects() {
  const aiProjects = projects.filter((p) => p.category === 'AI Automation')
  const webProjects = projects.filter((p) => p.category === 'Web Development')

  return (
    <SimpleLayout
      title="Things I've built — and things I can build for you."
      intro="A mix of live client work and sample case studies that show how I approach real problems. The AI automation projects below are reference builds you can hire me to adapt for your team."
    >
      <section>
        <Reveal className="flex items-center gap-3">
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-emerald-500 px-3 text-xs font-semibold text-white">
            <HiSparkles className="h-3.5 w-3.5" />
            AI Automation
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">
            Sample builds I can adapt for your workflow
          </span>
        </Reveal>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {aiProjects.map((project, i) => (
            <Reveal as="li" key={project.name} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <Reveal className="flex items-center gap-3">
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-zinc-900 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
            <HiCode className="h-3.5 w-3.5" />
            Web Development
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">
            Production work shipped to real users
          </span>
        </Reveal>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {webProjects.map((project, i) => (
            <Reveal as="li" key={project.name} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal
        as="section"
        className="mt-20 rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
            Have a workflow that&apos;s eating your team&apos;s time?
          </h3>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            I build custom AI automations and web apps that pay for themselves
            in hours saved. Tell me about your bottleneck — first call is free.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Start a conversation
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Reveal>
    </SimpleLayout>
  )
}
