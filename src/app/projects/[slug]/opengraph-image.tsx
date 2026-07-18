import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project";
  const summary = project?.shortSummary ?? "A project by Tim Finch.";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8f6f1", color: "#161714", padding: "72px", border: "18px solid #ece8df" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#647069" }}>
        <span>Tim Finch / Project</span><span>2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
        <div style={{ fontFamily: "serif", fontSize: 104, lineHeight: 1, letterSpacing: -5 }}>{title}</div>
        <div style={{ marginTop: 32, fontSize: 34, lineHeight: 1.35, color: "#4e5953" }}>{summary}</div>
      </div>
      <div style={{ display: "flex", width: 180, height: 8, background: "#0f8a64" }} />
    </div>,
    size
  );
}
