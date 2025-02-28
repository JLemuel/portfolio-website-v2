import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { FaGithub, FaLinkedin, FaArrowLeft } from 'react-icons/fa'
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
  title: 'Message Sent',
  description: 'Thank you for reaching out.',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thanks for reaching out!"
      intro="I've received your message and will get back to you as soon as possible. In the meantime, feel free to check out my projects on GitHub or connect with me on LinkedIn."
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
          </div>
          
          <div className="flex justify-center">
            <Button href="/contact" variant="secondary" className="inline-flex items-center gap-2">
              <FaArrowLeft className="h-4 w-4" />
              Back to Contact
            </Button>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
