import type { SVGProps } from 'react'

/**
 * Official n8n mark, sourced from the simple-icons project
 * (https://simpleicons.org/icons/n8n) under CC0.
 * Inherits color from `currentColor`.
 */
export function N8nIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
    </svg>
  )
}

/**
 * The HighLevel (GoHighLevel) three-arrow mark.
 *
 * Taken from the official wordmark in `src/images/logos/gohighlevel.svg`, which
 * is a ~3:1 lockup of mark plus "HighLevel" text — far too wide for the square
 * icon slots these marks sit in. Only the arrows are kept, with the viewBox set
 * to their exact bounding box.
 *
 * The source hard-codes `fill="rgb(254,254,254)"` (white on white, hence
 * invisible against a light background); that's dropped here so the mark
 * inherits `currentColor` and themes like every other icon.
 */
export function GhlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="318 314 754 613"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M 915.29 314.749 C 922.514 319.97 955.398 354.295 963.299 362.203 L 1073.1 471.893 L 868.434 472.192 L 967.738 559.923 L 967.739 880.5 L 967.741 928.018 L 863.336 928.021 L 863.336 471.896 L 758.054 471.891 L 915.29 314.749 z" />
      <path d="M 475.771 314.682 C 481.17 318.514 514.538 353.112 522.07 360.649 L 633.487 471.888 L 428.979 471.706 L 528.08 559.276 L 528.08 880.5 L 528.08 927.66 L 423.896 927.652 L 423.896 471.899 L 318.464 471.891 C 370.814 421.339 424.086 366.346 475.771 314.682 z" />
      <path d="M 695.277 534.744 C 700.416 536.875 838.011 676.308 853.316 691.626 C 832.515 692.335 806.798 691.649 785.637 691.65 L 648.9 691.659 L 748.068 779.301 L 748.07 880.5 L 748.07 928.019 L 643.638 928.021 L 643.638 691.656 L 538.418 691.65 L 695.277 534.744 z" />
    </svg>
  )
}

/**
 * Droplet mark for Shopify Liquid. Liquid has no simple-icons entry, so this
 * stands in for the templating language alongside the Shopify mark.
 * Inherits color from `currentColor`.
 */
export function LiquidIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.75c3.5 4 6.25 7.1 6.25 10.5a6.25 6.25 0 1 1-12.5 0c0-3.4 2.75-6.5 6.25-10.5Z" />
      <path d="M9 14.25a3 3 0 0 0 3 3" />
    </svg>
  )
}
