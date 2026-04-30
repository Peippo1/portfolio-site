import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Surface } from "@/components/ui/surface";
import { profile } from "@/data/profile";
import { cityScoutSummary } from "@/data/writing";

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
          title="AI engineer building systems that need to work in the real world."
          description="I build practical AI systems, data infrastructure, and product software with a focus on clarity and reliability."
        />

        <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
          <div className="max-w-2xl border-t border-[var(--color-border)] pt-7">
            <div className="space-y-8 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Opening
                </h2>
                <p className="mt-3">
                  I’m Tim Finch, an AI Implementation Engineer focused on
                  practical systems in production.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Current focus
                </h2>
                <p className="mt-3">
                  I work across AI engineering, data infrastructure, and product
                  development, designing systems that connect model output to
                  real workflows.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Background
                </h2>
                <p className="mt-3">
                  That usually means LLM applications, agents, APIs, automation
                  services, and data pipelines built with clear contracts and
                  measurable behavior.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Working style
                </h2>
                <p className="mt-3">
                  I care about how teams use AI in practice, and I prefer clear
                  information models, small reliable interfaces, and systems
                  that are easy to understand, operate, and trust. I’m a
                  user-focused engineer with a bias toward calm execution and
                  production-ready work.
                </p>
              </div>
            </div>

            {socialLinks.length > 0 ? (
              <div className="mt-10 border-t border-[var(--color-border)] pt-7">
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Links
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-6 lg:pt-7">
            <Surface className="p-6 sm:p-7">
              <div className="space-y-5">
                <div>
                  <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    Current build
                  </p>
                  <p className="font-editorial mt-3 text-[1.35rem] leading-tight text-[var(--color-text)] sm:text-[1.55rem]">
                    CityScout
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {cityScoutSummary.readerFacing}
                  </p>
                </div>

                <div className="border-t border-[var(--color-border)] pt-5">
                  <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    Principles
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                    {profile.principles.map((principle) => (
                      <li key={principle} className="border-l border-[var(--color-border)] pl-4">
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Surface>

            <Surface className="p-6 sm:p-7">
              <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Working record
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                I use writing to keep product decisions legible, especially when
                the system shape changes faster than the copy does.
              </p>
            </Surface>
          </div>
        </section>
      </Container>
    </main>
  );
}
