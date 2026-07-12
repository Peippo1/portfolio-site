import { profile } from "@/data/profile";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const footerLinks = [
    profile.cvUrl ? { label: "View CV", href: profile.cvUrl } : null,
    profile.linkedinUrl ? { label: "LinkedIn", href: profile.linkedinUrl } : null,
    profile.githubUrl ? { label: "GitHub", href: profile.githubUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="grid gap-6 py-8 text-sm text-[var(--color-muted)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.18em] uppercase">
            Open to product, platform, and AI work.
          </p>
          <p className="mt-2 leading-7">
            {profile.summary}
          </p>
          {footerLinks.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="inline-flex rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs tracking-[0.08em] text-[var(--color-muted)] uppercase transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <p className="text-xs tracking-[0.18em] uppercase">London / Remote</p>
      </Container>
    </footer>
  );
}
