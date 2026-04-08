import { Container } from "@/components/ui/container";

export default function LoadingProjectPage() {
  return (
    <main>
      <Container className="max-w-4xl py-14 sm:py-18">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="h-8 w-36 rounded bg-black/8" />
          <div className="mt-10 h-4 w-28 rounded bg-black/8" />
          <div className="mt-5 h-12 w-full max-w-xl rounded bg-black/8" />
          <div className="mt-5 h-6 w-full max-w-2xl rounded bg-black/8" />
          <div className="mt-8 grid gap-4 border-t border-b border-black/8 py-5 sm:grid-cols-3">
            <div className="h-12 rounded bg-black/8" />
            <div className="h-12 rounded bg-black/8" />
            <div className="h-12 rounded bg-black/8" />
          </div>
          <div className="mt-10 space-y-10">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-black/8" />
              <div className="h-24 rounded bg-black/8" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-black/8" />
              <div className="h-24 rounded bg-black/8" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-black/8" />
              <div className="h-28 rounded bg-black/8" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
