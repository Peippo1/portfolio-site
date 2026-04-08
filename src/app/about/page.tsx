import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, working principles, and the kind of applied AI and product engineering work I care about most.",
};

export default function AboutPage() {
  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="About"
          title="A product-minded engineer focused on useful AI systems and durable software."
          description={profile.summary}
        />

        <section className="mt-14 grid gap-10 border-t border-[var(--color-border)] pt-7 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
          <div className="max-w-2xl space-y-5 text-base leading-8 text-[var(--color-muted)]">
            {profile.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-7">
            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Base
              </h2>
              <p className="mt-3 text-base">{profile.location}</p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Principles
              </h2>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {profile.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </Container>
    </main>
  );
}
