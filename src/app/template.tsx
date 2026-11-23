/**
 * A template remounts on every page change, so each new page fades in
 * (.page-fade in globals.css). The jump to the top happens while it is still
 * transparent, so nothing is seen scrolling.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
