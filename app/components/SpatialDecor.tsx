type SpatialVariant = "fragment" | "orbit" | "tunnel" | "signal" | "converge";

const labels: Record<SpatialVariant, string> = {
  fragment: "FRAGMENT / RECONCILE",
  orbit: "ECOSYSTEM / ORBIT",
  tunnel: "MIGRATION / TRANSIT",
  signal: "SERVICE / TELEMETRY",
  converge: "KONVERGENS / READY",
};

export default function SpatialDecor({
  variant,
  className = "",
}: {
  variant: SpatialVariant;
  className?: string;
}) {
  return (
    <div
      className={`spatial-decor spatial-decor--${variant} ${className}`}
      aria-hidden="true"
    >
      <span className="spatial-decor__plane spatial-decor__plane--one" />
      <span className="spatial-decor__plane spatial-decor__plane--two" />
      <span className="spatial-decor__ring spatial-decor__ring--one" />
      <span className="spatial-decor__ring spatial-decor__ring--two" />
      <span className="spatial-decor__axis" />
      <span className="spatial-decor__node spatial-decor__node--one" />
      <span className="spatial-decor__node spatial-decor__node--two" />
      <span className="spatial-decor__node spatial-decor__node--three" />
      <span className="spatial-decor__label">{labels[variant]}</span>
    </div>
  );
}
