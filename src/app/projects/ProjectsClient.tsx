'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
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
  SiTwilio,
  SiStripe,
  SiNotion,
  SiSlack,
} from 'react-icons/si'
import { HiSparkles, HiCode } from 'react-icons/hi'

import { Reveal } from '@/components/Reveal'
import { N8nIcon, GhlIcon } from '@/components/BrandIcons'

type Tech = { icon: React.ComponentType<{ className?: string }>; name: string }

type Project = {
  name: string
  category: 'AI Automation' | 'Web Development'
  description: string
  highlights: string[]
  link: { href: string; label: string }
  technologies: Tech[]
  status?: 'Live' | 'Case study' | 'Sample build'
  caseStudy?: {
    problem: string
    solution: string
    outcome: string
  }
}

const projects: Project[] = [
  {
    name: 'Content Repurposing Engine',
    category: 'AI Automation',
    status: 'Case study',
    description:
      'A Zapier workflow that turns one long-form piece (blog post, podcast transcript, video) into a LinkedIn post, X thread, newsletter intro, and 3 quote captions — all in brand voice, all dropped into Notion for human approval.',
    highlights: [
      'Notion → Zapier → 4× GPT-4o-mini → Notion drafts DB',
      '6+ ready-to-publish assets in under 60 seconds',
      'Brand voice locked via a shared system-prompt preamble',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: SiZapier, name: 'Zapier' },
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiNotion, name: 'Notion' },
    ],
    caseStudy: {
      problem:
        'Content teams produce one strong long-form asset, then spend two days manually chopping it into LinkedIn posts, X threads, and newsletter blurbs. Distribution is where the reach lives — and it always slips.',
      solution:
        'A Zapier workflow watches a Notion "Source Content" database. The moment a row flips to Ready, four parallel GPT-4o-mini calls generate platform-native variations in the brand\'s voice (LinkedIn post, X thread, newsletter intro, 3 quote captions) and drop them into a "Generated Drafts" database for human approval. A single shared brand-voice preamble keeps tone consistent across outputs.',
      outcome:
        'Six-plus drafts per long-form piece, in under a minute, in voice. Total cost: less than a tenth of a cent per run. Content teams ship 3–5× more distribution per upstream piece without hiring.',
    },
  },
  {
    name: 'Lead Qualification Pipeline',
    category: 'AI Automation',
    status: 'Case study',
    description:
      'An n8n workflow that captures inbound leads from any source, enriches and scores them with GPT-4, syncs to GHL as a contact, and pings the right sales rep in Slack with an AI-drafted opening message.',
    highlights: [
      'Replaces ~10 hrs/week of manual triage',
      'GPT-4 scoring 0–100 against an ideal-customer profile',
      'Hot leads (>75) get a Slack ping in under 5 minutes',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: N8nIcon, name: 'n8n' },
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: GhlIcon, name: 'GHL' },
      { icon: SiSlack, name: 'Slack' },
    ],
    caseStudy: {
      problem:
        'Sales reps spend hours each week sifting through inbound forms, LinkedIn DMs, and demo requests to figure out which leads are worth chasing. Most leads get a generic reply 24+ hours later — by then they\'ve gone cold.',
      solution:
        'An n8n workflow ingests new leads from forms, GHL, email, and chat. Each lead is enriched (company size, industry, tech stack), then scored 0–100 by GPT-4 against an ideal-customer profile defined in a single prompt. Hot leads (>75) trigger a Slack ping to the rep with a pre-drafted opener tailored to that lead. Cold leads are auto-routed into a nurture sequence inside GHL.',
      outcome:
        '10+ hours of triage saved per rep per week. Response time on hot leads drops from 24h to under 5 minutes. Conversion on responded leads goes up because the first message is already relevant — not a generic template.',
    },
  },
  {
    name: 'AI Receptionist & Smart Booking',
    category: 'AI Automation',
    status: 'Case study',
    description:
      'A GoHighLevel funnel + Twilio voice agent that picks up missed calls 24/7 for service businesses, answers FAQs, checks live calendar availability, books appointments straight into GHL, and SMS-confirms with the customer.',
    highlights: [
      'Captures bookings the business would have lost',
      'Live calendar lookup + GHL appointment creation',
      'SMS handoff to a human after two failed turns',
    ],
    link: { href: 'https://github.com/JLemuel', label: 'View case study' },
    technologies: [
      { icon: GhlIcon, name: 'GHL' },
      { icon: SiOpenai, name: 'OpenAI' },
      { icon: SiTwilio, name: 'Twilio' },
    ],
    caseStudy: {
      problem:
        'Service businesses (plumbers, salons, dental practices) lose ~30% of new-customer revenue to missed calls. After hours nobody picks up — and the customer just dials the next listing on Google.',
      solution:
        'A GHL workflow routes missed and after-hours calls through Twilio to an OpenAI Realtime voice agent. The agent answers as the business, handles common FAQs (hours, pricing, location), queries GHL\'s calendar for live availability, and books the appointment directly into GHL. After two failed turns it offers to text a human. The owner gets an SMS summary of every call the next morning.',
      outcome:
        'Captures bookings outside business hours that would have been lost. Owners regain peace of mind — no more "I missed three calls during dinner" anxiety. The setup runs entirely inside GHL with one external Twilio number and one OpenAI key.',
    },
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
    caseStudy: {
      problem:
        "The existing WordPress storefront was slow, hard to maintain, and didn't match the brand's polished new identity. Conversion was suffering on mobile.",
      solution:
        'Led the frontend rebuild on a modern React + Laravel stack. Translated Figma into pixel-perfect, fully responsive components. Migrated content carefully so SEO juice and product URLs were preserved.',
      outcome:
        'Page speed up ~40%. Mobile conversion improved meaningfully. The team can now ship visual updates in hours instead of days.',
    },
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
    caseStudy: {
      problem:
        'Service-based businesses were stitching together five different tools — a scheduler, a CRM, an invoicing app, a chat tool, and spreadsheets — and constantly losing context between them.',
      solution:
        'Built a single multi-tenant SaaS that handles scheduling, customer records, invoicing (with Stripe billing), and team collaboration in one place. Designed for non-technical operators: every workflow is two clicks or fewer.',
      outcome:
        'Live SaaS with real paying customers across multiple plan tiers. Sub-100ms route response times at scale.',
    },
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

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m6 6 12 12M6 18 18 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowOutIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.5 4.5h6v6M11 5 4.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const isAI = project.category === 'AI Automation'
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-400/40"
    >
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

      <div className="mt-6 flex flex-1 items-end justify-between gap-3">
        <span className="inline-flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <LinkIcon className="h-5 w-5 flex-none" />
          <span className="ml-2">{project.link.label}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:text-emerald-600 dark:text-zinc-300 dark:group-hover:text-emerald-400">
          Read case study
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
        </span>
      </div>
    </button>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const open = project !== null
  const isAI = project?.category === 'AI Automation'
  const isSample = project?.status === 'Sample build'

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-end justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
          <TransitionChild
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 translate-y-4 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:scale-95"
          >
            <DialogPanel className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10">
              {project && (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    aria-label="Close"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>

                  <div className="border-b border-zinc-200 p-6 pr-14 sm:p-8 sm:pr-16 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
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
                      <div className="flex flex-wrap items-center gap-2">
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
                    <DialogTitle className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                      {project.name}
                    </DialogTitle>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
                    {project.caseStudy && (
                      <div className="space-y-6">
                        <CaseStudyBlock
                          label="The problem"
                          text={project.caseStudy.problem}
                        />
                        <CaseStudyBlock
                          label="The solution"
                          text={project.caseStudy.solution}
                        />
                        <CaseStudyBlock
                          label="The outcome"
                          text={project.caseStudy.outcome}
                        />
                      </div>
                    )}

                    <div className="mt-8">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                        What&apos;s inside
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                          >
                            <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                        Stack
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech.name}
                            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            <tech.icon className="h-3.5 w-3.5" />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {isSample && (
                      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                        This is a sample build — the live demo and full code
                        walkthrough are coming soon. Want one adapted to your
                        team&apos;s stack and workflow?{' '}
                        <Link
                          href="/contact"
                          onClick={onClose}
                          className="font-semibold underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-100"
                        >
                          Get in touch
                        </Link>
                        .
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 bg-zinc-50 p-6 sm:flex-row sm:justify-end sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      Close
                    </button>
                    {isSample ? (
                      <Link
                        href="/contact"
                        onClick={onClose}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                      >
                        Build this for my team
                      </Link>
                    ) : (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                      >
                        Visit {project.link.label}
                        <ArrowOutIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

function CaseStudyBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
        {label}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {text}
      </p>
    </div>
  )
}

export function ProjectsClient() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const aiProjects = projects.filter((p) => p.category === 'AI Automation')
  const webProjects = projects.filter((p) => p.category === 'Web Development')

  return (
    <>
      <section>
        <Reveal className="flex items-center gap-3">
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-emerald-500 px-3 text-xs font-semibold text-white">
            <HiSparkles className="h-3.5 w-3.5" />
            AI Automation
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-500">
            One flagship build per tool — Zapier · n8n · GHL
          </span>
        </Reveal>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {aiProjects.map((project, i) => (
            <Reveal as="li" key={project.name} delay={i * 80}>
              <ProjectCard
                project={project}
                onOpen={() => setActiveProject(project)}
              />
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
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {webProjects.map((project, i) => (
            <Reveal as="li" key={project.name} delay={i * 80}>
              <ProjectCard
                project={project}
                onOpen={() => setActiveProject(project)}
              />
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

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  )
}
