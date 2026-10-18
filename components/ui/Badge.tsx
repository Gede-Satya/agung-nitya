import React from "react";

export type BadgeVariant =
  | "neutral"
  | "subtle"
  | "accent"
  | "pdn"
  | "impor"
  | "tkdn"
  | "success"
  | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-canvas text-ink border border-rule shadow-2xs",
  subtle: "bg-wash text-muted border border-rule",
  accent: "bg-accent/10 text-accent-ink border border-accent/20",
  pdn: "bg-success/10 text-success border border-success/20",
  impor: "bg-accent/10 text-accent-ink border border-accent/20",
  tkdn: "bg-success text-white shadow-2xs",
  success: "bg-success/10 text-success border border-success/20",
  outline: "bg-transparent text-muted border border-rule",
};

export function Badge({
  variant = "subtle",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-medium tracking-normal select-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
