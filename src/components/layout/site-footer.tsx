import { profile } from "@/data/profile";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="grid gap-6 py-8 text-sm text-[var(--color-muted)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.18em] uppercase">
            Available for careful product, platform, and applied AI work.
          </p>
          <p className="mt-2 leading-7">
            {profile.summary}
          </p>
        </div>
        <p className="text-xs tracking-[0.18em] uppercase">London / Remote</p>
      </Container>
    </footer>
  );
}
