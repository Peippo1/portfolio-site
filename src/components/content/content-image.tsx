import Image from "next/image";
import type { ImageBlock } from "@/types/content";

export function ContentImage({ block }: { block: ImageBlock }) {
  return (
    <figure className="space-y-3">
      <Image
        src={block.src}
        alt={block.alt}
        width={block.width}
        height={block.height}
        sizes="(max-width: 768px) calc(100vw - 2rem), 704px"
        className="h-auto w-full rounded-[1.125rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]"
      />
      {block.caption ? (
        <figcaption className="text-xs leading-5 tracking-[0.12em] text-[var(--color-muted)] uppercase">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
