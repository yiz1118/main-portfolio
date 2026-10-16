/** The studio chop: a stamped AC seal used where a logo would sit. Decorative unless titled. */
export function Chop({ title, className = "chop" }: { title?: string; className?: string }) {
  return <span className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
    <svg viewBox="0 0 40 40" focusable="false">
      <rect width="40" height="40" fill="currentColor" />
      <rect x="3.2" y="3.2" width="33.6" height="33.6" fill="none" stroke="#f2f1ec" strokeWidth="1.2" />
      <path fill="#f2f1ec" fillRule="evenodd" d="M7.4 31 12.2 9h4.1l4.8 22h-3.5l-.95-4.6h-4.84L10.9 31H7.4Zm5.1-7.7h3.6L14.3 14.6l-1.8 8.7ZM33 9H23v22h10v-3.3h-6.5V12.3H33V9Z" />
    </svg>
  </span>;
}
