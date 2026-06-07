type Props = {
  variant?: "banner" | "skyscraper";
  className?: string;
};

export function AdPlaceholder({ variant = "banner", className = "" }: Props) {
  if (variant === "skyscraper") {
    return (
      <div
        className={`hidden lg:flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-muted-foreground text-xs h-[600px] w-full ${className}`}
        aria-label="Advertisement"
      >
        <span className="font-medium tracking-wide uppercase">Advertisement</span>
        <span className="mt-1 text-[11px] opacity-70">Placeholder</span>
      </div>
    );
  }
  return (
    <div
      className={`hidden sm:flex items-center justify-center w-full border-b border-border bg-muted/20 text-muted-foreground text-[11px] uppercase tracking-wider h-[60px] ${className}`}
      aria-label="Advertisement"
    >
      Advertisement Placeholder
    </div>
  );
}
