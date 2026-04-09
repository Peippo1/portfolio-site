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
  const socialLinks = [
    profile.githubUrl ? { label: "GitHub", href: profile.githubUrl } : null,
    profile.linkedinUrl ? { label: "LinkedIn", href: profile.linkedinUrl } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="About"
          title="AI Implementation Engineer building systems that need to work in the real world."
          description="I design and ship AI systems, data pipelines, and production software with a focus on clarity, reliability, and practical use."
        />

        <section className="mt-14 max-w-2xl border-t border-[var(--color-border)] pt-7">
          <div className="space-y-8 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Opening
              </h2>
              <p className="mt-3">
                I’m Tim Finch, an AI Implementation Engineer focused on AI
                systems, data pipelines, and production software. I build
                practical tools that turn messy inputs into reliable workflows
                and clear outputs.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Current focus
              </h2>
              <p className="mt-3">
                I’m currently working on applied AI products, evaluation
                loops, and infrastructure that keeps model-assisted workflows
                dependable in practice. I’m drawn to systems where the product
                shape is as important as the model behavior.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Background
              </h2>
              <p className="mt-3">{profile.location}</p>
              <p className="mt-3">
                My background sits between product engineering and
                model-enabled systems. I like work that starts with ambiguity
                and ends with something people can trust.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Working style
              </h2>
              <p className="mt-3">
                I prefer clear information models, small reliable interfaces,
                and enough feedback in the system to make tradeoffs visible. I
                try to keep the critical path boring and the outcome legible.
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
        </section>
      </Container>
    </main>
  );
}
