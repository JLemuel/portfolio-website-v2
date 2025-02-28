import { type Metadata } from 'next'
import Image from 'next/image'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiStripe,
  SiLaravel,
  SiReact,
  SiMysql,
  SiAew,
  SiWordpress,
} from 'react-icons/si'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'

function TechStack({ technologies }: { technologies: Array<{ icon: any; name: string }> }) {
  return (
    <div className="flex gap-8">
      {technologies.map((tech, index) => (
        <div key={index} className="relative z-20">
          <tech.icon className={`h-5 w-5
            ${tech.name === 'React' && 'text-[#61DAFB] dark:text-[#61DAFB]'}
            ${tech.name === 'Laravel' && 'text-[#FF2D20] dark:text-[#FF2D20]'}
            ${tech.name === 'WordPress' && 'text-[#21759B] dark:text-[#21759B]'}
            ${tech.name === 'Tailwind CSS' && 'text-[#38B2AC] dark:text-[#38B2AC]'}
            ${tech.name === 'Next.js' && 'text-black dark:text-white'}
            ${tech.name === 'TypeScript' && 'text-[#3178C6] dark:text-[#3178C6]'}
            ${tech.name === 'MySQL' && 'text-[#4479A1] dark:text-[#4479A1]'}`} 
          />
        </div>
      ))}
    </div>
  )
}

const projects = [
  {
    name: 'Tough Cookies - Meal Prep Service',
    description:
      'Led the frontend development in converting and redesigning Boston\'s premier meal prep service from WordPress to a modern stack. Implemented responsive designs from Figma, enhanced user experience, and improved site performance for thousands of customers.',
    link: { href: 'https://toughcookies.co/', label: 'toughcookies.co' },
    logo: logoAnimaginary,
    technologies: [
      { icon: SiReact, name: 'React' },
      { icon: SiLaravel, name: 'Laravel' },
      { icon: SiWordpress, name: 'WordPress' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
    ],
  },
  {
    name: 'JobTrack Plus - Service Business Management',
    description:
      'Developed a comprehensive SaaS platform for service-based businesses. Built with modern technologies, it offers job scheduling, customer management, invoicing, and team collaboration features to streamline business operations.',
    link: { href: 'https://jobtrackplus.com/', label: 'jobtrackplus.com' },
    logo: logoPlanetaria,
    technologies: [
      { icon: SiLaravel, name: 'Laravel' },
      { icon: SiReact, name: 'React' },
      { icon: SiMysql, name: 'MySQL' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
    ],
  },
  {
    name: 'Portfolio Website',
    description:
      'A modern, responsive personal website built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, optimized performance, and clean architecture.',
    link: { href: 'https://github.com/JLemuel', label: 'github.com' },
    logo: logoHelioStream,
    technologies: [
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
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

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects showcasing my expertise in full-stack development.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Featured projects from my portfolio."
      intro="Here are three highlighted projects that showcase my expertise in full-stack development. While these represent some of my most significant work, they're part of a broader portfolio of successful projects I've delivered throughout my career."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <div className="mt-6 mb-4">
              <TechStack technologies={project.technologies} />
            </div>
            <p className="relative z-10 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
