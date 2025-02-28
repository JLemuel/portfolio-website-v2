import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Font,
  Img,
} from '@react-email/components'
import * as React from 'react'
import { getBase64Image } from '@/utils/imageToBase64'

const vectorImage = getBase64Image('src/images/vector.png')

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  // Get initial safely
  const initial = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?'

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Satoshi"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Top Banner with Sender Info */}
          <Section style={topBanner}>
            <div style={bannerContent}>
              <div style={senderInfo}>
                <div style={avatarCircle}>{initial}</div>
                <div style={senderDetails}>
                  <Text style={senderName}>{name || 'Anonymous'}</Text>
                  <Text style={senderEmail}>{email}</Text>
                </div>
              </div>
              <div style={logoBadge}>
                <Text style={logoText}>JL</Text>
              </div>
            </div>
          </Section>

          {/* Content Container */}
          <Section style={contentContainer}>
            {/* Vector Decoration */}
            <div style={vectorContainer}>
              <Img
                src={vectorImage}
                width="32"
                height="32"
                alt="Vector"
                style={vectorStyle}
              />
            </div>

            {/* Message Box */}
            <div style={messageContainer}>
              <Text style={messageLabel}>Message</Text>
              <div style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </div>
            </div>

            {/* Action Button */}
            <div style={actionContainer}>
              <a href={`mailto:${email}`} style={actionButton}>
                Reply to Message
              </a>
            </div>

            {/* Footer */}
            <div style={footer}>
              <Hr style={divider} />
              <Text style={footerText}>
                Sent via johnlemuel.xyz contact form
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: 'Satoshi, system-ui, sans-serif',
}

const container = {
  maxWidth: '540px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}

const topBanner = {
  backgroundColor: '#18181b',
  padding: '20px',
}

const bannerContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

const senderInfo = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: '1',
}

const avatarCircle = {
  width: '36px',
  height: '36px',
  backgroundColor: '#3b82f6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
}

const senderDetails = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '2px',
}

const senderName = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  lineHeight: '1.4',
}

const senderEmail = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.4',
}

const logoBadge = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '6px 10px',
}

const logoText = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1',
}

const contentContainer = {
  padding: '32px',
}

const vectorContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
}

const vectorStyle = {
  opacity: '0.8',
}

const messageContainer = {
  marginBottom: '32px',
}

const messageLabel = {
  fontSize: '13px',
  color: '#64748b',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '12px',
  fontWeight: '500',
}

const messageBox = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '16px 20px',
  border: '1px solid #e2e8f0',
  marginTop: '8px',
}

const messageText = {
  fontSize: '14px',
  color: '#334155',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  fontFamily: 'Satoshi, system-ui, sans-serif',
}

const actionContainer = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const actionButton = {
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '10px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  display: 'inline-block',
  textAlign: 'center' as const,
}

const footer = {
  textAlign: 'center' as const,
}

const divider = {
  borderColor: '#e2e8f0',
  margin: '0 0 20px',
}

const footerText = {
  fontSize: '13px',
  color: '#94a3b8',
  margin: '0',
}

export default ContactFormEmail