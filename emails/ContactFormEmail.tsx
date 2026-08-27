import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
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
 * Styled to match the portfolio: zinc greys, an emerald accent, and Satoshi
 * with a system fallback (most clients ignore webfonts, so the stack matters
 * more than the @font-face).
 *
 * Layout is Row/Column throughout — those compile to tables. Flexbox and grid
 * are unreliable in Outlook and are stripped by several clients, so they are
 * deliberately avoided here even though the site itself uses them.
 */
export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  const displayName = name?.trim() || 'Anonymous'
  const initial = displayName.charAt(0).toUpperCase() || '?'

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
          {/* Dark header, mirroring the site's hero */}
          <Section style={header}>
            <Row>
              <Column style={avatarCell}>
                <Text style={avatarText}>{initial}</Text>
              </Column>
              <Column style={senderCell}>
                <Text style={eyebrow}>NEW ENQUIRY</Text>
                <Text style={senderName}>{displayName}</Text>
                <Link href={`mailto:${email}`} style={senderEmail}>
                  {email}
                </Link>
              </Column>
            </Row>
          </Section>

          <Section style={content}>
            <Text style={label}>MESSAGE</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Anchor styled as a button — more reliable than <Button> in Outlook */}
            <Section style={ctaWrap}>
              <Link href={`mailto:${email}`} style={ctaButton}>
                Reply to {displayName.split(' ')[0]}
              </Link>
            </Section>

            <Text style={replyNote}>
              Replying to this email reaches {displayName} directly.
            </Text>

            <Hr style={divider} />
            <Text style={footerText}>
              Sent from the contact form at{' '}
              <Link href="https://johnlemuel.xyz" style={footerLink}>
                johnlemuel.xyz
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactFormEmail

/* Palette mirrors the site: zinc greys with an emerald accent. */
const FONT_STACK =
  'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

const main = {
  backgroundColor: '#f4f4f5',
  fontFamily: FONT_STACK,
  padding: '32px 0',
  margin: '0',
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid #e4e4e7',
}

const header = {
  backgroundColor: '#09090b',
  padding: '28px 32px',
}

const avatarCell = {
  width: '52px',
  verticalAlign: 'top' as const,
}

const avatarText = {
  width: '44px',
  height: '44px',
  lineHeight: '44px',
  borderRadius: '22px',
  backgroundColor: '#10b981',
  color: '#052e16',
  fontSize: '19px',
  fontWeight: 700,
  textAlign: 'center' as const,
  margin: '0',
}

const senderCell = {
  verticalAlign: 'top' as const,
  paddingLeft: '4px',
}

const eyebrow = {
  margin: '0 0 4px',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  color: '#34d399',
}

const senderName = {
  margin: '0',
  fontSize: '19px',
  fontWeight: 700,
  lineHeight: '1.3',
  color: '#fafafa',
}

const senderEmail = {
  fontSize: '14px',
  color: '#a1a1aa',
  textDecoration: 'none',
}

const content = {
  padding: '32px',
}

const label = {
  margin: '0 0 10px',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  color: '#71717a',
}

const messageBox = {
  backgroundColor: '#fafafa',
  border: '1px solid #e4e4e7',
  borderRadius: '10px',
  padding: '18px 20px',
}

const messageText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '1.65',
  color: '#27272a',
  whiteSpace: 'pre-wrap' as const,
}

const ctaWrap = {
  padding: '28px 0 0',
  textAlign: 'center' as const,
}

const ctaButton = {
  display: 'inline-block',
  backgroundColor: '#059669',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '13px 30px',
  borderRadius: '999px',
}

const replyNote = {
  margin: '14px 0 0',
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#71717a',
  textAlign: 'center' as const,
}

const divider = {
  borderColor: '#e4e4e7',
  margin: '28px 0 16px',
}

const footerText = {
  margin: '0',
  fontSize: '12px',
  color: '#a1a1aa',
  textAlign: 'center' as const,
}

const footerLink = {
  color: '#059669',
  textDecoration: 'none',
}
