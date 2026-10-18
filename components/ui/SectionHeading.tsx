import React from "react";
import { clsx } from "clsx";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional right-aligned action, e.g. a link or button. */
  action?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
}

/**
 * Shared section header: eyebrow + display title + optional lead and action.
 * Keeps every section on the same typographic rhythm (DESIGN.md §6).
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        action && "md:flex-row md:items-end md:justify-between md:gap-8",
        className
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-2.5",
          align === "center" && "items-center text-center"
        )}
      >
        <span className="type-eyebrow text-accent-ink">{eyebrow}</span>
        <h2 className="font-heading type-h2 max-w-2xl text-balance text-ink">
          {title}
        </h2>
        {lead && (
          <p className="type-body max-w-[56ch] text-muted">{lead}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
