import { useMemo } from "react";

type Tag = {
  label: string;
  // position % within container
  top: string;
  left: string;
  // visual variants
  size?: "sm" | "md" | "lg";
  faded?: boolean;
  delay?: number;
  duration?: number;
  rotate?: number;
  z?: number;
};

const TAGS: Tag[] = [
  { label: "SaaS", top: "8%", left: "10%", size: "md", delay: 0, duration: 7, rotate: -4, z: 30 },
  { label: "Artificial Intelligence", top: "4%", left: "62%", size: "lg", delay: 1.2, duration: 9, rotate: 3, z: 40 },
  { label: "Web3", top: "22%", left: "82%", size: "sm", delay: 0.6, duration: 6, rotate: 6, z: 20 },
  { label: "San Francisco", top: "32%", left: "4%", size: "md", delay: 1.8, duration: 8, rotate: 2, z: 30 },
  { label: "Austin", top: "70%", left: "8%", size: "sm", delay: 0.4, duration: 7.5, rotate: -3, z: 30 },
  { label: "iOS Developers", top: "62%", left: "70%", size: "md", delay: 2.1, duration: 8.5, rotate: -5, z: 40 },
  { label: "Cyber Security", top: "78%", left: "44%", size: "md", delay: 0.9, duration: 9.5, rotate: 4, z: 30 },
  { label: "Robotics", top: "82%", left: "82%", size: "sm", delay: 1.5, duration: 7, rotate: -2, z: 20 },
  // faded background layer
  { label: "Machine Learning", top: "14%", left: "32%", size: "sm", faded: true, delay: 0.2, duration: 11, rotate: -6, z: 10 },
  { label: "DevOps", top: "50%", left: "88%", size: "sm", faded: true, delay: 1.1, duration: 10, rotate: 5, z: 10 },
  { label: "Remote", top: "88%", left: "24%", size: "sm", faded: true, delay: 0.7, duration: 12, rotate: -4, z: 10 },
  { label: "Fintech", top: "18%", left: "48%", size: "sm", faded: true, delay: 2.4, duration: 10.5, rotate: 3, z: 10 },
  { label: "New York", top: "44%", left: "18%", size: "sm", faded: true, delay: 1.6, duration: 11.5, rotate: -2, z: 10 },
];

const SIZE_CLS: Record<NonNullable<Tag["size"]>, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5 font-medium",
};

export function FloatingTagCloud() {
  // memo so re-renders don't shuffle anim phases
  const tags = useMemo(() => TAGS, []);

  return (
    <div className="relative w-full" aria-hidden="true">
      {/* aspect box that keeps the scene proportional and responsive */}
      <div className="relative mx-auto w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9]">
        {/* soft mesh halo behind */}
        <div className="absolute inset-0 bg-mesh opacity-80 blur-2xl pointer-events-none" />

        {/* Tags */}
        {tags.map((t, i) => (
          <span
            key={i}
            className={[
              "tag-float absolute select-none whitespace-nowrap rounded-full bg-card text-card-foreground border border-border shadow-card",
              "transition-all duration-300 ease-out will-change-transform",
              "hover:scale-105 hover:shadow-glow hover:border-primary/40 hover:z-50 cursor-default",
              SIZE_CLS[t.size ?? "md"],
              t.faded ? "opacity-40 blur-[1.5px]" : "opacity-100",
            ].join(" ")}
            style={{
              top: t.top,
              left: t.left,
              ["--r" as string]: `${t.rotate ?? 0}deg`,
              transform: `translate(-50%, -50%) rotate(${t.rotate ?? 0}deg)`,
              zIndex: t.z ?? 20,
              animationDelay: `${t.delay ?? 0}s`,
              animationDuration: `${t.duration ?? 8}s`,
            }}
          >
            {t.label}
          </span>
        ))}

        {/* Central headline */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="font-display font-bold tracking-tight text-3xl sm:text-5xl md:text-6xl leading-tight">
              Crack your interview with <span className="text-gradient">AI feedback</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Pick a role, answer realistic questions, and get an instant score with strengths, gaps, and the ideal answer — like having a senior engineer in your room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
