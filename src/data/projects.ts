import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "hoxa",
    title: "Hoxa",
    shortSummary:
      "A calmer fitness product for people who want structure, progress, and less noise.",
    longSummary:
      "Hoxa is a fitness product for people who want to get stronger and move more confidently without the performance theatre that so much fitness software leans on. It brings running, strength, mobility, balance, and recovery into one training loop, with a FastAPI backend and an adaptive engine that responds to adherence, effort, and context while explaining its decisions in plain language.",
    category: "AI Products",
    year: "2026",
    stack: ["SwiftUI", "SwiftData", "FastAPI", "OpenAI", "TypeScript"],
    featured: true,
    githubUrl: "Coming soon",
    problem:
      "A lot of fitness products lose people before training becomes useful because they assume the user already feels like an athlete. The language, design, and intensity cues often create pressure before they create confidence.",
    solution:
      "Hoxa uses a calmer tone, a broader training system, and an adaptive engine that responds to real-world signals like fatigue, missed sessions, and a messy week without turning those moments into failure. The product explains why the plan changes instead of hiding the logic.",
    highlights: [
      "Designing a multi-mode training system covering running, strength, mobility, balance, and recovery.",
      "Building an adaptive training engine that adjusts plans based on adherence, effort, and context signals.",
      "Keeping the product tone measured and non-performative to lower friction for beginner and intermediate users.",
      "Planning integrations with Apple Health, Apple Watch, and Garmin for richer context over time.",
    ],
    status: "In design",
  },
  {
    slug: "cityscout",
    title: "CityScout",
    shortSummary:
      "A city-first travel companion that helps people plan with more context and less friction.",
    longSummary:
      "CityScout is a native iOS travel app built around a simple idea: travel feels better when the product understands the city, not just the booking. The iOS app keeps trip state close to the device, while a FastAPI backend handles itinerary generation, guide chat, and structured AI outputs behind a shared-secret auth boundary. A future web layer will support planning and sharing.",
    category: "AI Products",
    year: "2026",
    stack: ["SwiftUI", "SwiftData", "FastAPI", "OpenAI", "Next.js"],
    featured: true,
    githubUrl: "Coming soon",
    problem:
      "Travel planning usually ends up scattered across maps, bookings, reviews, notes, and too many open tabs. Most tools are good at booking things, not at helping someone actually feel oriented.",
    solution:
      "CityScout brings discovery, planning, and trip-time reference into one product. The iOS app stays close to the device, while the backend keeps AI calls server-side and the product contract easier to secure and evolve.",
    highlights: [
      "Built a native iOS app with SwiftUI and SwiftData for local-first trip state.",
      "Designed a FastAPI backend with dedicated itinerary generation and guide chat endpoints.",
      "Kept OpenAI calls server-side behind shared-secret auth to avoid client credential exposure.",
      "Planned a Next.js web layer that reuses the same API contract for planning and sharing.",
    ],
    status: "Active prototype",
  },
  {
    slug: "creatoros",
    title: "CreatorOS",
    shortSummary:
      "A strategy-first AI system for creators who are tired of generic output.",
    longSummary:
      "CreatorOS is an AI operating system for creators and internet brands. It turns source material into a Creator Growth Pack, with audience intelligence, strategy, and repurposing kept as separate stages so the output stays useful instead of collapsing into generic writing.",
    category: "AI Products",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "OpenAI", "Zod", "Vitest"],
    featured: true,
    githubUrl: "https://github.com/Peippo1/CreatorOS",
    demoUrl: "TODO: add live demo URL",
    problem:
      "Creators and internet brands spend too much time deciding what to make, how to adapt source material, and which content gaps are actually worth chasing.",
    solution:
      "CreatorOS breaks the work into structured stages so the system can think about audience intelligence, content gaps, platform-aware strategy, and repurposing separately instead of flattening everything into one generic writing flow.",
    highlights: [
      "Designed a multi-agent workflow from transcript input to a Creator Growth Pack.",
      "Kept audience intelligence and content strategy separate from repurposing output.",
      "Used structured JSON outputs and Zod schemas to keep responses predictable.",
      "Added a mock fallback so the prototype stays usable without an OpenAI key.",
    ],
    status: "Active prototype",
  },
  {
    slug: "evalkit",
    title: "EvalKit",
    shortSummary:
      "A product for catching LLM regressions before they become user problems.",
    longSummary:
      "EvalKit is a multi-tenant SaaS for regression testing LLM behavior. It gives teams a deterministic engine built around suites, cases, checks, and runs so they can catch schema drift, forbidden content, length regressions, and silent capability loss before those changes reach users.",
    category: "AI Products",
    year: "2026",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Neon", "Stripe", "Railway"],
    featured: false,
    githubUrl: "https://github.com/Peippo1/EvalKit",
    problem:
      "LLM features drift in ways that are easy to miss in a quick review. Most teams do not have a repeatable way to measure whether the output still meets the product contract over time.",
    solution:
      "EvalKit turns evaluation into a workflow teams can actually live with: define suites and cases, attach checks, run them, and review regressions before they ship.",
    highlights: [
      "Built a deterministic check engine for repeatable regression tests.",
      "Designed the SaaS for multi-tenant projects and scoped access.",
      "Handled billing, metering, and webhook-driven subscription state.",
      "Shipped a Railway deployment path without Docker to keep iteration fast.",
    ],
    status: "Active prototype",
  },
  {
    slug: "campaignforge-ai",
    title: "CampaignForge AI",
    shortSummary:
      "A structured AI pipeline that takes one brief and turns it into a full campaign starting point.",
    longSummary:
      "CampaignForge AI is an end-to-end pipeline for generating marketing strategy, copy, and creative concepts from one brief. The workflow is intentionally structured so the outputs stay consistent and usable instead of reading like disconnected prompt results.",
    category: "AI Products",
    year: "2026",
    stack: ["FastAPI", "Streamlit", "Gemini", "OpenAI-compatible JSON", "Docker"],
    featured: true,
    githubUrl: "https://github.com/Peippo1/CampaignForge-AI",
    problem:
      "Campaign teams often split strategy, copywriting, and creative direction across separate tools, which makes the work slower, less consistent, and harder to review.",
    solution:
      "I use structured inputs and staged generation so each step stays controllable, easier to review, and actually usable in practice.",
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
      "A real-time analytics system for turning raw event streams into something a team can act on.",
    longSummary:
      "StreamSense is a real-time analytics system that turns event streams into operational signals for dashboards and APIs. It keeps ingestion, normalization, and access in one pipeline so teams can see what is happening without stitching together a separate reporting layer.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["TypeScript", "Node.js", "Kafka", "ClickHouse", "React"],
    featured: true,
    githubUrl: "https://github.com/timfinch/streamsense",
    problem:
      "Teams can collect a lot of operational data and still have poor visibility when metrics, logs, and debugging views live in different places.",
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
      "A tool for turning messy trend signals into topic views that are easier to trust.",
    longSummary:
      "TrendNest is a trend discovery tool that gathers weak signals from multiple sources and organizes them into topic views for product, content, and campaign decisions. It keeps ingestion quality, clustering, and presentation aligned so the signal stays readable without pretending it is more certain than it is.",
    category: "Data & Analytics",
    year: "2025",
    stack: ["Python", "FastAPI", "PostgreSQL", "Embeddings", "Next.js"],
    featured: true,
    githubUrl: "https://github.com/timfinch/trendnest",
    problem:
      "Trend research often ends up split across spreadsheets, screenshots, and intuition, which makes it hard to compare sources or explain why something matters.",
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
      "A queue-based pipeline for the repetitive creative ops work nobody should have to do by hand.",
    longSummary:
      "Creative Automation Pipeline is a queue-based system that automates creative asset generation, transformation, and packaging. It turns a repetitive workflow into something more reliable without making the outputs brittle.",
    category: "Experiments",
    year: "2024",
    stack: ["Node.js", "TypeScript", "Queues", "FFmpeg", "Cloud Storage"],
    featured: false,
    githubUrl: "https://github.com/timfinch/creative-automation-pipeline-poc",
    problem:
      "Creative operations often repeat the same resizing, formatting, export, and delivery work, which is slow by hand and awkward to scale.",
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
      "A focused briefing tool for turning raw material into something a team can use quickly.",
    longSummary:
      "Briefly is a briefing generator that turns notes, transcripts, and links into short summaries for teams and clients. It stays focused on source handling, prompt structure, and output formatting so the result feels readable and easy to edit.",
    category: "AI Products",
    year: "2024",
    stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/timfinch/briefly",
    problem:
      "Summarization tools are often too generic or too verbose for the recurring briefing workflows small teams actually run.",
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
      "A backend service for generating reply drafts without burying the logic inside the app.",
    longSummary:
      "Smart Reply Service is a backend service that generates context-aware reply drafts for messaging and support products. It keeps request shaping, response constraints, and service reliability in one place so reply suggestions can be integrated safely.",
    category: "APIs & Services",
    year: "2023",
    stack: ["Node.js", "TypeScript", "Fastify", "Redis", "OpenAI"],
    featured: false,
    githubUrl: "https://github.com/timfinch/smart-reply-service",
    problem:
      "Reply generation gets hard to maintain when prompt logic, context assembly, and delivery all live inside the product codebase.",
    solution:
      "I pulled the capability into a dedicated service with typed request contracts, prompt policies, and response guards so downstream products could integrate it more safely.",
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
