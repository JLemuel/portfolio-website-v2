'use client'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

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

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Message sent successfully!')
        setTimeout(() => {
          router.push('/thank-you')
        }, 1000)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SimpleLayout
      title="Let's build something together."
      intro="Looking to bring your web project to life? I'm here to help transform your ideas into reality."
    >
      <Toaster position="bottom-center" />
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
            onSubmit={handleSubmit}
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
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
} 