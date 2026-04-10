import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "campaignforge-ai",
    title: "CampaignForge AI",
    shortSummary:
      "An AI pipeline that turns a single brief into marketing strategy, copy, and creative concepts.",
    longSummary:
      "CampaignForge AI is an end-to-end pipeline for generating marketing strategy, copy, and creative concepts from one brief. It keeps the workflow structured so the outputs stay consistent and usable.",
    category: "AI Products",
    year: "2026",
    stack: ["FastAPI", "Streamlit", "Gemini", "OpenAI-compatible JSON", "Docker"],
    featured: true,
    githubUrl: "https://github.com/Peippo1/CampaignForge-AI",
    problem:
      "Campaign teams often split strategy, copywriting, and creative direction across separate tools, which makes the work slow and inconsistent.",
    solution:
      "I use structured inputs and staged generation so each step stays consistent, controllable, and usable in practice.",
    highlights: [
      "Designed a multi-stage pipeline with enforced structure across outputs.",
      "Reduced ad-hoc prompting by making each workflow stage explicit.",
      "Built an API-first system that can plug into other tools and workflows.",
      "Kept the outputs structured, consistent, and ready for downstream use.",
    ],
    status: "In progress",
  },
  {
    slug: "streamsense",
    title: "StreamSense",
    shortSummary:
      "A real-time analytics system that turns event streams into operational signals for dashboards and APIs.",
    longSummary:
      "StreamSense is a real-time analytics system that turns event streams into operational signals for dashboards and APIs. It keeps ingestion, normalization, and access in one pipeline so teams can see what is happening without building a separate reporting layer.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["TypeScript", "Node.js", "Kafka", "ClickHouse", "React"],
    featured: true,
    githubUrl: "https://github.com/timfinch/streamsense",
    problem:
      "Teams can collect a lot of operational data and still have little visibility when metrics and debugging views live in different places.",
    solution:
      "I built a pipeline that normalizes incoming events, enriches them with context, and exposes the results through query endpoints and a compact monitoring view.",
    highlights: [
      "Defined event contracts to keep downstream schema drift low.",
      "Added enrichment for metadata tagging and anomaly context.",
      "Built a query path tuned for recent operational windows.",
      "Kept the UI focused on trends, spikes, and failure clusters.",
    ],
    status: "Prototype",
  },
  {
    slug: "trendnest",
    title: "TrendNest",
    shortSummary:
      "A trend discovery tool that clusters noisy social, search, and content signals into structured topic views.",
    longSummary:
      "TrendNest is a trend discovery tool that gathers weak signals from multiple sources and organizes them into topic views for product, content, and campaign decisions. It keeps ingestion quality, clustering, and presentation aligned so the signal stays readable without overstating certainty.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["Python", "FastAPI", "PostgreSQL", "Embeddings", "Next.js"],
    featured: true,
    githubUrl: "https://github.com/timfinch/trendnest",
    problem:
      "Trend research often ends up split across spreadsheets, screenshots, and intuition, which makes it hard to compare sources or explain why a signal matters.",
    solution:
      "I built a service that ingests mixed signals, groups related items into topic clusters, and presents them through a reviewable interface with source-level traceability.",
    highlights: [
      "Combined structured and unstructured source ingestion in one pipeline.",
      "Used embedding-based grouping to reduce duplicate topic discovery.",
      "Stored source references for each cluster to support manual review.",
      "Scored velocity, recurrence, and cross-source agreement.",
    ],
    status: "In use",
  },
  {
    slug: "creative-automation-pipeline-poc",
    title: "Creative Automation Pipeline",
    shortSummary:
      "A queue-based pipeline that automates creative asset generation, transformation, and packaging.",
    longSummary:
      "Creative Automation Pipeline is a queue-based system that automates creative asset generation, transformation, and packaging. It turns a repetitive workflow into a reliable process without making the outputs brittle.",
    category: "Experiments",
    year: "2024",
    stack: ["Node.js", "TypeScript", "Queues", "FFmpeg", "Cloud Storage"],
    featured: false,
    githubUrl: "https://github.com/timfinch/creative-automation-pipeline-poc",
    problem:
      "Creative operations often repeat the same resizing, formatting, export, and delivery work, which is slow to do by hand and awkward to scale.",
    solution:
      "I built a pipeline prototype that accepts creative jobs, runs them through asynchronous stages, and outputs asset bundles with traceable status.",
    highlights: [
      "Tested queue-driven orchestration for multi-step creative processing.",
      "Defined job payloads for repeatable asset generation.",
      "Added failure handling for incomplete source files and malformed specs.",
      "Checked where automation saved time and where review was still needed.",
    ],
    status: "Proof of concept",
  },
  {
    slug: "briefly",
    title: "Briefly",
    shortSummary:
      "A briefing generator that turns notes, transcripts, and links into structured summaries for teams and clients.",
    longSummary:
      "Briefly is a briefing generator that turns notes, transcripts, and links into short summaries for teams and clients. It keeps the workflow focused on source handling, prompt structure, and output formatting so the result stays readable and easy to edit.",
    category: "AI Products",
    year: "2024",
    stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/timfinch/briefly",
    problem:
      "Summarization tools are often too generic or too verbose for recurring briefing workflows used by small teams.",
    solution:
      "I built a focused summarization product that accepts raw materials, applies structured prompting, and returns short formats tuned for standups, account updates, and decision reviews.",
    highlights: [
      "Created output modes with stable section structures.",
      "Handled long inputs through chunking and staged synthesis.",
      "Optimized the UI for quick review and direct editing.",
      "Kept configuration minimal so repeat use stayed fast.",
    ],
    status: "Shipped",
  },
  {
    slug: "smart-reply-service",
    title: "Smart Reply Service",
    shortSummary:
      "A backend service that generates context-aware reply drafts from conversation history, user metadata, and response rules.",
    longSummary:
      "Smart Reply Service is a backend service that generates context-aware reply drafts for messaging and support products. It keeps request shaping, response constraints, and service reliability in one place so suggestions can be integrated safely.",
    category: "APIs & Services",
    year: "2023",
    stack: ["Node.js", "TypeScript", "Fastify", "Redis", "OpenAI"],
    featured: false,
    githubUrl: "https://github.com/timfinch/smart-reply-service",
    problem:
      "Reply generation is hard to maintain when prompt logic, context assembly, and delivery live inside the product codebase.",
    solution:
      "I separated the capability into a dedicated service with typed request contracts, prompt policies, and response guards for downstream integration.",
    highlights: [
      "Built a stateless API layer with clear request and response schemas.",
      "Added prompt controls for tone, length, and exclusion rules.",
      "Used caching for repeated context assembly paths.",
      "Designed the service to plug into messaging and support workflows cleanly.",
    ],
    status: "Maintained",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(count = 3) {
  return projects.filter((project) => project.featured).slice(0, count);
}
