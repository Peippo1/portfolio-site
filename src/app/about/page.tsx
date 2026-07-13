import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Surface } from "@/components/ui/surface";
import { profile } from "@/data/profile";
import { cityScoutSummary } from "@/data/writing";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, working principles, and the kind of AI and product engineering work I care about most.",
};

export default function AboutPage() {
  const socialLinks = [
    profile.cvUrl ? { label: "View CV", href: profile.cvUrl } : null,
    profile.githubUrl ? { label: "GitHub", href: profile.githubUrl } : null,
    profile.linkedinUrl ? { label: "LinkedIn", href: profile.linkedinUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="About"
          title="AI engineer building products and systems people can actually use."
          description="I work across AI products, data systems, and software — the common thread is trying to make things clear enough that people trust them."
        />

        <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
          <div className="max-w-2xl border-t border-[var(--color-border)] pt-7">
            <div className="space-y-8 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Opening
                </h2>
                <p className="mt-3">
                  I’m Tim Finch. I build AI products and the systems behind
                  them, and I try to keep things simple enough that I can
                  actually test whether they work.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Current focus
                </h2>
                <p className="mt-3">
                  Right now that’s a mix of AI engineering, product work, and
                  data infrastructure — mostly figuring out how to get model
                  output to hold up inside a real workflow, not just a demo.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Background
                </h2>
                <p className="mt-3">
                  In practice that’s LLM applications, agents, APIs, automation
                  services, and data pipelines — built with contracts I can
                  point to and behavior I can actually measure.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Working style
                </h2>
                <p className="mt-3">
                  I’d rather ship a smaller, boring interface that I trust
                  than a clever one I have to babysit. Most of my time goes
                  into figuring out what to leave out.
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
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
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
                I write about what I’m building as I go, mostly so I don’t
                lose track of why I made a decision once the product’s
                moved on from it.
              </p>
            </Surface>
          </div>
        </section>
      </Container>
    </main>
  );
}
