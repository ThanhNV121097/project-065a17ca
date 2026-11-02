/**
 * Shopfront's mark: a shop window — a frame, the head of the window across
 * it, and one mullion down the middle. Drawn in currentColor, so it follows
 * the ink wherever it sits; public/favicon.svg is the same mark.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="5" y="6" width="22" height="20" />
      <path d="M5 12h22M16 12v14" />
    </svg>
  );
}
