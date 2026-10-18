import React from "react";

interface MarqueeProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * Infinite horizontal rail. Content is duplicated once for a seamless loop and
 * the animation is disabled under prefers-reduced-motion (see globals.css).
 */
export default function Marquee<T>({
  items,
  renderItem,
  className,
}: MarqueeProps<T>) {
  const doubled = [...items, ...items];
  return (
    <div className={`awn-marquee group relative overflow-hidden ${className ?? ""}`}>
      <div className="awn-marquee-track flex w-max items-center gap-3">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
