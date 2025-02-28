import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Resend } from 'resend'
import ContactFormEmail from '../../../../emails/ContactFormEmail'
import { renderAsync } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>()

// Rate limit configuration
const RATE_LIMIT = 5 // maximum emails per window
const RATE_WINDOW = 3600000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRate = rateLimit.get(ip)

  if (!userRate) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - userRate.timestamp > RATE_WINDOW) {
    // Reset if window has passed
    rateLimit.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (userRate.count >= RATE_LIMIT) {
    return false
  }

  // Increment count
  rateLimit.set(ip, { count: userRate.count + 1, timestamp: userRate.timestamp })
  return true
}

// Add this validation function
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
    // Get IP address
    const ip = request.ip || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    validateFormData(name, email, message)

    const emailHtml = await renderAsync(
      ContactFormEmail({ name, email, message })
    )

    await resend.emails.send({
      from: 'Contact Form <noreply@johnlemuel.xyz>',
      to: 'johnlemuelnicolas@gmail.com',
      subject: `New message from ${name}`,
      html: emailHtml,
      replyTo: email,
    })

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    let errorMessage = 'Failed to send message'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// Add OPTIONS method to handle preflight requests
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