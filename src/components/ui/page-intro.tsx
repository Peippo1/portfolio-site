type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
        {eyebrow}
      </p>
      <h1 className="font-editorial mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:mt-6 sm:text-[1.05rem]">
        {description}
      </p>
    </header>
  );
}
