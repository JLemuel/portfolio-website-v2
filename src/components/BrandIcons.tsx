import type { SVGProps } from 'react'

export function N8nIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6.5 11.3 10.5 7.5M6.5 12.7 10.5 16.5M13.5 7.5 17.5 11.3M13.5 16.5 17.5 12.7"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="5" cy="12" r="2.2" />
      <circle cx="12" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
    </svg>
  )
}

export function GhlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <path d="M16 9.5a4.5 4.5 0 1 0 0 5h-3.5v-2.5" />
    </svg>
  )
}
