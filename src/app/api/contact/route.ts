import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    // Add validation
    validateFormData(name, email, message)

    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://yourwebsite.com'
    const logoUrl = `${websiteUrl}/images/vector.png`

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'johnlemuelnicolas@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; margin: 0; padding: 40px 20px; background-color: white; color: #333;">
            <div style="max-width: 520px; margin: 0 auto;">
              <!-- Logo -->
              <div style="text-align: center; margin-bottom: 40px;">
                <img src="${logoUrl}" alt="Logo" style="height: 50px; width: auto;">
              </div>

              <!-- Content -->
              <div style="margin-bottom: 32px;">
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px;"><strong>From:</strong> ${name}</p>
                  <p style="margin: 0 0 24px;"><strong>Email:</strong> ${email}</p>
                  
                  <div style="border-left: 2px solid #eee; padding-left: 16px; margin: 24px 0;">
                    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #eee; padding-top: 24px; text-align: center; color: #666; font-size: 14px;">
                <p style="margin: 0;">
                  Reply to this email to respond to ${name}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      replyTo: email,
    })

    return NextResponse.redirect(new URL('/thank-you', request.url))
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 