import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'

function SocialLink({
  icon: Icon,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" {...props}>
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  )
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for opportunities or collaborations.',
}

export default function Contact() {
  return (
    <SimpleLayout
      title="Let's build something together."
      intro="Looking to bring your web project to life? I'm here to help transform your ideas into reality."
    >
      <div className="mx-auto max-w-xl">
        <div className="space-y-12">
          <div className="flex justify-center gap-12">
            <SocialLink href="https://github.com/JLemuel" icon={FaGithub}>
              GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/john-lemuel-nicolas-9287ba163" icon={FaLinkedin}>
              LinkedIn
            </SocialLink>
            <SocialLink href="mailto:johnlemuelnicolas@gmail.com" icon={MdEmail}>
              Email
            </SocialLink>
          </div>

          <form 
            action="/api/contact" 
            method="POST"
            className="mt-20 space-y-8"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Name"
                  className="w-full border-0 border-b border-zinc-200 bg-transparent pb-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-100"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  className="w-full border-0 border-b border-zinc-200 bg-transparent pb-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-100"
                />
              </div>
            </div>

            <div>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Message"
                className="w-full border-0 border-b border-zinc-200 bg-transparent pb-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-100"
              />
            </div>

            <div>
              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
} 