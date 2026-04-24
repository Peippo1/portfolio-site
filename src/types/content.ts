export type Project = {
  slug: string;
  title: string;
  shortSummary: string;
  longSummary: string;
  category: "AI Products" | "Data & Analytics" | "APIs & Services" | "Experiments";
  year: string;
  stack: string[];
  featured: boolean;
  githubUrl: string;
  demoUrl?: string;
  problem: string;
  solution: string;
  highlights: string[];
  status: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  content: string;
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type QuoteBlock = {
  type: "quote";
  content: string;
  attribution?: string;
};

export type DiagramBlock = {
  type: "diagram";
  language: "text";
  content: string;
  caption?: string;
};

export type WritingParagraphBlock = ParagraphBlock;
export type WritingListBlock = ListBlock;
export type WritingQuoteBlock = QuoteBlock;
export type WritingDiagramBlock = DiagramBlock;

export type WritingSectionBlock =
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | DiagramBlock;

export type WritingBlock = WritingSectionBlock;

export type WritingSection = {
  title: string;
  blocks: WritingSectionBlock[];
};

export type WritingSeriesSlug = "hoxa-build-thread";

export type WritingSeries = {
  slug: WritingSeriesSlug;
  name: string;
  description: string;
  order: number;
  previousSlug?: string;
  nextSlug?: string;
};

export type WritingPullQuote = {
  quote: string;
  attribution?: string;
};

export type WritingEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  intro?: string;
  readingTime?: string;
  pullQuote?: WritingPullQuote;
  series?: WritingSeries;
  sections?: WritingSection[];
};
