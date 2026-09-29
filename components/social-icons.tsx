import type { SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

// Brand marks use the same 24px outline grid as the Lucide interface icons.
export function LinkedinIcon({ size = 16, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10.5v7M7.5 7h.01M11.5 17.5v-7m0 3a3 3 0 0 1 6 0v4" /></svg>;
}
export function GithubIcon({ size = 16, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4.3 1.3-4.3-2.3-6-2.8M9 22v-3.4c0-.9.1-1.5-.5-2-3.3-.4-6.8-1.6-6.8-7.2a5.6 5.6 0 0 1 1.5-3.9 5.1 5.1 0 0 1 .1-3.9s1.2-.4 4 1.5a13.7 13.7 0 0 1 7.4 0c2.8-1.9 4-1.5 4-1.5a5.1 5.1 0 0 1 .1 3.9 5.6 5.6 0 0 1 1.5 3.9c0 5.6-3.5 6.8-6.8 7.2.6.6.6 1.2.6 2V22" /></svg>;
}
