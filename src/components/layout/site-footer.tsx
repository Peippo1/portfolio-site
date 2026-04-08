import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="flex flex-col gap-2 py-8 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Available for careful product, platform, and applied AI work.</p>
        <p>London / Remote</p>
      </Container>
    </footer>
  );
}
