import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Resend } from 'resend'
import ContactFormEmail from '../../../../emails/ContactFormEmail'
import { renderAsync } from '@react-email/render'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || 'johnlemuelnicolas@gmail.com'
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>'

const rateLimit = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 3_600_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRate = rateLimit.get(ip)

  if (!userRate || now - userRate.timestamp > RATE_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (userRate.count >= RATE_LIMIT) {
    return false
  }

  rateLimit.set(ip, {
    count: userRate.count + 1,
    timestamp: userRate.timestamp,
  })
  return true
}

function validateFormData(name: string, email: string, message: string) {
  if (!name || !email || !message) {
    throw new Error('All fields are required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address')
  }

  if (message.length < 10) {
    throw new Error('Message must be at least 10 characters long')
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      console.error(
        '[contact] RESEND_API_KEY is not set. Add it to .env.local',
      )
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      )
    }

    const ip = request.ip || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 },
      )
    }

    const formData = await request.formData()
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const message = (formData.get('message') as string)?.trim()

    validateFormData(name, email, message)

    const emailHtml = await renderAsync(
      ContactFormEmail({ name, email, message }),
    )

    const resend = new Resend(RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `New inquiry from ${name}`,
      html: emailHtml,
      replyTo: email,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        {
          error:
            error.message ||
            'Failed to send message. Please email me directly.',
        },
        { status: 502 },
      )
    }

    console.log('[contact] Email sent:', data?.id)

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 },
    )
  } catch (error) {
    console.error('[contact] Unexpected error:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send message'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
