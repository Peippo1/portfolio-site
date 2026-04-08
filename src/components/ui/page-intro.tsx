type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-muted)] uppercase">
        {eyebrow}
      </p>
      <h1 className="font-editorial mt-5 text-4xl leading-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        {description}
      </p>
    </header>
  );
}
