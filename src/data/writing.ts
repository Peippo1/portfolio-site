import type {
  DiagramBlock,
  LinkListBlock,
  ListBlock,
  ParagraphBlock,
  QuoteBlock,
  WritingEntry,
  WritingSectionBlock,
  WritingSeriesSlug,
  WritingSection,
} from "@/types/content";

const hoxaSeriesSlug: WritingSeriesSlug = "hoxa-build-thread";
const hoxaSeriesName = "Hoxa Build Thread";
const hoxaSeriesDescription =
  "A running record of how Hoxa is taking shape, from the product idea through the training system and architecture.";
const cityScoutSeriesSlug: WritingSeriesSlug = "cityscout-build-thread";
const cityScoutSeriesName = "CityScout Build Thread";
const cityScoutSeriesDescription =
  "A build thread on building a calmer, city-first travel product across iOS, backend, and a future web planning layer.";
const creatorOSSeriesSlug: WritingSeriesSlug = "creatoros-build-thread";
const creatorOSSeriesName = "CreatorOS Build Thread";
const creatorOSSeriesDescription =
  "A build thread on building CreatorOS, from the product thesis through the agent system and evaluation approach.";
const evalKitSeriesSlug: WritingSeriesSlug = "evalkit-build-thread";
const evalKitSeriesName = "EvalKit Build Thread";
const evalKitSeriesDescription =
  "A build thread on turning EvalKit into a real product, from the evaluation argument through the FastAPI engine and SaaS plumbing.";
const campaignForgeSeriesSlug: WritingSeriesSlug = "campaignforge-build-thread";
const campaignForgeSeriesName = "CampaignForge AI Build Thread";
const campaignForgeSeriesDescription =
  "A build thread on turning CampaignForge AI from a broad prototype into a smaller, more credible product that could actually be sold.";

export const cityScoutSummary = {
  oneLine:
    "CityScout is a city-first travel companion with a local-first iOS app and a shared AI backend.",
  readerFacing:
    "CityScout is built around a simple idea: travel feels better when the product understands the city, not just the booking. The iOS app keeps trip state close to the device, while a FastAPI backend handles itinerary generation, guide chat, and structured AI outputs. A future web layer will support planning and sharing, but iOS remains the in-trip companion.",
  technical:
    "CityScout is a native iOS travel app with a FastAPI backend and a shared AI contract. OpenAI calls stay server-side behind shared-secret auth, with seeded city content and structured endpoints for itineraries and guide chat. The product is being shaped for security, testability, and a future web planning layer.",
};

export const hoxaSummary = {
  oneLine:
    "Hoxa is a calmer fitness product for people who want structure without the usual performance noise.",
  readerFacing:
    "Hoxa is built around a broader view of fitness than a single training mode. The app supports running, strength, mobility, balance, and recovery in one planning loop, with an adaptive engine that adjusts plans based on adherence, effort, and context signals while explaining its reasoning in plain language.",
};

export const creatorOSSummary = {
  oneLine:
    "CreatorOS is a strategy-first AI system that helps creators turn source material into useful next steps.",
  readerFacing:
    "CreatorOS started from a simple question: what reduces the decision fatigue a creator carries every week? The product uses a structured multi-agent workflow to turn transcript input into a Creator Growth Pack, keeping audience intelligence, content strategy, and repurposing as separate steps so the output stays useful and strategically grounded.",
};

export const evalkitSummary = {
  oneLine:
    "EvalKit is a product for catching LLM regressions before they quietly reach users.",
  readerFacing:
    "EvalKit was shaped around a practical problem: LLM features drift in ways that are hard to catch by hand. The product gives teams a deterministic workflow for defining suites, cases, checks, and runs so output quality can be measured before users feel the regression.",
  technical:
    "EvalKit is a multi-tenant SaaS built around a deterministic FastAPI check engine, SQLAlchemy models, Neon Postgres, Stripe billing, and Railway deployment. The system keeps evaluation logic, tenancy, metering, and webhook-driven subscription state explicit and testable.",
};

export const campaignForgeSummary = {
  oneLine:
    "CampaignForge AI is a structured campaign-planning workflow that turns one brief into a usable marketing starting point.",
  readerFacing:
    "CampaignForge AI started as a broad prototype for turning one brief into strategy, copy, and creative direction. The product work now is about narrowing it into something smaller, more credible, and easier to sell without pretending it is already a full platform.",
  technical:
    "CampaignForge AI currently combines a FastAPI backend, a Streamlit surface, staged generation, and structured outputs. The next product questions are less about adding features and more about storage, auth, hosted safety, and deciding which commercial path deserves to exist first.",
};

function section(title: string, blocks: WritingSectionBlock[]): WritingSection {
  return { title, blocks };
}

function paragraph(content: string): ParagraphBlock {
  return { type: "paragraph", content };
}

function list(items: string[]): ListBlock {
  return { type: "list", items };
}

function quote(content: string, attribution?: string): QuoteBlock {
  return { type: "quote", content, attribution };
}

function diagram(content: string, caption?: string): DiagramBlock {
  return { type: "diagram", language: "text", content, caption };
}

function links(items: LinkListBlock["items"]): LinkListBlock {
  return { type: "links", items };
}

const hoxaEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "why-im-building-hoxa",
    title: "Why I'm Building Hoxa",
    date: "April 12, 2026",
    category: "Product Strategy",
    summary:
      "Hoxa starts from a simple observation: a lot of fitness products ask for confidence before they do enough to help someone build it.",
    intro:
      "I am building Hoxa because I want fitness software to feel more companionable, more legible, and less theatrical. It is for people who want to get stronger, move more confidently, and train consistently without stepping into the visual and emotional language that still dominates much of the category.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "The only person you need to be better than is the person you were yesterday",
    },
    sections: [
      section("The Gap I Keep Seeing", [
        paragraph(
          "A lot of consumer fitness software assumes the hard part is motivation. I think the harder problem is interpretation. People open an app because they want help translating a vague intention into a week of concrete action: what should I do today, how hard should it feel, and how do I know whether I am progressing without overreaching."
        ),
        paragraph(
          "Many products answer that uncertainty with volume. More badges, more intensity cues, more declarations about transformation. That can work for users who already identify as athletes, but it often creates distance for people who are still building trust in their own capacity. The product ends up speaking a language the user has not chosen."
        ),
      ]),
      section("A Different Product Thesis", [
        paragraph(
          "Hoxa is built around a broader view of fitness than a single training mode. The product needs to support running, strength, mobility, balance, and recovery because real users do not experience those domains separately. Someone preparing for a half marathon may also need better hip mobility, a more reliable strength routine, and a calmer way to recover after a difficult week."
        ),
        paragraph(
          "That mix matters more for beginner to intermediate users than it does for specialists. At this stage, the right product is not the one that optimises a single training metric in isolation. It is the one that helps a person build a sustainable relationship with movement across different contexts: at home, in a gym, and out on a run."
        ),
        list([
          "Running support should cover first 5K plans through half marathon preparation.",
          "Strength should work for users with minimal equipment as well as full gym access.",
          "Mobility, balance, and recovery should be treated as primary programming elements, not as decorative add-ons.",
          "Social accountability should feel supportive and lightweight rather than performative.",
        ]),
      ]),
      section("Tone Is Product Logic", [
        paragraph(
          "The emotional tone of a fitness app is not a branding layer added after the system works. It shapes whether the system can work at all. If the language feels macho, punishing, or relentlessly optimised, many users will edit themselves around the product instead of using it honestly. They will skip the app on tired weeks, overstate what they completed, or quietly disengage."
        ),
        paragraph(
          "A calmer tone is not about being soft or vague. It is about creating a system that can absorb ordinary life. The product should be able to say: you slept badly, your week got messy, your legs are heavy today, and the plan can still make sense. That is a much more credible promise than pretending consistency means perfect adherence."
        ),
      ]),
      section("What I Want Hoxa To Become", [
        paragraph(
          "Later, Hoxa should become better at understanding context through workout history, Apple Health and Apple Watch data, Garmin data, and calendar signals. But the point of those integrations is not to look sophisticated. The point is to reduce guesswork while keeping the product legible. If a future system adapts, it should be able to explain why it adapted in plain language."
        ),
        paragraph(
          "That is the thread I want this project to hold. Hoxa should feel elegant and intelligent, but never intimidating. It should help users build capability without asking them to adopt the identity or rhetoric that so often comes bundled with fitness software."
        ),
      ]),
    ],
  },
  {
    slug: "designing-a-calmer-fitness-app",
    title: "Designing a Calmer Fitness App",
    date: "April 14, 2026",
    category: "Product Design",
    summary:
      "The visual and interaction tone of Hoxa has to lower friction without flattening ambition. Calm should come from clear priorities, not from sanding the product down until it feels generic.",
    intro:
      "When people say they want a fitness app that feels motivating, they often mean they want one that keeps momentum without making them feel judged. That distinction matters. Hoxa should not look or behave like a digital coach yelling from the edge of the screen.",
    readingTime: "9 min read",
    pullQuote: {
      quote:
        "A calmer interface does not remove ambition. It removes unnecessary noise around ambition.",
    },
    sections: [
      section("Designing For Honesty", [
        paragraph(
          "Good training software needs honest inputs. It needs people to admit when they are tired, when they missed two sessions, when their knee feels questionable, or when a planned gym day became twenty minutes at home. That kind of honesty is easier to get from an interface that feels measured and respectful."
        ),
        paragraph(
          "A surprising amount of product design pushes in the opposite direction. Loud celebratory states, rigid streak logic, and constant upward arrows imply that the ideal user is always accelerating. For Hoxa, the ideal user is someone building rhythm over time. The interface should reinforce steadiness rather than urgency."
        ),
      ]),
      section("Visual Restraint With Enough Warmth", [
        paragraph(
          "I want Hoxa to feel premium, but not sterile. That means using typography, spacing, and contrast to create room around the content, rather than relying on the familiar fitness pattern of maximal colour, oversized metrics, and competitive visual language. A calmer product can still feel precise. In fact, precision usually reads more clearly when the design is not competing with the content."
        ),
        paragraph(
          "Warmth matters too. If the interface becomes too clinical, it starts to resemble a reporting dashboard rather than a personal training companion. The right balance is something like quiet confidence: enough polish to feel intentional, enough softness to feel human, and enough structure to keep the user oriented."
        ),
        list([
          "Primary screens should answer one question clearly, not six at once.",
          "Progress should be visible without turning every visit into a performance review.",
          "Recovery and mobility sessions should receive the same design respect as harder workouts.",
          "Empty states should reassure the user that starting small is a valid start.",
        ]),
      ]),
      section("One Product, Several Contexts", [
        paragraph(
          "Hoxa has to work across home workouts, gym workouts, and running goals up to half marathon. That does not mean showing the same interface everywhere. It means maintaining a consistent product voice while adapting the interaction to the moment. A user preparing for a run needs a different kind of orientation than someone opening the app on the gym floor between sets."
        ),
        paragraph(
          "The design challenge is to preserve continuity between these modes. Strength days should still feel connected to running goals. Recovery should not feel like an interruption to the plan. Home sessions should not feel like a degraded fallback. The product has to present all of these as valid expressions of a coherent training system."
        ),
      ]),
      section("Calm Requires Editorial Judgment", [
        paragraph(
          "The easiest way to make software feel calm is to remove information. That is also how you make it less useful. The harder task is editorial: deciding what belongs at each moment, in what order, with what emphasis, and with what explanation. Calm design is usually a consequence of sharper judgement, not less content."
        ),
        quote(
          "If the interface cannot explain the day clearly, the plan itself is probably still too vague.",
          "Design note"
        ),
        paragraph(
          "That principle will matter more as Hoxa becomes more adaptive. If the system starts reshaping plans based on recent history, the interface has to translate those changes without drama. The user should feel guided, not handled."
        ),
      ]),
    ],
  },
  {
    slug: "structuring-the-hoxa-mvp",
    title: "Structuring the Hoxa MVP",
    date: "April 16, 2026",
    category: "Product Strategy",
    summary:
      "The MVP should be broad enough to show the product thesis, but narrow enough that every feature earns its place in the training loop.",
    intro:
      "Fitness products become confusing quickly when they try to simulate completeness too early. Hoxa needs an MVP that is intentionally shaped: enough surface area to prove the training system, enough restraint to keep the first version coherent.",
    readingTime: "8 min read",
    sections: [
      section("What The First Version Must Prove", [
        paragraph(
          "The MVP does not need to prove that Hoxa can become a full health platform. It needs to prove that the core planning loop is helpful. A user should be able to define a goal, receive a weekly structure that fits their context, complete workouts across different environments, and feel the plan respond sensibly over time."
        ),
        paragraph(
          "That means the first release has to demonstrate coherence more than coverage. Running, strength, mobility, balance, and recovery all belong in scope because they are part of the product thesis. But each one should appear only insofar as it strengthens the main loop: assess, plan, complete, adapt, reflect."
        ),
      ]),
      section("What Belongs In V1", [
        list([
          "Goal-based onboarding for beginner to intermediate users, including general fitness and running goals up to half marathon.",
          "Support for home, gym, and mixed training contexts.",
          "Weekly planning with clear daily session types and rationale.",
          "Workout completion logging with enough detail to drive sensible adaptation.",
          "Recovery-aware adjustments when adherence, fatigue, or schedule changes suggest the plan should shift.",
          "Lightweight accountability features that reinforce follow-through without turning the product into a social feed.",
        ]),
        paragraph(
          "This set is enough to prove the core loop without asking Hoxa to be everything at once. It allows the product to express a gentler view of training while still giving users real structure. It also creates the right data foundation for future adaptation, because the plan and the completion loop are both present from the start."
        ),
      ]),
      section("What Should Wait", [
        paragraph(
          "Several things are intentionally out of scope for the MVP. Deep device integrations, advanced coaching analytics, generative planning experiments, complex social mechanics, and broad nutrition tracking all make sense as future layers, but they would blur the first release if introduced too early."
        ),
        paragraph(
          "The practical reason to wait is focus. The more subtle reason is credibility. If Hoxa makes claims about intelligence before it can demonstrate a reliable core system, the product starts to look like it is borrowing confidence from language rather than earning it through behaviour."
        ),
      ]),
      section("Keeping Half Marathon Support Honest", [
        paragraph(
          "Supporting running goals up to half marathon is important because it expands the product from general fitness into a more concrete outcome. But that support has to be implemented carefully. The goal is not to become a specialist endurance platform in version one. The goal is to help non-elite runners train for a meaningful milestone without neglecting strength, mobility, and recovery."
        ),
        paragraph(
          "That framing changes the product decisions. The running plan should not dominate the rest of the week. It should coordinate with it. Hoxa should make the user feel like they are building a durable body that can handle the goal, not just accumulating miles because the plan says so."
        ),
      ]),
    ],
  },
  {
    slug: "adaptive-training-engine-notes",
    title: "Adaptive Training Engine Notes",
    date: "April 18, 2026",
    category: "Training Systems",
    summary:
      "The training engine should adapt in visible, defensible ways. If users cannot see why the week changed, the system will feel clever before it feels trustworthy.",
    intro:
      "Adaptive training is an attractive phrase because it implies responsiveness. In practice, it can easily become a black box that changes plans without building confidence. I want Hoxa's engine to behave more like a careful editor than a magician.",
    readingTime: "10 min read",
    pullQuote: {
      quote:
        "Adaptation is only useful when the user can see the logic well enough to trust it.",
    },
    sections: [
      section("Inputs That Matter", [
        paragraph(
          "For the MVP, the most useful inputs are the ones users can actually provide or validate: stated goals, training background, available days, equipment context, completed sessions, perceived effort, and light recovery signals such as soreness or general fatigue. These are less glamorous than wearable streams, but they are enough to build a sensible adaptive loop."
        ),
        paragraph(
          "Later integrations from Apple Health, Apple Watch, Garmin, and calendar systems can sharpen context. They should not replace the visible core logic. Device data can improve judgement about load and routine, but the plan still needs to read as something a thoughtful coach might plausibly recommend, not an optimisation artefact."
        ),
      ]),
      section("How Progression Should Work", [
        paragraph(
          "Progression should be gradual, mode-aware, and constrained. A strength progression should account for movement quality and consistency, not just completed volume. A running progression should respect recent load and recovery before it increases distance or intensity. Mobility and balance work should support the rest of the system, not disappear because they are harder to quantify."
        ),
        list([
          "Increase load when adherence is steady and recovery signals are stable.",
          "Hold steady when life is busy but the current structure is still manageable.",
          "Reduce or redistribute work when fatigue, missed sessions, or scheduling friction suggest the plan is outrunning the user's capacity.",
          "Preserve continuity where possible so changes feel like refinement rather than reset.",
        ]),
      ]),
      section("Interpretability As A Product Requirement", [
        paragraph(
          "A lot of adaptive systems fail at the explanation layer. They may make plausible changes, but they do not tell the user what changed, why it changed, or what to expect next. That creates a subtle but important problem: the user stops learning from the system. They receive plans, but they do not build understanding."
        ),
        paragraph(
          "Hoxa should explain adjustment in plain language. If a long run moved, there should be a reason. If a recovery session replaced a harder day, that should be stated directly. The product should help users internalize a better training model rather than merely personalising outputs behind the curtain."
        ),
      ]),
      section("Failure Modes To Avoid", [
        quote(
          "The engine should not confuse available data with sufficient certainty.",
          "Training principle"
        ),
        paragraph(
          "There are predictable ways adaptive products become less useful. They overreact to a small number of misses. They optimise for completion at the expense of progression. They become so protective that the plan never gets meaningfully harder. Or they become so aggressive that users stop trusting the guidance. Good adaptation is a balancing act, not a constant intervention."
        ),
        paragraph(
          "The bar for Hoxa is narrower than the category often suggests. The engine does not need to behave like an oracle. It needs to become reliably good at adjusting plans for ordinary human variability while staying legible. That would already be a meaningful product advantage."
        ),
      ]),
    ],
  },
  {
    slug: "hoxa-architecture-overview",
    title: "Hoxa Architecture Overview",
    date: "April 19, 2026",
    category: "Architecture",
    summary:
      "The Hoxa architecture should support adaptation, accountability, and future integrations without turning into a tangle too early.",
    intro:
      "I want the architecture to reflect the product posture: measured, modular, and explainable. It should be capable enough to support future intelligence and integrations, but simple enough that the training logic remains inspectable while the product is still taking shape.",
    readingTime: "11 min read",
    pullQuote: {
      quote:
        "System design should make the product easier to reason about, not more impressive to describe.",
    },
    sections: [
      section("Start With The Product Loop", [
        paragraph(
          "The architecture only makes sense if it mirrors the product loop. Hoxa begins with onboarding, moves into goal and profile setup, generates a weekly plan, captures workout completion, and then updates future plans based on recent behaviour. That sequence creates the minimum structure the rest of the system needs to support."
        ),
        diagram(
          `User
  |
  v
Onboarding
  |
  v
Goal Profile
  |
  v
Training Engine
  |
  v
Weekly Plan
  |
  v
Workout Completion
  |
  v
Progress + Adaptation`,
          "Core product flow"
        ),
        paragraph(
          "Representing the loop this way is helpful because it keeps the boundaries visible. The training engine is not the whole product. It is one layer in a broader system that also has to manage identity, schedule context, completion events, progress views, and eventually integrations."
        ),
      ]),
      section("Service Boundaries", [
        paragraph(
          "For an early version, I would keep the architecture centred on a clean API layer and a small set of explicit domain services. The iOS app is likely the primary user-facing product surface. A web app can support companion experiences later, and an internal web surface can support operational tooling, content adjustments, and model inspection where useful."
        ),
        diagram(
          `iOS App -----------+
                    |
Web App -----------+---- API Layer ---- Training Engine
                    |             |
Admin Surface -----+             +---- Progress Service
                                  |
                                  +---- Social Service
                                  |
                                  +---- Integrations Layer`,
          "Primary component map"
        ),
        paragraph(
          "This structure is intentionally plain. The API layer should coordinate state transitions and keep the surface contracts stable. The training engine should focus on plan generation and adaptation. Progress should own completed sessions, streak-like continuity signals, and reporting views. Social should stay narrow and support accountability rather than becoming its own product."
        ),
      ]),
      section("Data Flow And Integrations", [
        paragraph(
          "Future integrations matter, but they should enter the system through a controlled boundary. Apple Health, Apple Watch, Garmin, and calendar sources will all carry different levels of reliability, granularity, and latency. The system should normalize those signals before they touch training logic directly."
        ),
        diagram(
          `Apple Health ----+
Apple Watch -----+
Garmin ----------+---- Integrations Layer ---- Normalized Activity Events
Calendar --------+                              |
                                                 v
                                        Progress Service
                                                 |
                                                 v
                                          Training Engine
                                                 |
                                                 v
                                               Weekly Plan`,
          "Integration and adaptation flow"
        ),
        paragraph(
          "That separation matters for safety and reasoning. The training engine should consume a stable representation of recent activity and context, not a patchwork of vendor-specific event formats. It should also be possible to inspect what the system believed happened before explaining why the plan changed."
        ),
      ]),
      section("What This Enables Later", [
        paragraph(
          "Once the boundaries are clean, later additions become more credible. Analytics can live alongside the progress layer without contaminating core plan logic. Generative AI can help translate plans, summarize trends, or explain changes without becoming the source of record. ML systems can support prediction and pattern detection, but they can remain advisory unless their role is well-validated."
        ),
        list([
          "Keep training rules and adaptation decisions inspectable in the early product.",
          "Treat AI-generated language as presentation support, not authoritative programming logic.",
          "Use service boundaries to make future integrations additive rather than destabilising.",
          "Prefer a smaller number of clear domain services over a large mesh of premature microservices.",
        ]),
        paragraph(
          "That is the main architectural goal for now: make it easy to evolve Hoxa without losing sight of how the product actually works. If the architecture obscures the training logic, it will be moving in the wrong direction."
        ),
      ]),
    ],
  },
  {
    slug: "what-ai-should-and-should-not-do-in-fitness",
    title: "What AI Should and Should Not Do in Fitness",
    date: "April 21, 2026",
    category: "Applied AI",
    summary:
      "AI can make fitness software more responsive and easier to understand, but only if its role stays narrow enough to earn trust.",
    intro:
      "There is a strong temptation to describe any adaptive product as an AI product first. I think that is usually a mistake. In fitness, especially, the useful question is not how much AI can be added. It is which jobs genuinely benefit from it without weakening trust.",
    readingTime: "9 min read",
    sections: [
      section("Where AI Can Help", [
        paragraph(
          "There are several places where AI can make Hoxa meaningfully better without pretending to replace training judgment. It can turn raw plan logic into clear explanations, summarize recent adherence patterns, help users reflect on progress in natural language, and support sensible content presentation when the system needs to communicate a change."
        ),
        list([
          "Translate training rationale into plain language.",
          "Summarise trends from recent workout history.",
          "Draft supportive check-ins or weekly reflections.",
          "Help users understand tradeoffs when the plan adapts.",
        ]),
        paragraph(
          "These are not trivial jobs. They affect whether the product feels usable and intelligent. But they are support roles. They improve interpretation and communication around a training system that should still have explicit rules, constraints, and accountability."
        ),
      ]),
      section("Where AI Should Stay Constrained", [
        paragraph(
          "There are also obvious lines Hoxa should not cross casually. The product should not present AI as a diagnostic authority. It should not make opaque changes to training load and then hide behind confident language. It should not infer certainty from sparse data, especially where injury, exhaustion, or health concerns are involved."
        ),
        list([
          "Do not diagnose injuries or medical conditions.",
          "Do not fabricate certainty about readiness from weak signals.",
          "Do not let generated language disguise unclear or risky plan changes.",
          "Do not use conversational polish as a substitute for training logic.",
        ]),
      ]),
      section("Credibility Comes From Boundaries", [
        paragraph(
          "One of the easier ways to lose trust is to let the system sound wiser than it is. Fitness products are already operating close to people's bodies, routines, anxieties, and self-perception. That context deserves precision. If AI is involved, the product should be candid about what it is doing and what it is not doing."
        ),
        quote(
          "A credible system is allowed to be helpful before it is allowed to be authoritative.",
          "Product principle"
        ),
        paragraph(
          "That posture is less flashy than the industry norm, but it creates a stronger foundation. Users are more likely to stay with a product that explains itself clearly and respects its own limits than one that gestures at intelligence while avoiding responsibility."
        ),
      ]),
      section("How This Shapes Hoxa", [
        paragraph(
          "For Hoxa, the likely path is careful layering. Start with deterministic planning logic, well-bounded adaptation rules, and strong product explanation. Then introduce AI where it can improve comprehension, support, and orientation. If later ML models contribute to prediction or personalisation, they should do so through interfaces that remain reviewable."
        ),
        paragraph(
          "That approach may look conservative from the outside. I think it is the opposite. In a category where trust is easy to overstate and hard to rebuild, restraint is a product advantage."
        ),
      ]),
    ],
  },
  {
    slug: "building-hoxa-in-public",
    title: "Building Hoxa in Public",
    date: "April 23, 2026",
    category: "Process",
    summary:
      "Writing the build thread is part of the product work. It sharpens decisions, exposes weak assumptions, and leaves a clearer record of how the system is taking shape.",
    intro:
      "I do not think building in public is automatically useful. It often collapses into performance, marketing, or a stream of isolated screenshots. For Hoxa, I want the public record to function more like an engineering and product journal: slower, more specific, and more accountable.",
    readingTime: "7 min read",
    pullQuote: {
      quote:
        "The point of writing in public is not to narrate momentum. It is to make decisions easier to inspect.",
    },
    sections: [
      section("Why Document The Build", [
        paragraph(
          "Hoxa is still in progress, which is exactly why the writing matters now. Early-stage product decisions have a habit of hardening before they are properly articulated. Writing forces those decisions into language. Once a product claim, a design principle, or an architectural boundary is written down, it becomes easier to evaluate whether the implementation is actually honouring it."
        ),
        paragraph(
          "That is especially important for a product like Hoxa, where tone and credibility are part of the product itself. The build thread helps me see whether the product is drifting toward unnecessary complexity, borrowed AI rhetoric, or category defaults that do not fit the original thesis."
        ),
      ]),
      section("Who The Writing Is For", [
        paragraph(
          "The audience is intentionally mixed. Portfolio readers and recruiters can use the series to understand how I think about product and systems work. Product people can see how scope, tone, and interaction choices connect. Engineers can inspect the architecture and adaptation logic. Potential early users can decide whether the product posture feels trustworthy."
        ),
        paragraph(
          "That mixed audience is useful because it discourages lazy writing. If a post only sounds good to one group, it is probably leaning too hard on shorthand. The best entries should remain readable across disciplines while still containing enough specificity to be technically meaningful."
        ),
      ]),
      section("What I Want To Avoid", [
        list([
          "No fake launch drama.",
          "No polished screenshots standing in for product clarity.",
          "No vague claims about intelligence without system detail.",
          "No heroic builder narrative that hides tradeoffs or uncertainty.",
        ]),
        paragraph(
          "I would rather publish a quieter post that clarifies one design or systems decision than a louder update that says very little. Serious products are usually built through accumulation: small judgements, revised assumptions, and repeated simplification. The writing should reflect that reality."
        ),
      ]),
      section("What The Thread Should Become", [
        paragraph(
          "Over time, I want the Hoxa writing section to become a usable record of the product. Someone should be able to read through the series and understand not only what Hoxa is, but why it is being shaped this way. That includes the obvious product choices and the less visible decisions about architecture, AI boundaries, and tone."
        ),
        paragraph(
          "If the thread does its job, it should improve the product internally and make the product easier to trust externally. That is a much better reason to write than visibility alone."
        ),
      ]),
    ],
  },
];

export const hoxaSeriesEntries: WritingEntry[] = hoxaEntriesWithoutSeries.map(
  (entry, index, entries) => ({
    ...entry,
    series: {
      slug: hoxaSeriesSlug,
      name: hoxaSeriesName,
      description: hoxaSeriesDescription,
      order: index + 1,
      previousSlug: index > 0 ? entries[index - 1]?.slug : undefined,
      nextSlug: index < entries.length - 1 ? entries[index + 1]?.slug : undefined,
    },
  })
);

const cityScoutEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "why-im-building-cityscout",
    title: "Building CityScout: A Local-First AI Travel Companion",
    date: "April 25, 2026",
    category: "Product Strategy",
    summary:
      "CityScout is a city-first travel companion built to help people feel oriented before a trip starts, without forcing AI into every corner of the product.",
    intro:
      "I am building CityScout around a simple premise: travel should feel local, legible, and calm. The product should help someone understand a city before it tries to optimise the trip for them.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "The product should help you orient yourself before it tries to be clever.",
    },
    sections: [
      section("Why The Problem Matters", [
        paragraph(
          "Most travel planning still happens across too many surfaces. One app for maps, one for bookings, one for reviews, one for notes, and a handful of tabs for saved places. That fragmentation makes planning feel like administration. It also makes it harder to build confidence, because the user keeps switching between contexts instead of forming a coherent picture of the trip."
        ),
        paragraph(
          "CityScout is meant to do the opposite. The product should bring discovery, planning, and trip-time reference into the same mental model so the experience feels like one flow rather than a pile of disconnected decisions."
        ),
      ]),
      section("Why City-First Matters", [
        paragraph(
          "A city-first product starts with the place, not the booking. That means helping someone understand what a city is good at, how its neighbourhoods differ, when to move slowly, and where the local texture actually lives. The app should feel like it is helping the user travel with context, not pretending they already know the city."
        ),
        paragraph(
          "That distinction matters because confidence in travel is rarely about raw information volume. It is about feeling oriented. If the product can help a person decide where to spend time, what to cluster together, and what to ignore, it becomes more useful than a list of generic suggestions."
        ),
      ]),
      section("Why I Chose iOS First", [
        paragraph(
          "CityScout is a native iOS app built with SwiftUI and SwiftData because the product belongs close to the trip. A travel companion needs to live on the device, feel fast, and stay useful when the user is moving between places, not sitting in a desktop workflow."
        ),
        paragraph(
          "The platform choice is also a product decision. iOS gives the app a strong baseline for maps, mobile interaction, local storage, and the kind of in-context use that travel software depends on. That makes the first version easier to trust and easier to keep simple."
        ),
      ]),
      section("Why AI Should Stay Selective", [
        list([
          "Use AI to start itineraries and answer guide questions, not to replace the whole product.",
          "Keep structured city content and saved trip data as the source of truth.",
          "Prefer clear outputs that can be reviewed, stored, and reused.",
          "Let AI improve orientation and drafting, not obscure the underlying travel model.",
        ]),
        paragraph(
          "The product bet is that careful AI is more useful than omnipresent AI. CityScout does not need to use language generation everywhere. It needs to use it where it reduces friction, then step back when a stable city record or a simple interaction is the better answer."
        ),
      ]),
    ],
  },
  {
    slug: "cityscout-architecture-native-ios-fastapi-shared-ai-backend",
    title: "CityScout Architecture: Native iOS, FastAPI, and a Shared AI Backend",
    date: "April 27, 2026",
    category: "Architecture",
    summary:
      "CityScout keeps the iOS app light, the backend authoritative, and OpenAI behind a server boundary so the product stays easier to secure and evolve.",
    intro:
      "The current shape of CityScout is intentionally split: SwiftUI and SwiftData on device, FastAPI on the server, and OpenAI calls kept server-side. That gives the product a clearer security boundary and makes the AI behavior easier to change.",
    readingTime: "9 min read",
    pullQuote: {
      quote:
        "The app should hold the trip; the backend should hold the contract.",
    },
    sections: [
      section("Native iOS As The Primary Surface", [
        paragraph(
          "SwiftUI and SwiftData are a good fit for the core product because they keep the mobile experience close to the user's data. CityScout is designed as a travel companion, so the iPhone app needs to feel immediate, local, and dependable when the user is on the move."
        ),
        paragraph(
          "That local-first shape matters. The app should be able to keep trip state, saved places, and user decisions on device first, then synchronize through the backend where it makes sense. The point is to reduce friction, not to build a cloud-first planning system that happens to run on a phone."
        ),
      ]),
      section("FastAPI Owns The AI Boundary", [
        paragraph(
          "FastAPI sits between the app and OpenAI so the model never becomes a client-side dependency. That lets the server manage prompts, validation, retries, logging, and response shaping in one place, instead of scattering those concerns across the device."
        ),
        paragraph(
          "The current backend boundary also supports shared-secret auth, which keeps the client from carrying sensitive credentials. That is a practical security choice, and it also keeps the mobile app simpler. The app sends intent; the backend decides how to turn that intent into itinerary generation or guide chat."
        ),
      ]),
      section("Structured Endpoints Beat Free-Form Output", [
        paragraph(
          "CityScout now has dedicated itinerary generation and guide chat endpoints, which is the right shape for a product that needs both structure and explanation. Itineraries are not just conversation transcripts. They are durable objects that can be saved, reviewed, and reused."
        ),
        list([
          "Itinerary output should stay structured enough to serialize and validate.",
          "Guide chat should explain and support, not replace the trip model.",
          "Seeded JSON city content should make the app useful before generation runs.",
          "The backend should normalize model output into a stable contract for the client.",
        ]),
      ]),
      section("What Stays Future Work", [
        paragraph(
          "The planned Next.js web planning layer belongs in the future, not the current shipped product. It makes sense as a secondary surface for planning and sharing, but it should reuse the same API contract instead of creating a separate version of the truth."
        ),
        paragraph(
          "That future layer only works if the contract stays stable. If the backend schema drifts, the product starts to lose the simplicity that makes the current split between client, server, and model manageable."
        ),
      ]),
    ],
  },
  {
    slug: "extending-cityscout-to-web",
    title: "Extending CityScout to Web: Multi-Surface Product Design",
    date: "April 30, 2026",
    category: "Roadmap",
    summary:
      "The web layer should give CityScout more room for planning and sharing, while keeping iOS as the in-trip companion.",
    intro:
      "The web version of CityScout is not meant to replace the iOS app. It is meant to broaden where planning can happen and where a trip can be reviewed, shared, or resumed. iOS remains the in-trip companion.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "Web should help shape the trip. iOS should help you live it.",
    },
    sections: [
      section("Why Add Web At All", [
        paragraph(
          "A web surface makes sense when the product needs a larger planning canvas. People often research travel across tabs, share plans with other people, or revisit details from a desktop before they leave. Web is a better fit for that kind of work than a phone-only interface."
        ),
        paragraph(
          "That does not make the web the primary experience. It makes it the planning and sharing layer. The trip itself still belongs on iOS, where the app can stay close to maps, quick decisions, and the on-the-ground rhythm of moving through a city."
        ),
      ]),
      section("One Contract, Multiple Surfaces", [
        paragraph(
          "A shared API contract is the right anchor for multiple surfaces. The iOS app and the future web app should both speak to the same itinerary and guide shapes, so the product does not fork into two subtly different versions of the same trip."
        ),
        paragraph(
          "If the web layer lands, I would want the schema, validation rules, and endpoint behavior to stay aligned across clients. Whether that lives in a monorepo or another shared workspace shape is a future decision, but the architectural direction is clear: keep the contract central and avoid duplication."
        ),
      ]),
      section("Security Gets Harder In The Browser", [
        paragraph(
          "Browser clients raise the security bar. They make shared secrets harder to protect, increase the surface area for abuse, and demand more care around auth, rate limiting, and response shaping. That is another reason the AI boundary should stay on the server."
        ),
        list([
          "Never expose model credentials to the browser.",
          "Treat client requests as untrusted until validated on the server.",
          "Prefer explicit auth and rate limits over optimistic assumptions.",
          "Keep the itinerary contract stable enough that clients do not need special logic for every endpoint.",
        ]),
      ]),
      section("Why TDD Matters More Here", [
        paragraph(
          "Once a product has multiple surfaces, tests stop being optional polish. They become the easiest way to keep the contract honest while the UI evolves. The web layer should not move the system faster than the tests can describe it."
        ),
        paragraph(
          "The direction I want to keep tightening is straightforward: test the contract, test the failure modes, and make sure the product stays production-ready before expanding the surface area again. That is how the web layer can add value without adding confusion."
        ),
      ]),
    ],
  },
];

export const cityScoutSeriesEntries: WritingEntry[] =
  cityScoutEntriesWithoutSeries.map((entry, index, entries) => ({
    ...entry,
    series: {
      slug: cityScoutSeriesSlug,
      name: cityScoutSeriesName,
      description: cityScoutSeriesDescription,
      order: index + 1,
      previousSlug: index > 0 ? entries[index - 1]?.slug : undefined,
      nextSlug: index < entries.length - 1 ? entries[index + 1]?.slug : undefined,
    },
  }));

const creatorOSEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "building-creatoros-an-ai-growth-operating-system-for-creators",
    title: "Building CreatorOS: an AI growth operating system for creators",
    date: "May 9, 2026",
    category: "Build Log",
    summary:
      "CreatorOS is a strategy-first AI product for creators, built to turn source material into a structured Creator Growth Pack.",
    intro:
      "CreatorOS started from exploring D2C and creator businesses and asking a simpler question: what would reduce the amount of decision fatigue a creator carries every week? The answer was not another generic AI writing tool. It was a product that could reason about audience, strategy, content gaps, and repurposing as separate steps in one workflow.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "Repurposing is useful, but it is only one output layer.",
    },
    sections: [
      section("Why This Project Exists", [
        paragraph(
          "Most creators do not need more raw output. They need help deciding what matters, what is missing, and what to do next. CreatorOS is an attempt to turn that messy decision-making into a structured product flow that starts with source material and ends with a practical Creator Growth Pack."
        ),
        paragraph(
          "That starting point came from looking at D2C and creator businesses more closely. The same pattern kept appearing: the work was not just about making content, it was about evaluating audience signals, finding repeated gaps, and deciding which opportunities were worth acting on."
        ),
      ]),
      section("Why This Is Not Just Another AI Writing Tool", [
        paragraph(
          "CreatorOS is not meant to be a generic writer with a few prompts wrapped around it. The stronger product angle is strategic reasoning. Audience intelligence, content gap discovery, platform-aware strategy, and experiment recommendations are all part of the system because they shape the decision before any repurposed output is generated."
        ),
        paragraph(
          "Repurposing still matters, but only as the final layer. If the product only rewrites content, it misses the larger problem. The useful part is understanding what the creator should do with the material in the first place."
        ),
      ]),
      section("The First Workflow", [
        diagram(
          `Transcript / Input
  → Audience Intelligence Agent
  → Content Strategy Agent
  → Repurposing Agent
  → Creator Growth Pack`,
          "The first end-to-end workflow is designed to stay readable and fast."
        ),
        paragraph(
          "The first version is deliberately narrow. The goal is to prove whether one workflow can produce genuinely useful strategy in under five minutes, without collapsing into a broad content platform."
        ),
      ]),
      section("The Agent Architecture", [
        paragraph(
          "The implementation uses Next.js App Router, TypeScript, Tailwind, shadcn/ui, OpenAI Responses API calls, structured JSON outputs, and Zod schemas to keep the data model explicit. The agents are modular rather than fused into one prompt so each step can do one job well."
        ),
        paragraph(
          "The backend also includes a mock fallback when OPENAI_API_KEY is missing, which keeps the prototype usable during development and testing. Vitest provides the first test foundation, including API route tests, and the public routes use lightweight request caps and in-memory rate limiting so the shape of the product is harder to abuse while it is still small."
        ),
      ]),
      section("Building For Usefulness Before Scale", [
        list([
          "No auth yet, because the first question is whether the workflow is useful at all.",
          "No billing yet, because the product still needs proof of value before monetization work matters.",
          "No database persistence yet, because the early goal is to validate the interaction model and the quality of the output.",
          "No analytics integrations yet, because the prototype should stay focused on reasoning and usefulness rather than instrumentation.",
        ]),
        paragraph(
          "That restraint is intentional. The product needs to prove that a creator can feed in source material and get a genuinely helpful strategic pack back, without waiting for a larger platform to exist around it."
        ),
      ]),
      section("Why Evaluation Tooling Matters", [
        paragraph(
          "A major part of building AI systems is not only generating outputs, but creating ways to evaluate them over time. For CreatorOS, that means checking whether the system is actually improving prompt quality, strategic usefulness, repetition, and failure modes instead of just sounding better."
        ),
        list([
          "Structured outputs make it easier to compare results and spot regressions.",
          "Prompt evaluation harnesses help test the same workflow against changing inputs.",
          "Deterministic tests around schemas and API boundaries keep the contract stable.",
          "The real goal is to improve usefulness, not to chase bigger architectures for their own sake.",
        ]),
      ]),
      section("What Comes Next", [
        paragraph(
          "Future work will likely focus on persistence, authentication, and stronger integrations once the core workflow proves itself. If the product earns that next step, the data model can grow around the workflow instead of forcing the workflow to fit an oversized platform."
        ),
        paragraph(
          "The bar for the next phase is simple: keep the product strategic, keep the output structured, and keep the experience useful before it gets ambitious."
        ),
      ]),
    ],
  },
];

export const creatorOSSeriesEntries: WritingEntry[] = creatorOSEntriesWithoutSeries.map(
  (entry, index, entries) => ({
    ...entry,
    series: {
      slug: creatorOSSeriesSlug,
      name: creatorOSSeriesName,
      description: creatorOSSeriesDescription,
      order: index + 1,
      previousSlug: index > 0 ? entries[index - 1]?.slug : undefined,
      nextSlug: index < entries.length - 1 ? entries[index + 1]?.slug : undefined,
    },
  })
);

const evalKitEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "introducing-evalkit",
    title: "Introducing EvalKit",
    date: "June 9, 2026",
    category: "Product Strategy",
    summary:
      "A launch note for EvalKit covering the problem, the product model, the current build, and where it goes next.",
    intro:
      "EvalKit started from a simple frustration: once an LLM feature ships, the hard part is not getting another response from the model. The hard part is knowing whether the system still behaves the way the product needs it to behave. This post lays out the product model I wanted to build, the evaluation objects that make it usable, and the next steps I think matter most.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "If you cannot tell whether the model improved, you are shipping guesses with a nicer interface.",
    },
    sections: [
      section("Outline", [
        list([
          "The product problem EvalKit is solving.",
          "How suites, cases, checks, and runs fit together.",
          "Who the product is for and where it fits.",
          "What is currently shipped.",
          "What comes next and how the series connects.",
        ]),
      ]),
      section("The Problem", [
        paragraph(
          "LLM teams usually discover regressions late because the outputs are easy to glance at and hard to measure. A prompt change can quietly alter JSON shape, length, tone, safety boundaries, or the capability that actually made the feature useful in the first place. Spot checks catch obvious breakage, but they do not give you a repeatable record of what changed."
        ),
        paragraph(
          "EvalKit exists to make that record explicit. The point is not to test every possible response. The point is to create a reliable harness that makes output drift visible before it becomes a product problem."
        ),
      ]),
      section("How EvalKit Works", [
        diagram(
          `Suite
  |
  v
Cases
  |
  v
Checks
  |
  v
Run
  |
  v
Regression Report`,
          "The evaluation loop keeps the product legible."
        ),
        paragraph(
          "A suite groups a product flow. A case captures one concrete prompt or interaction. A check describes what good looks like for that case: valid schema, forbidden content, maximum length, or a capability constraint the output should preserve. A run executes the suite, records results, and shows where the output drifted."
        ),
        list([
          "Suites keep the scope aligned with a real product surface.",
          "Cases make the test data explicit and reusable.",
          "Checks let different failure modes stay separate instead of blending into one vague score.",
          "Runs preserve history so regressions can be compared over time.",
        ]),
      ]),
      section("Who It Is For", [
        paragraph(
          "EvalKit is aimed at teams shipping LLM features inside SaaS products, internal tools, support automation, and agent workflows. It is most useful where the model is part of a larger system and the team needs confidence that a change in one place did not break behavior somewhere else."
        ),
        paragraph(
          "That includes product teams that need a simple evaluation ritual, engineers who want regression coverage they can reason about, and founders who need to prove that the AI layer is doing real work instead of just producing novel text."
        ),
      ]),
      section("Current Status", [
        paragraph(
          "The current build establishes the core evaluation objects, the SaaS shape, and the deterministic flow through the engine. The immediate goal was to get the product model right enough that future features can attach to it without rewriting the foundation."
        ),
        paragraph(
          "The launch post is part of the work. It sets the vocabulary for the rest of the series and gives the other two posts a stable reference point: the evaluation argument and the engine implementation."
        ),
      ]),
      section("Roadmap And Cross-Links", [
        links([
          {
            label: "Next: Why Your LLM Needs Regression Tests",
            href: "/writing/why-your-llm-needs-regression-tests",
          },
          {
            label: "Then: How We Built a Deterministic Eval Engine in FastAPI",
            href: "/writing/how-we-built-a-deterministic-eval-engine-in-fastapi",
          },
          {
            label: "EvalKit Notion docs [#]",
            href: "#",
          },
        ]),
        paragraph(
          "Those three posts are meant to read as one sequence. The launch post explains the product, the second post argues for the need, and the third post documents the implementation tradeoffs that made the product credible."
        ),
      ]),
    ],
  },
  {
    slug: "why-your-llm-needs-regression-tests",
    title: "Why Your LLM Needs Regression Tests",
    date: "June 11, 2026",
    category: "Applied AI",
    summary:
      "A first-principles case for regression testing LLM features, focused on the failure modes spot checks miss and the workflow that keeps them visible.",
    intro:
      "The strongest objection to LLM regression testing usually sounds like realism: the model is probabilistic, so why pretend its outputs can be tested like ordinary software? That objection is useful because it points at the real problem. You do not want to freeze a model into one exact response. You want a way to notice when the output stops satisfying the product contract.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "Probabilistic output changes the shape of the test. It does not remove the need for one.",
    },
    sections: [
      section("The Four Failure Modes", [
        list([
          "Schema drift: the model still sounds plausible, but the JSON shape or field semantics no longer match what downstream code expects.",
          "Forbidden content: the response introduces unsafe, off-brand, or policy-breaking language that spot checks missed.",
          "Length regression: the answer becomes too short to be useful or too long to be practical, even though it still appears coherent.",
          "Silent capability loss: the model stops doing the one job that made the feature valuable, but the failure is subtle enough to pass casual review.",
        ]),
        paragraph(
          "These are not theoretical issues. They are the kinds of regressions that show up when prompts change, context changes, model versions change, or surrounding code changes. The output can remain fluent while the product quietly gets worse."
        ),
      ]),
      section("Why Probabilistic Does Not Mean Untestable", [
        paragraph(
          "The objection usually assumes regression tests only make sense when a function returns one exact answer. That is too narrow. In practice, evaluation should test expectations, not literal strings. The output can vary while still satisfying a schema, staying inside a safety boundary, respecting a length range, and preserving the capability the product depends on."
        ),
        paragraph(
          "That is the distinction EvalKit leans on. It is not trying to turn the model into a deterministic calculator. It is trying to turn product expectations into checks that can be repeated and audited."
        ),
      ]),
      section("What A Good Check Looks Like", [
        list([
          "Schema checks confirm the output still validates against the expected structure.",
          "Content checks detect forbidden phrases, unsafe claims, and unexpected policy violations.",
          "Length checks keep the model inside the practical envelope the product needs.",
          "Capability checks catch cases where the answer is fluent but no longer performs the intended task.",
        ]),
        paragraph(
          "That mix is enough for most product teams to get meaningful protection without overbuilding the evaluation layer. The point is to make regressions legible, not to chase abstract completeness."
        ),
      ]),
      section("A Practical Workflow", [
        diagram(
          `Change prompt or code
  |
  v
Run EvalKit suite
  |
  v
Inspect failed checks
  |
  v
Fix prompt, data, or code
  |
  v
Re-run and compare`,
          "A lightweight regression loop keeps the product moving."
        ),
        paragraph(
          "The workflow should be ordinary. When something changes, run the relevant suite, inspect the failures, fix the actual cause, and re-run until the difference is understood. That is a lot closer to normal software practice than many teams expect from AI work, and that is the point."
        ),
      ]),
      section("Where This Fits In Distribution", [
        paragraph(
          "This is the post I would send when a team says they are shipping LLM features but has not built a regression habit yet. It is written to stand on its own for HN or Reddit, but it also feeds into the product story and the implementation deep dive."
        ),
        links([
          {
            label: "If you want the product framing, start with Introducing EvalKit",
            href: "/writing/introducing-evalkit",
          },
          {
            label: "If you want the implementation detail, read How We Built a Deterministic Eval Engine in FastAPI",
            href: "/writing/how-we-built-a-deterministic-eval-engine-in-fastapi",
          },
          {
            label: "The working notes and examples live in the EvalKit Notion docs [#]",
            href: "#",
          },
        ]),
      ]),
    ],
  },
  {
    slug: "how-we-built-a-deterministic-eval-engine-in-fastapi",
    title: "How We Built a Deterministic Eval Engine in FastAPI",
    date: "June 13, 2026",
    category: "Architecture",
    summary:
      "A technical deep dive into the EvalKit engine, covering checks, tenancy, auth, billing, deployment, and the test strategy.",
    intro:
      "The engineering constraint behind EvalKit was simple to say and annoying to satisfy: the product had to be deterministic enough to debug while still representing the non-determinism of model behavior honestly. The architecture ended up centering on a check engine, explicit tenancy boundaries, and a set of integrations that stay legible under change.",
    readingTime: "10 min read",
    pullQuote: {
      quote:
        "Determinism belongs in the eval layer, not inside the model.",
    },
    sections: [
      section("The Engine Shape", [
        diagram(
          `API Request
  |
  v
Suite Load
  |
  v
Case Selection
  |
  v
Check Execution
  |
  v
Persist Results
  |
  v
Report + Metering`,
          "The engine is designed around repeatable evaluation steps."
        ),
        paragraph(
          "The check engine is the heart of the system. It loads a suite, materialises the cases, executes the checks, and persists the results in a form that can be compared later. Each step is intentionally explicit so a failure can be traced back to the exact boundary where the behavior changed."
        ),
      ]),
      section("Multi-Tenant Data Model", [
        diagram(
          `Tenant
  |
  v
Project
  |
  v
Suite
  |
  v
Case
  |
  v
Run
  |
  v
Check Result`,
          "Tenant scoping stays visible all the way through the run."
        ),
        paragraph(
          "EvalKit is built as a multi-tenant SaaS, so the data model has to keep project-scoped records isolated without making the app hard to operate. The main product objects are deliberately small: tenants own projects, projects own suites, suites own cases, and runs own the check results that fall out of execution."
        ),
      ]),
      section("The Enum Problem We Had To Solve", [
        paragraph(
          "One of the more annoying implementation issues came from the boundary between SQLAlchemy and Neon around enum handling. The practical fix was to make the enum contract explicit instead of relying on implicit inference to do the right thing across ORM, migration, and database layers."
        ),
        paragraph(
          "That kind of bug is worth calling out because it changes how you design the rest of the system. Once a schema edge has bitten you, you stop treating type inference as a convenience and start treating it as a place where hidden coupling shows up."
        ),
      ]),
      section("Auth, Metering, And Stripe", [
        list([
          "Use a dual auth strategy so trusted service calls and tenant-scoped requests do not share the same assumptions.",
          "Meter usage at the point where the product can explain what consumed a run, not after the fact in a vague aggregate.",
          "Keep Stripe webhook handling idempotent so subscription state remains stable under retries.",
          "Treat billing state as part of the SaaS contract, not a side effect hidden in the UI.",
        ]),
        paragraph(
          "The integration work matters because SaaS credibility is not only about the core engine. If the product cannot handle access control, usage accounting, and billing state cleanly, the evaluation layer is not enough on its own."
        ),
      ]),
      section("Railway Without Docker", [
        paragraph(
          "The deployment choice was deliberately pragmatic. Railway gave us a straightforward path to production without requiring Docker in the first iteration. That kept the build moving and reduced the amount of infrastructure overhead the team had to carry while the product shape was still changing."
        ),
        paragraph(
          "The important part is not the platform itself. It is the decision to avoid unnecessary deployment ceremony when the real work is still proving that the engine, the tenancy model, and the SaaS plumbing are all behaving correctly together."
        ),
      ]),
      section("The Test Strategy", [
        list([
          "Unit tests cover individual checks and deterministic scoring behavior.",
          "Route tests exercise the API contract and failure responses.",
          "Webhook tests verify billing state changes stay idempotent.",
          "Regression tests guard the enum fix and other schema-sensitive paths.",
        ]),
        paragraph(
          "The test strategy is meant to mirror the product model. If the engine is deterministic, the tests should be deterministic too. If the SaaS contract includes webhooks and tenant boundaries, the tests should make those edges visible instead of assuming the happy path is enough."
        ),
      ]),
      section("How The Three Posts Connect", [
        links([
          {
            label: "Start with Introducing EvalKit for the product framing",
            href: "/writing/introducing-evalkit",
          },
          {
            label: "Use Why Your LLM Needs Regression Tests for the argument",
            href: "/writing/why-your-llm-needs-regression-tests",
          },
          {
            label: "Treat the EvalKit Notion docs [#] as the living implementation notes",
            href: "#",
          },
        ]),
        paragraph(
          "Taken together, the series shows the same idea from three angles: why the product exists, why the problem matters, and what it takes to build the engine cleanly."
        ),
      ]),
    ],
  },
];

export const evalKitSeriesEntries: WritingEntry[] = evalKitEntriesWithoutSeries.map(
  (entry, index, entries) => ({
    ...entry,
    series: {
      slug: evalKitSeriesSlug,
      name: evalKitSeriesName,
      description: evalKitSeriesDescription,
      order: index + 1,
      previousSlug: index > 0 ? entries[index - 1]?.slug : undefined,
      nextSlug: index < entries.length - 1 ? entries[index + 1]?.slug : undefined,
    },
  })
);

const campaignForgeEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "introducing-campaignforge-ai",
    title: "Introducing CampaignForge AI",
    date: "June 21, 2026",
    category: "Product Strategy",
    summary:
      "CampaignForge AI is a structured campaign-planning workflow designed to turn one brief into strategy, copy, and creative direction that a small team can actually use.",
    intro:
      "CampaignForge AI started from a practical frustration. Campaign planning work often gets split across too many disconnected tools and too many blank pages. The goal here was not to build another general-purpose writing tool. It was to build a tighter workflow that could take a brief and return a more coherent campaign starting point.",
    readingTime: "7 min read",
    pullQuote: {
      quote:
        "The product needs to be more useful than magical.",
    },
    sections: [
      section("What The Product Actually Does", [
        paragraph(
          "The current product takes a structured brief and moves it through staged generation rather than one oversized prompt. That matters because strategy, copy, and creative direction are related but not identical jobs. Keeping those stages explicit makes the outputs easier to review and more consistent to reuse."
        ),
        diagram(
          `Brief
  |
  v
Strategy
  |
  v
Messaging
  |
  v
Creative Direction
  |
  v
Campaign Draft`,
          "The workflow is intentionally staged so the output stays readable."
        ),
      ]),
      section("Who It Is For", [
        paragraph(
          "The clearest buyer is not a giant enterprise team. It is a small marketing team, freelancer, or agency that wants a faster first pass without giving up editorial judgement. That narrower audience makes the product easier to shape and easier to price."
        ),
        list([
          "Small in-house marketing teams that need speed without a full platform rollout.",
          "Freelancers who want a stronger structured starting point for campaign work.",
          "Agencies that want a repeatable internal accelerator rather than another broad content tool.",
        ]),
      ]),
      section("Why The Product Needs More Narrowing", [
        paragraph(
          "The prototype proves the workflow shape better than it proves the commercial shape. That is normal, but it matters. A tool can be interesting and still be too broad to sell cleanly. The real work now is deciding what stays in scope, what becomes optional, and what should wait until the product has clearer demand."
        ),
        links([
          {
            label: "CampaignForge AI repository",
            href: "https://github.com/Peippo1/CampaignForge-AI",
          },
          {
            label: "CampaignForge AI Productization Hub",
            href: "https://app.notion.com/p/38d2f6b56a9d8108aeccef703153919f",
          },
          {
            label: "CampaignForge AI Commercial Roadmap",
            href: "https://app.notion.com/p/38d2f6b56a9d810aa155d62cdb290c8b",
          },
        ]),
      ]),
    ],
  },
  {
    slug: "choosing-the-right-commercial-path-for-campaignforge-ai",
    title: "Choosing the Right Commercial Path for CampaignForge AI",
    date: "June 24, 2026",
    category: "Commercial Strategy",
    summary:
      "The best near-term path for CampaignForge AI is not to rush into a platform. It is to choose the smallest commercial shape that the current product can support honestly.",
    intro:
      "There are at least three plausible ways to sell CampaignForge AI: as a code asset, as a productised service, or as a small SaaS. Each path changes what has to be built, what has to be supported, and what can be claimed responsibly.",
    readingTime: "8 min read",
    sections: [
      section("The Three Paths", [
        list([
          "Code asset: sell the workflow as a downloadable or licensed starting point for teams that can self-host and adapt it.",
          "Productised service: use the workflow as an internal delivery accelerator for done-for-you campaign work.",
          "Small SaaS: host the product directly with stricter boundaries around auth, storage, billing, and tenant safety.",
        ]),
        paragraph(
          "All three paths are viable in theory. The question is which one matches the current codebase and the fastest credible route to revenue."
        ),
      ]),
      section("Why Productised Service Comes First", [
        paragraph(
          "The service path is the most honest near-term option because it needs fewer hard platform guarantees. It lets the workflow prove itself on real campaign work before a hosted product has to solve authentication, tenancy, durable storage, and support expectations all at once."
        ),
        paragraph(
          "That does not make SaaS the wrong destination. It makes SaaS a later step that should be earned. The advantage of service first is that it creates sharper feedback about where the workflow is genuinely valuable and where the prototype still leaks complexity."
        ),
      ]),
      section("What Stays Out Of Scope", [
        list([
          "No broad enterprise positioning yet.",
          "No multi-role permission system before a clearer hosted need exists.",
          "No sprawling campaign operations suite with every adjacent workflow bundled in.",
          "No production marketing claims that the current implementation cannot support.",
        ]),
        links([
          {
            label: "CampaignForge AI Productization Hub",
            href: "https://app.notion.com/p/38d2f6b56a9d8108aeccef703153919f",
          },
          {
            label: "CampaignForge AI Commercial Roadmap",
            href: "https://app.notion.com/p/38d2f6b56a9d810aa155d62cdb290c8b",
          },
        ]),
      ]),
    ],
  },
  {
    slug: "what-campaignforge-ai-needs-before-hosted-deployment",
    title: "What CampaignForge AI Needs Before Hosted Deployment",
    date: "June 27, 2026",
    category: "Architecture",
    summary:
      "CampaignForge AI can become a credible hosted product, but only after the basics are tightened: storage, auth, tenancy, and operational visibility.",
    intro:
      "Hosted products fail in unglamorous ways. Not because the core workflow is uninteresting, but because the operational basics were treated like later details. For CampaignForge AI, the hosted path is credible only if those basics stop being optional.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "A hosted product has to be safer than a demo, not just better marketed than one.",
    },
    sections: [
      section("The Gaps That Matter Most", [
        list([
          "Durable storage instead of file-based campaign artifacts.",
          "Authentication and tenant boundaries for any shared hosted use.",
          "Usage controls and rate limits so the service behaves predictably.",
          "Compatibility, logging, and observability baselines for support and debugging.",
        ]),
        paragraph(
          "None of these are decorative platform work. They are the minimum conditions for claiming that the product can be used by more than one person in a controlled way."
        ),
      ]),
      section("What This Means For Scope", [
        paragraph(
          "The right move is not to build every possible hosted feature. It is to build the smallest hosted version that preserves the product thesis. That probably means a narrower campaign workflow, fewer integrations, and a more explicit operator posture while the first users are still validating the system."
        ),
        diagram(
          `Prototype Workflow
  |
  v
Storage + Auth
  |
  v
Tenant Safety
  |
  v
Observability
  |
  v
Credible Hosted MVP`,
          "Hosted credibility comes from the boring layers underneath the workflow."
        ),
      ]),
      section("Why This Work Is Worth Writing Down", [
        paragraph(
          "One reason to document this now is to keep the product honest. It is easy to talk about productisation in abstract terms. It is harder, and more useful, to name the exact things the product still needs before hosted deployment is a responsible claim."
        ),
        links([
          {
            label: "CampaignForge AI repository",
            href: "https://github.com/Peippo1/CampaignForge-AI",
          },
          {
            label: "CampaignForge AI Productization Hub",
            href: "https://app.notion.com/p/38d2f6b56a9d8108aeccef703153919f",
          },
          {
            label: "CampaignForge AI Commercial Roadmap",
            href: "https://app.notion.com/p/38d2f6b56a9d810aa155d62cdb290c8b",
          },
        ]),
      ]),
    ],
  },
];

export const campaignForgeSeriesEntries: WritingEntry[] =
  campaignForgeEntriesWithoutSeries.map((entry, index, entries) => ({
    ...entry,
    series: {
      slug: campaignForgeSeriesSlug,
      name: campaignForgeSeriesName,
      description: campaignForgeSeriesDescription,
      order: index + 1,
      previousSlug: index > 0 ? entries[index - 1]?.slug : undefined,
      nextSlug: index < entries.length - 1 ? entries[index + 1]?.slug : undefined,
    },
  }));

export const archiveWritingEntries: WritingEntry[] = [
  {
    slug: "building-a-reusable-pr-to-paper-trail-workflow",
    title: "Building a Reusable PR-to-Paper Trail Workflow in Codex",
    date: "June 28, 2026",
    category: "Automation",
    summary:
      "How a one-off review routine became a reusable Codex workflow for turning pull request activity into cleaner updates, clearer follow-on actions, and an auditable paper trail.",
    readingTime: "6 min read",
    intro:
      "The workflow started from a small but recurring problem. Pull requests capture code changes, but they rarely capture the surrounding operational work that makes teams easier to run: ticket updates, documentation notes, follow-on actions, standup-ready summaries, and a record of what still needs human approval. PR-to-Paper Trail was built to close that gap without turning automation into silent write-back.",
    sections: [
      section("What The Workflow Does", [
        paragraph(
          "PR-to-Paper Trail reviews recent pull request activity, reads the surrounding repository context, and drafts the operational paper trail that usually gets forgotten. The useful outputs are not just summaries. They are structured suggestions that separate inspected facts, recommendations, unknowns, and actions that still need approval."
        ),
        list([
          "Review recent PR activity and relevant diffs.",
          "Pull in repository, issue, project, and documentation context where available.",
          "Draft ticket updates, documentation notes, follow-on actions, standup summaries, and audit receipts.",
          "Keep every write action behind an explicit human approval gate.",
        ]),
      ]),
      section("Why The Approval Boundary Matters", [
        paragraph(
          "The whole point is to reduce admin drag without pretending automation should own project state. The workflow is intentionally draft-first. It can observe, reconcile, and recommend, but it should not quietly mutate tickets, docs, or repositories just because it found something plausible to say."
        ),
        quote(
          "Observe, recommend, approve, act is a much better workflow than observe, act.",
          "PR-to-Paper Trail principle"
        ),
      ]),
      section("Why It Became Reusable", [
        paragraph(
          "Once the logic was separated cleanly, the workflow stopped looking like a one-off helper and started looking like a portable operating pattern. The reusable version now supports manual review mode for one PR, scheduled digest mode for recurring review windows, and approval mode for explicit human-authorised write-back."
        ),
        links([
          {
            label: "EvalKit repository",
            href: "https://github.com/Peippo1/EvalKit",
          },
          {
            label: "PR-to-Paper Trail package",
            href: "https://github.com/Peippo1/EvalKit/tree/main/pr_to_paper_trail",
          },
          {
            label: "PR-to-Paper Trail skill",
            href: "https://github.com/Peippo1/EvalKit/tree/main/skills/pr-to-paper-trail",
          },
        ]),
      ]),
    ],
  },
  {
    slug: "building-with-clear-evaluation-loops",
    title: "Building With Clear Evaluation Loops",
    date: "March 27, 2026",
    category: "Applied AI",
    summary:
      "How smaller, clearer evaluation loops can create more product velocity than broad benchmark suites.",
    readingTime: "4 min read",
  },
  {
    slug: "interfaces-for-slow-thinking",
    title: "Interfaces for Slow Thinking",
    date: "January 18, 2026",
    category: "Design",
    summary:
      "Designing tools for research and analysis means optimising for orientation, not just speed.",
    readingTime: "5 min read",
  },
  {
    slug: "making-agents-boring-in-production",
    title: "Making Agents Boring in Production",
    date: "October 9, 2025",
    category: "Systems",
    summary:
      "How staged execution, fallback rules, and operator visibility make agent workflows much easier to trust.",
    readingTime: "5 min read",
  },
];

export const writingEntries: WritingEntry[] = [
  ...campaignForgeSeriesEntries,
  ...cityScoutSeriesEntries,
  ...hoxaSeriesEntries,
  ...creatorOSSeriesEntries,
  ...evalKitSeriesEntries,
  ...archiveWritingEntries,
];

export function getOrderedWritingEntries() {
  return writingEntries;
}

export function getWritingEntryBySlug(slug: string) {
  return writingEntries.find((entry) => entry.slug === slug);
}

export function getCampaignForgeSeriesEntries() {
  return campaignForgeSeriesEntries;
}

export function getHoxaSeriesEntries() {
  return hoxaSeriesEntries;
}

export function getCityScoutSeriesEntries() {
  return cityScoutSeriesEntries;
}

export function getCreatorOSSeriesEntries() {
  return creatorOSSeriesEntries;
}

export function getEvalKitSeriesEntries() {
  return evalKitSeriesEntries;
}

export function getStandaloneArchiveEntries() {
  return writingEntries.filter((entry) => !entry.series);
}

export function getSeriesEntries(seriesSlug: string) {
  return writingEntries
    .filter((entry) => entry.series?.slug === seriesSlug)
    .sort((left, right) => (left.series?.order ?? 0) - (right.series?.order ?? 0));
}