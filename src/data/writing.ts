import type {
  DiagramBlock,
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
  "A build thread documenting the product, design, training system, and architecture decisions behind Hoxa, an adaptive fitness app for beginner to intermediate users.";
const cityScoutSeriesSlug: WritingSeriesSlug = "cityscout-build-thread";
const cityScoutSeriesName = "CityScout Build Thread";
const cityScoutSeriesDescription =
  "A build thread documenting the product reasoning, native iOS app, AI backend, and future web planning layer behind CityScout, an AI-powered city-first travel companion.";

export const cityScoutSummary = {
  oneLine:
    "CityScout is a local-first iOS travel companion with a shared AI backend and a planned web planning layer.",
  readerFacing:
    "CityScout is built around a simple idea: travel feels better when the product understands the city, not just the booking. The iOS app keeps trip state close to the device, while a FastAPI backend handles itinerary generation, guide chat, and structured AI outputs. A future web layer will support planning and sharing, but iOS remains the in-trip companion.",
  technical:
    "CityScout is a native iOS travel app with a FastAPI backend and a shared AI contract. OpenAI calls stay server-side behind shared-secret auth, with seeded city content and structured endpoints for itineraries and guide chat. The product is being shaped for security, testability, and a future web planning layer.",
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

const hoxaEntriesWithoutSeries: Omit<WritingEntry, "series">[] = [
  {
    slug: "why-im-building-hoxa",
    title: "Why I'm Building Hoxa",
    date: "April 12, 2026",
    category: "Product Strategy",
    summary:
      "Hoxa starts from a simple observation: many fitness products lose people long before training becomes useful, because the product asks them to perform confidence they do not yet have.",
    intro:
      "I am building Hoxa as an attempt to make fitness software feel more companionable, more legible, and less theatrical. The product is aimed at people who want to get stronger, move more confidently, and train consistently without stepping into the visual and emotional language that still dominates much of the category.",
    readingTime: "8 min read",
    pullQuote: {
      quote:
        "Most beginners do not need more intensity from software. They need better orientation.",
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
      "The visual and interaction tone of Hoxa has to lower friction without flattening ambition. Calm should come from clear priorities, not from stripping the interface until it feels generic.",
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
      "The MVP should be broad enough to express the product thesis, but narrow enough that every feature contributes directly to a credible training loop.",
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
      "The training engine should adapt in visible, defensible ways. If users cannot understand why the week changed, the system will feel clever before it feels trustworthy.",
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
      "The Hoxa architecture should support adaptation, accountability, and future integrations without turning the product into an opaque tangle of services too early.",
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
      "AI can make fitness software more responsive and more understandable, but only if its role stays narrow enough to be earned and explained.",
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
          "One of the easier ways to lose trust is to let the system sound wiser than it is. Fitness products are already operating close to people’s bodies, routines, anxieties, and self-perception. That context deserves precision. If AI is involved, the product should be candid about what it is doing and what it is not doing."
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
      "CityScout is a city-first travel companion designed to help people orient themselves before a trip starts, while keeping the product calm, local-first, and careful about where AI actually belongs.",
    intro:
      "I am building CityScout around a simple premise: travel should feel local, legible, and calm. The product is meant to help someone understand a city before it tries to optimise the trip for them.",
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
      "CityScout now keeps the iOS app thin, the backend authoritative, and OpenAI behind a server boundary so itinerary generation and guide chat stay easier to secure, test, and evolve.",
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
      "The web layer should expand where planning happens and where trips are shared, while keeping iOS as the in-trip companion and the backend contract as the shared source of truth.",
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

export const archiveWritingEntries: WritingEntry[] = [
  {
    slug: "building-with-clear-evaluation-loops",
    title: "Building With Clear Evaluation Loops",
    date: "March 27, 2026",
    category: "Applied AI",
    summary:
      "How small, legible evaluation loops create more product velocity than broad benchmark suites.",
    readingTime: "4 min read",
  },
  {
    slug: "interfaces-for-slow-thinking",
    title: "Interfaces for Slow Thinking",
    date: "January 18, 2026",
    category: "Design",
    summary:
      "Designing tools for research and analysis means optimising for orientation, not just throughput.",
    readingTime: "5 min read",
  },
  {
    slug: "making-agents-boring-in-production",
    title: "Making Agents Boring in Production",
    date: "October 9, 2025",
    category: "Systems",
    summary:
      "How staged execution, fallback rules, and operator visibility improve the reliability of agent workflows.",
    readingTime: "5 min read",
  },
];

export const writingEntries: WritingEntry[] = [
  ...cityScoutSeriesEntries,
  ...hoxaSeriesEntries,
  ...archiveWritingEntries,
];

export function getOrderedWritingEntries() {
  return writingEntries;
}

export function getWritingEntryBySlug(slug: string) {
  return writingEntries.find((entry) => entry.slug === slug);
}

export function getHoxaSeriesEntries() {
  return hoxaSeriesEntries;
}

export function getCityScoutSeriesEntries() {
  return cityScoutSeriesEntries;
}

export function getStandaloneArchiveEntries() {
  return writingEntries.filter((entry) => !entry.series);
}

export function getSeriesEntries(seriesSlug: string) {
  return writingEntries
    .filter((entry) => entry.series?.slug === seriesSlug)
    .sort((left, right) => (left.series?.order ?? 0) - (right.series?.order ?? 0));
}
