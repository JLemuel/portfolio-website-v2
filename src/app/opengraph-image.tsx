import { readFileSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'

import { ogSkills } from '@/lib/site'

export const alt = 'John Lemuel — Full-Stack Engineer & AI Automation Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Read from disk at build time. Turbopack warns that this traces the whole
 * project, which is harmless here — the card is generated once during the
 * build, not per request. The tidier `new URL(..., import.meta.url)` form is
 * not usable: `fetch` cannot read `file://` during a build, and Turbopack's
 * `fs` shim rejects URL objects.
 *
 * Satori cannot read woff2, the format next/font uses for the site itself, so
 * these are plain TTF copies of the same Satoshi faces. Regenerate with
 * fontTools if the site font ever changes:
 *   TTFont('Satoshi-Regular.woff2') -> flavor = None -> save as .ttf
 */
const satoshiRegular = readFileSync(
  join(process.cwd(), 'src/fonts/og/Satoshi-Regular.ttf'),
)
const satoshiBold = readFileSync(
  join(process.cwd(), 'src/fonts/og/Satoshi-Bold.ttf'),
)

// Pre-cropped 220px square, so the full-size portrait isn't inlined here.
const avatar = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), 'src/images/og-avatar.jpg'),
).toString('base64')}`

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '68px 72px',
          fontFamily: 'Satoshi',
        }}
      >
        {/* Availability pill + portrait */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #27272a',
              borderRadius: 999,
              padding: '10px 22px',
              fontSize: 22,
              color: '#d4d4d8',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: '#10b981',
                marginRight: 12,
              }}
            />
            Open to full-time roles & freelance projects
          </div>

          <img
            src={avatar}
            width={112}
            height={112}
            style={{
              borderRadius: 999,
              objectFit: 'cover',
              border: '3px solid #27272a',
            }}
          />
        </div>

        {/* Name and role */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.03em',
            }}
          >
            John Lemuel
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 42,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              marginTop: 16,
            }}
          >
            {/* Satori drops trailing whitespace, so the gap is set explicitly. */}
            <span style={{ color: '#a1a1aa', marginRight: 14 }}>
              Full-Stack Engineer &
            </span>
            <span style={{ color: '#34d399' }}>AI Automation Builder</span>
          </div>
        </div>

        {/* Skills + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 830 }}>
            {ogSkills.map((skill) => (
              <div
                key={skill}
                style={{
                  display: 'flex',
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: 999,
                  padding: '8px 20px',
                  marginRight: 12,
                  marginTop: 12,
                  fontSize: 24,
                  color: '#d4d4d8',
                }}
              >
                {skill}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#71717a' }}>
            johnlemuel.xyz
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshiRegular,
          weight: 400,
          style: 'normal',
        },
        { name: 'Satoshi', data: satoshiBold, weight: 700, style: 'normal' },
      ],
    },
  )
}
