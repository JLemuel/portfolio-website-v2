import {
  Body,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

/**
 * Notification sent to John when someone submits the site's contact form.
 *
 * Minimal by design: no panels, no avatar, no boxed message — structure comes
 * from whitespace and hairlines, with a single emerald accent. Mirrors the
 * site's zinc palette and Satoshi type, with a system fallback since most
 * clients drop webfonts.
 *
 * Deliberately avoids flexbox and grid, which Outlook ignores and several
 * clients strip. Everything here is block-level or a table via <Section>.
 */
export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  const displayName = name?.trim() || 'Anonymous'
  const firstName = displayName.split(' ')[0]

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Satoshi"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        New enquiry from {displayName} — {email}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Single accent: a short emerald rule standing in for a logo */}
          <Section style={accentRule} />

          <Text style={eyebrow}>NEW ENQUIRY</Text>
          <Text style={senderName}>{displayName}</Text>
          <Link href={`mailto:${email}`} style={senderEmail}>
            {email}
          </Link>

          <Hr style={hairline} />

          <Text style={messageText}>{message}</Text>

          <Section style={ctaWrap}>
            <Link href={`mailto:${email}`} style={ctaButton}>
              Reply to {firstName}
            </Link>
          </Section>

          <Hr style={hairline} />

          <Text style={footerText}>
            Replying reaches {firstName} directly · sent from{' '}
            <Link href="https://johnlemuel.xyz" style={footerLink}>
              johnlemuel.xyz
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactFormEmail

/* Palette mirrors the site: zinc greys, one emerald accent. */
const FONT_STACK =
  'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

const main = {
  backgroundColor: '#fafafa',
  fontFamily: FONT_STACK,
  padding: '40px 20px',
  margin: '0',
}

const container = {
  maxWidth: '520px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '14px',
  padding: '44px 44px 36px',
}

const accentRule = {
  width: '30px',
  height: '3px',
  backgroundColor: '#10b981',
  borderRadius: '2px',
  margin: '0 0 26px',
}

const eyebrow = {
  margin: '0 0 10px',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  color: '#a1a1aa',
}

const senderName = {
  margin: '0 0 6px',
  fontSize: '26px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: '1.2',
  color: '#09090b',
}

const senderEmail = {
  fontSize: '15px',
  color: '#71717a',
  textDecoration: 'none',
}

const hairline = {
  borderColor: '#f4f4f5',
  margin: '30px 0',
}

const messageText = {
  margin: '0',
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#3f3f46',
  whiteSpace: 'pre-wrap' as const,
}

const ctaWrap = {
  padding: '30px 0 0',
}

const ctaButton = {
  display: 'inline-block',
  backgroundColor: '#09090b',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '12px 26px',
  borderRadius: '999px',
}

const footerText = {
  margin: '0',
  fontSize: '12px',
  lineHeight: '1.6',
  color: '#a1a1aa',
}

const footerLink = {
  color: '#059669',
  textDecoration: 'none',
}
