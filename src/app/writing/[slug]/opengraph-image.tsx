import { ImageResponse } from "next/og";
import { getWritingEntryBySlug } from "@/data/writing-release-readiness";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function WritingOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWritingEntryBySlug(slug);
  const title = entry?.title ?? "Writing";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8f6f1", color: "#161714", padding: "72px", border: "18px solid #ece8df" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#647069" }}>
        <span>Tim Finch / Writing</span><span>{entry?.category ?? "Build note"}</span>
      </div>
      <div style={{ display: "flex", maxWidth: 1040, fontFamily: "serif", fontSize: title.length > 58 ? 66 : 84, lineHeight: 1.05, letterSpacing: -3 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#4e5953" }}>
        <span style={{ display: "flex", width: 90, height: 8, background: "#0f8a64" }} />
        <span>{entry?.date ?? "Build thread"}</span>
      </div>
    </div>,
    size
  );
}
