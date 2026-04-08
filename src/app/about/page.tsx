import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, working principles, and the kind of applied AI and product engineering work I care about most.",
};

export default function AboutPage() {
  const socialLinks = [
    profile.githubUrl ? { label: "GitHub", href: profile.githubUrl } : null,
    profile.linkedinUrl ? { label: "LinkedIn", href: profile.linkedinUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="About"
          title="A product-minded engineer focused on useful AI systems and durable software."
          description="I build applied AI products and systems that stay understandable under real use, with a bias toward clear interfaces and durable implementation."
        />

        <section className="mt-14 max-w-2xl border-t border-[var(--color-border)] pt-7">
          <div className="space-y-8 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Current focus
              </h2>
              <p className="mt-3">
                I’m currently working on applied AI products, evaluation loops,
                and the infrastructure that keeps model-assisted workflows
                dependable in practice.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                What I enjoy building
              </h2>
              <p className="mt-3">
                I gravitate toward systems that combine product judgment with
                technical clarity: AI tools with sensible interfaces, APIs that
                slot into real workflows, and data products that make complex
                behavior easier to inspect.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Base
              </h2>
              <p className="mt-3">{profile.location}</p>
            </div>
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-10 border-t border-[var(--color-border)] pt-7">
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Links
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </Container>
    </main>
  );
}
