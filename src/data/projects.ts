import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "campaignforge-ai",
    title: "CampaignForge-AI",
    shortSummary:
      "An AI-assisted campaign planning workspace for generating briefs, audience angles, and channel-specific content from a shared strategy model.",
    longSummary:
      "CampaignForge-AI was built to reduce the manual overhead of turning a product narrative into repeatable campaign assets. The system centers on structured inputs, reusable prompt chains, and reviewable outputs so strategy, copy, and distribution logic stay aligned as campaigns move from planning into execution.",
    category: "AI Products",
    year: "2026",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/Peippo1/CampaignForge-AI",
    demoUrl: "https://campaignforge-ai.example.com",
    problem:
      "Marketing teams often move between separate tools for planning, drafting, and adaptation, which makes campaign reasoning difficult to preserve and hard to reuse.",
    solution:
      "I designed a single workflow that stores campaign intent as structured data, then uses LLM-driven generation to produce editable outputs for briefs, messaging variants, and channel executions.",
    highlights: [
      "Modeled campaign inputs as reusable strategy objects instead of one-off prompts.",
      "Built staged generation flows with explicit human review points.",
      "Created output templates for email, paid social, and landing page copy.",
      "Kept the interface text-first to support fast editorial revision.",
    ],
    status: "Active development",
  },
  {
    slug: "streamsense",
    title: "StreamSense",
    shortSummary:
      "A real-time analytics system for ingesting event streams, enriching records, and surfacing operational signals through lightweight dashboards and APIs.",
    longSummary:
      "StreamSense explores how streaming infrastructure and applied analytics can be combined into a focused operational product. The project emphasizes ingestion reliability, event normalization, and clear downstream access patterns so teams can observe systems without building a bespoke reporting path for each use case.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["TypeScript", "Node.js", "Kafka", "ClickHouse", "React"],
    featured: true,
    githubUrl: "https://github.com/timfinch/streamsense",
    demoUrl: "https://streamsense.example.com",
    problem:
      "Teams collecting high-volume operational events often end up with data in motion but very little usable visibility, especially when metrics and debugging views evolve separately.",
    solution:
      "I built a pipeline that ingests raw events, applies normalization and enrichment, and exposes the results through both query endpoints and a compact monitoring interface.",
    highlights: [
      "Implemented event contracts to reduce downstream schema drift.",
      "Added enrichment steps for metadata tagging and anomaly context.",
      "Designed a query path optimized for recent operational windows.",
      "Focused the UI on trends, spikes, and failure clusters rather than generic BI patterns.",
    ],
    status: "Prototype",
  },
  {
    slug: "trendnest",
    title: "TrendNest",
    shortSummary:
      "A trend discovery and clustering tool that turns noisy social, search, and content signals into structured topic views for research and planning.",
    longSummary:
      "TrendNest was built as a compact data product for gathering weak signals from multiple sources and organizing them into something that can support product, content, or campaign decisions. The emphasis is on ingestion quality, clustering logic, and a representation layer that makes trend movement legible without overstating certainty.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["Python", "FastAPI", "PostgreSQL", "Embeddings", "Next.js"],
    featured: true,
    githubUrl: "https://github.com/timfinch/trendnest",
    problem:
      "Trend research usually mixes spreadsheets, screenshots, and intuition, which makes it difficult to compare sources or explain why a signal was considered meaningful.",
    solution:
      "I built a service that ingests heterogeneous signals, groups related items into topic clusters, and presents them through a reviewable interface with source-level traceability.",
    highlights: [
      "Combined structured and unstructured source ingestion in one pipeline.",
      "Used embedding-based grouping to reduce duplicate topic discovery.",
      "Stored source references for each cluster to support manual verification.",
      "Designed scoring signals for velocity, recurrence, and cross-source agreement.",
    ],
    status: "In use",
  },
  {
    slug: "creative-automation-pipeline-poc",
    title: "creative-automation-pipeline-poc",
    shortSummary:
      "A proof of concept for automating creative asset generation, transformation, and packaging across multiple campaign formats.",
    longSummary:
      "This project tested whether a creative workflow could be decomposed into a reliable pipeline instead of a collection of manual handoffs. The work focused on orchestration, asset transformation rules, and queue-based processing to understand where automation could help without introducing brittle outputs into production design work.",
    category: "Experiments",
    year: "2024",
    stack: ["Node.js", "TypeScript", "Queues", "FFmpeg", "Cloud Storage"],
    featured: false,
    githubUrl: "https://github.com/timfinch/creative-automation-pipeline-poc",
    problem:
      "Creative operations often involve repetitive resizing, formatting, export, and delivery work that is slow to do manually and awkward to scale.",
    solution:
      "I built a pipeline prototype that accepts creative job definitions, runs them through asynchronous processing stages, and outputs campaign-ready asset bundles with traceable job status.",
    highlights: [
      "Tested queue-driven orchestration for multi-step creative processing.",
      "Defined job payloads for repeatable asset generation tasks.",
      "Added failure handling around incomplete source files and malformed specs.",
      "Measured where automation saved time and where human review remained essential.",
    ],
    status: "POC",
  },
  {
    slug: "briefly",
    title: "Briefly",
    shortSummary:
      "A concise briefing generator that turns raw notes, transcripts, and links into structured summaries for internal teams and client-facing updates.",
    longSummary:
      "Briefly was designed as a small AI product for one specific communication problem: turning messy source material into useful summaries without losing essential detail. The engineering work centered on source handling, prompt structure, and output formatting so generated briefs stayed readable, scoped, and easy to edit.",
    category: "AI Products",
    year: "2024",
    stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/timfinch/briefly",
    demoUrl: "https://briefly.example.com",
    problem:
      "Summarization tools are usually either too generic or too verbose, which makes them weak fits for recurring briefing workflows used by small teams.",
    solution:
      "I built a focused summarization product that accepts raw materials, applies structured prompting, and returns short brief formats tuned for standups, account updates, and decision reviews.",
    highlights: [
      "Created multiple output modes with stable section structures.",
      "Handled long inputs through chunking and staged synthesis.",
      "Optimized the UI for quick review and direct editing after generation.",
      "Kept configuration minimal so repeat usage stayed fast.",
    ],
    status: "Shipped",
  },
  {
    slug: "smart-reply-service",
    title: "Smart-Reply-Service",
    shortSummary:
      "A backend service for generating context-aware suggested replies from conversation history, user metadata, and product-specific response rules.",
    longSummary:
      "Smart-Reply-Service was built as an API-first component intended to sit inside existing messaging or support products. The main engineering work involved request shaping, response constraints, and service-level reliability so generated suggestions could be integrated safely into user-facing workflows.",
    category: "APIs & Services",
    year: "2023",
    stack: ["Node.js", "TypeScript", "Fastify", "Redis", "OpenAI"],
    featured: false,
    githubUrl: "https://github.com/timfinch/smart-reply-service",
    problem:
      "Embedding reply generation directly into product code tends to couple prompt logic, context assembly, and delivery concerns in ways that are difficult to test or reuse.",
    solution:
      "I separated the capability into a dedicated service with typed request contracts, configurable prompt policies, and response guards designed for downstream product integration.",
    highlights: [
      "Built a stateless API layer with clear request and response schemas.",
      "Added prompt policy controls for tone, length, and exclusion rules.",
      "Used caching for repeated context assembly paths.",
      "Designed the service to plug into messaging and support workflows without frontend coupling.",
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
