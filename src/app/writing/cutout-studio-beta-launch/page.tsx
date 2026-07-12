import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Launching Cutout Studio as a Verified Beta",
  description:
    "Why Cutout Studio needed verified login, moderation, audit logging, and a stricter safety posture before it could be treated like a real public beta.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--color-border)] pt-7 sm:pt-8">
      <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
        {children}
      </div>
    </section>
  );
}

export default function CutoutStudioLaunchPage() {
  return (
    <main>
      <Container className="max-w-4xl py-14 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-10">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:outline-none"
          >
            <span aria-hidden="true">←</span>
            Back to notes
          </Link>
        </div>

        <article className="mx-auto max-w-[44rem]">
          <header className="space-y-5 pb-10 sm:pb-12">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Product Launch
              </p>
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                July 12, 2026 / 7 min read
              </p>
            </div>

            <h1 className="font-editorial text-4xl leading-tight sm:text-[3.25rem]">
              Launching Cutout Studio as a Verified Beta
            </h1>

            <p className="max-w-3xl text-[1.08rem] leading-8 text-[var(--color-text)] sm:text-[1.14rem] sm:leading-[2.1rem]">
              Cutout Studio started as a useful image tool and ended up needing a
              much stricter product posture before it could be treated like a
              real public beta. Background removal sounds simple until you think
              seriously about anonymous abuse, unsafe images, account state, and
              what you are actually willing to operate in public.
            </p>

            <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(16,17,20,0.02),rgba(16,17,20,0.008))] px-5 py-4">
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                Launch note
              </p>
              <p className="mt-2 text-[1rem] leading-7 text-[var(--color-text)]">
                The public beta flow now requires verified GitHub login for
                processing, durable policy state, moderation before cutout,
                abuse reporting, admin review actions, and no raw image
                retention by default.
              </p>
            </div>
          </header>

          <Section title="Why the simple version was not enough">
            <p>
              The first version of the app could already remove a background,
              but that is the easy part. The harder question is whether you are
              willing to expose that workflow to the public without knowing who
              is using it, what kinds of images they are sending, and what you
              will do when the wrong kind of usage appears.
            </p>
            <p>
              A free tool with no identity, no moderation, weak logging, and no
              durable account state is easy to operate right up until the moment
              it is not. That is why the launch plan shifted from anonymous
              utility to accountable beta.
            </p>
          </Section>

          <Section title="What changed before launch">
            <ul className="space-y-3 pl-5 marker:text-[var(--color-soft)]">
              <li>Verified GitHub sign-in with a real verified email requirement.</li>
              <li>Postgres-backed users, sessions, policy acceptance, and audit events.</li>
              <li>Moderation before background removal, not after it.</li>
              <li>Strict fail-closed behavior on moderation uncertainty.</li>
              <li>Signed-in abuse reporting and admin-only review actions.</li>
              <li>No raw image retention by default, only metadata and decision logs.</li>
            </ul>
            <p>
              That set of changes matters because it turns the product from a
              demo into something closer to an operational service. The actual
              image processing stays useful, but the trust boundary is much more
              explicit.
            </p>
          </Section>

          <Section title="The safety posture">
            <p>
              The current flow is intentionally ordered. A user signs in, their
              account state is checked, the current policy version must be
              accepted, Turnstile can run when configured, moderation reviews
              the upload, and only then does the cutout pipeline execute.
            </p>
            <p>
              The service also treats uncertainty as a real condition, not an
              excuse to carry on. Missing auth, blocked accounts, stale policy
              state, moderation failure, or a review-required result all stop
              the request rather than letting the product quietly hope for the
              best.
            </p>
          </Section>

          <Section title="What stays private by default">
            <p>
              The default posture is intentionally narrow. Cutout Studio does
              not persist raw uploads or output PNGs as part of the normal flow.
              Images are processed in memory, and the durable record keeps only
              request IDs, decision codes, hashed request metadata, timestamps,
              and related operator review state.
            </p>
            <p>
              That is not just a privacy preference. It is also a product
              constraint: if you do not need the image later, you should be very
              skeptical about storing it at all.
            </p>
          </Section>

          <Section title="Where the product is now">
            <p>
              The beta app shell is now live on Sites with the safety posture
              visible to users. Processing remains fail-closed until the
              production GitHub OAuth, Postgres, moderation, and Turnstile
              settings are configured, which is the right default for a tool
              that should not process anonymous or unsafe uploads.
            </p>
            <div className="flex flex-col gap-2.5 text-[var(--color-text)]">
              <a
                href="https://cutout-studio.tim-o-finch.chatgpt.site"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
              >
                Use Cutout Studio <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/Peippo1/Cutout-Studio"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
              >
                View the Cutout Studio repository <span aria-hidden="true">↗</span>
              </a>
              <Link
                href="/projects/cutout-studio"
                className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
              >
                Open the Cutout Studio case study <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Section>
        </article>
      </Container>
    </main>
  );
}
