import type { WritingEntry } from "@/types/content";
import {
  getCampaignForgeSeriesEntries,
  getCityScoutSeriesEntries as getBaseCityScoutSeriesEntries,
  getCreatorOSSeriesEntries,
  getEvalKitSeriesEntries,
  getHoxaSeriesEntries,
  getOrderedWritingEntries as getBaseOrderedWritingEntries,
  getStandaloneArchiveEntries,
  getWritingEntryBySlug as getBaseWritingEntryBySlug,
} from "@/data/writing";

const cityScoutReleaseReadinessSlug = "cityscout-release-readiness-push";
const cityScoutPreviousSlug = "extending-cityscout-to-web";
const cityScoutSeriesSlug = "cityscout-build-thread";
const cityScoutSeriesName = "CityScout Build Thread";
const cityScoutSeriesDescription =
  "A build thread on building a calmer, city-first travel product across iOS, backend, and a future web planning layer.";

const cityScoutReleaseReadinessEntry: WritingEntry = {
  slug: cityScoutReleaseReadinessSlug,
  title: "CityScout Release Readiness: Turning a Prototype Into a Product",
  date: "July 12, 2026",
  category: "Build Log",
  summary:
    "CityScout is moving from prototype shape to release discipline: security boundaries, tests, mobile configuration, store metadata, and the remaining work before it can be treated as a real product.",
  intro:
    "The recent CityScout work has been less about adding flashy surface area and more about removing the reasons the product could not be trusted yet. That means tightening web auth, backend limits, failure behavior, release configuration, Android structure, and the documentation that keeps all of it honest.",
  readingTime: "9 min read",
  pullQuote: {
    quote:
      "Release readiness is less about one big launch moment and more about removing the reasons the product cannot be trusted yet.",
  },
  series: {
    slug: cityScoutSeriesSlug,
    name: cityScoutSeriesName,
    description: cityScoutSeriesDescription,
    order: 4,
    previousSlug: cityScoutPreviousSlug,
  },
  sections: [
    {
      title: "Why This Push Matters",
      blocks: [
        {
          type: "paragraph",
          content:
            "The early energy around CityScout was about proving the shape of the product: a local-first iOS app, a shared AI backend, structured city content, and a future web planning surface. That work made the prototype legible. It did not, by itself, make the product ready to trust.",
        },
        {
          type: "paragraph",
          content:
            "The current push is different. It is about release discipline: fewer loose assumptions, clearer environment boundaries, safer failure behavior, and enough tests that the product can change without quietly breaking its contract. That is less visible than a new screen, but it is the work that decides whether the product can leave the demo stage.",
        },
      ],
    },
    {
      title: "Security Before Surface Area",
      blocks: [
        {
          type: "paragraph",
          content:
            "The browser layer raises the security bar because it cannot be trusted with the same assumptions as a native build or a server process. CityScout now treats that boundary more explicitly: web requests need a session before they can proxy AI work, OpenAI credentials stay server-side, and the backend keeps its shared-secret boundary for trusted clients.",
        },
        {
          type: "list",
          items: [
            "Keep OpenAI credentials out of browser and native clients.",
            "Require a Supabase web session before web routes can call protected AI endpoints.",
            "Use shared-secret backend auth for trusted app-to-server calls instead of exposing model credentials.",
            "Treat rate limiting, request caps, and structured non-2xx failures as product infrastructure rather than deployment polish.",
          ],
        },
        {
          type: "paragraph",
          content:
            "This is not the whole security story, but it is the right direction. The product should add surface area only when the trust boundary around that surface is clear enough to defend.",
        },
      ],
    },
    {
      title: "Making Mobile Release Real",
      blocks: [
        {
          type: "paragraph",
          content:
            "The iOS app now has a more concrete release configuration path, including backend URL and shared-secret settings that can be supplied without hardcoding production values. That matters because a mobile release is not only a binary. It is signing, configuration, store metadata, privacy details, support URLs, and a repeatable way to build the same thing twice.",
        },
        {
          type: "paragraph",
          content:
            "Android is now real enough to have its own release questions too. The current Android work adds backend configuration, optional signing guidance, unit coverage, and a first destination-and-trip shell. That shell is intentionally modest. It gives the platform a release-shaped structure without pretending the Android feature set has caught up with iOS.",
        },
      ],
    },
    {
      title: "Tests As Product Infrastructure",
      blocks: [
        {
          type: "paragraph",
          content:
            "The test work is doing more than checking syntax. Backend route tests now cover auth, request limits, invalid model responses, blank guide content, and failure paths that need to stay predictable in production. Web checks cover linting, unit behavior, and build output. Android has unit coverage around the first UI state logic and Gradle release/debug configuration checks.",
        },
        {
          type: "list",
          items: [
            "Backend route tests protect the API contract and security boundary.",
            "Regression tests catch OpenAI malformed JSON and blank guide-response behavior before it reaches users.",
            "CI checks keep web, backend, iOS-adjacent documentation, and Android work from drifting independently.",
            "Android unit tests make the new trip shell safer to extend without turning the first implementation into a dead-end prototype.",
          ],
        },
        {
          type: "paragraph",
          content:
            "That is the product value of testing here. It makes the boring parts observable enough that the visible parts can change with less risk.",
        },
      ],
    },
    {
      title: "What Is Still Not Done",
      blocks: [
        {
          type: "paragraph",
          content:
            "This push is not a launch announcement. It is a release-readiness pass, and several important pieces are still unfinished. The Android app still needs real destination content, tab content, and instrumented UI coverage. Store release work still needs account-side setup, screenshots, signing material, tester groups, privacy details, and support links.",
        },
        {
          type: "list",
          items: [
            "Android feature content needs to move beyond the shell into useful trip and destination flows.",
            "Store assets and account-side setup still need to be completed for iOS and Android distribution.",
            "Web proxy behavior needs stronger observability so production failures are easier to diagnose.",
            "A canonical itinerary V1 still needs to settle around stops, timing, validation, and contract tests.",
            "Backend dependency locking can be tightened further if the project needs a full transitive production lock.",
          ],
        },
        {
          type: "paragraph",
          content:
            "That remaining list is the point of writing this down. CityScout is no longer only asking whether the idea works. It is asking whether the system around the idea is disciplined enough to make the product safe to release.",
        },
      ],
    },
  ],
};

function withReleaseReadinessLink(entry: WritingEntry): WritingEntry {
  if (entry.slug !== cityScoutPreviousSlug || !entry.series) {
    return entry;
  }

  return {
    ...entry,
    series: {
      ...entry.series,
      nextSlug: cityScoutReleaseReadinessSlug,
    },
  };
}

export function getCityScoutSeriesEntries() {
  return [
    ...getBaseCityScoutSeriesEntries().map(withReleaseReadinessLink),
    cityScoutReleaseReadinessEntry,
  ];
}

export function getOrderedWritingEntries() {
  return [
    ...getBaseOrderedWritingEntries().map(withReleaseReadinessLink),
    cityScoutReleaseReadinessEntry,
  ];
}

export function getWritingEntryBySlug(slug: string) {
  if (slug === cityScoutReleaseReadinessSlug) {
    return cityScoutReleaseReadinessEntry;
  }

  const entry = getBaseWritingEntryBySlug(slug);
  return entry ? withReleaseReadinessLink(entry) : undefined;
}

export {
  getCampaignForgeSeriesEntries,
  getCreatorOSSeriesEntries,
  getEvalKitSeriesEntries,
  getHoxaSeriesEntries,
  getStandaloneArchiveEntries,
};
