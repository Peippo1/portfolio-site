import { Container } from "@/components/ui/container";

export default function LoadingProjectPage() {
  return (
    <main>
      <Container className="max-w-4xl py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="h-4 w-32 rounded bg-black/8" />
          <div className="mt-5 h-12 w-full max-w-xl rounded bg-black/8" />
          <div className="mt-4 h-6 w-full max-w-2xl rounded bg-black/8" />
          <div className="mt-7 grid gap-4 border-y border-black/8 py-5 sm:grid-cols-3">
            <div className="h-12 rounded bg-black/8" />
            <div className="h-12 rounded bg-black/8" />
            <div className="h-12 rounded bg-black/8" />
          </div>
          <div className="mt-9 space-y-9">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-black/8" />
              <div className="h-24 rounded bg-black/8" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-black/8" />
              <div className="h-24 rounded bg-black/8" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-28 rounded bg-black/8" />
              <div className="h-28 rounded bg-black/8" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
