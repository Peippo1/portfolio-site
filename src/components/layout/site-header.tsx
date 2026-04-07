export function SiteHeader() {
  return (
    <header className="px-6 py-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <span className="text-sm font-medium">Dev Portfolio</span>

        <nav className="flex items-center gap-6 text-sm text-black/70">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/writing">Writing</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  );
}