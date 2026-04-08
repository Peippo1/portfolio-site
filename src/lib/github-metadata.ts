export type GitHubRepositoryMetadata = {
  repoName?: string;
  lastUpdated?: string;
  primaryLanguage?: string;
};

export interface GitHubMetadataProvider {
  getProjectMetadata(slug: string): GitHubRepositoryMetadata | null;
}

const localGitHubMetadata: Record<string, GitHubRepositoryMetadata> = {
  "campaignforge-ai": {
    repoName: "campaignforge-ai",
    lastUpdated: "2026-04-01",
    primaryLanguage: "TypeScript",
  },
  streamsense: {
    repoName: "streamsense",
    lastUpdated: "2026-03-14",
    primaryLanguage: "TypeScript",
  },
  trendnest: {
    repoName: "trendnest",
    lastUpdated: "2026-02-20",
    primaryLanguage: "Python",
  },
  "creative-automation-pipeline-poc": {
    repoName: "creative-automation-pipeline-poc",
    lastUpdated: "2025-12-05",
    primaryLanguage: "TypeScript",
  },
  briefly: {
    repoName: "briefly",
    lastUpdated: "2026-01-18",
    primaryLanguage: "TypeScript",
  },
  "smart-reply-service": {
    repoName: "smart-reply-service",
    lastUpdated: "2025-11-29",
    primaryLanguage: "TypeScript",
  },
};

class LocalGitHubMetadataProvider implements GitHubMetadataProvider {
  getProjectMetadata(slug: string) {
    return localGitHubMetadata[slug] ?? null;
  }
}

const githubMetadataProvider: GitHubMetadataProvider =
  new LocalGitHubMetadataProvider();

export function getProjectGitHubMetadata(slug: string) {
  return githubMetadataProvider.getProjectMetadata(slug);
}

export function formatRepositoryDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
