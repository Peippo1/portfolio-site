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

export type WritingEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
};
