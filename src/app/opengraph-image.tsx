import { ImageResponse } from 'next/og'

export const alt =
  'John Lemuel — Full-Stack Engineer & AI Automation Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Laravel',
  'Shopify',
  'OpenAI',
  'n8n',
]

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
          padding: '72px',
        }}
      >
        {/* Availability pill */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #27272a',
              borderRadius: '999px',
              padding: '10px 22px',
              fontSize: 22,
              color: '#d4d4d8',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '999px',
                backgroundColor: '#10b981',
                marginRight: 12,
              }}
            />
            Available for new projects
          </div>
        </div>

        {/* Name and role */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
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
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginTop: 14,
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
          <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 800 }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  display: 'flex',
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '999px',
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
    { ...size },
  )
}
