import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service · PlacementPrep AI" },
      { name: "description", content: "Fair-use terms for the PlacementPrep AI interview simulator." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-hero-gradient grid place-items-center shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold tracking-tight">PlacementPrep</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold font-display">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 mt-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-lg font-semibold mb-2">Fair use</h2>
            <p>
              PlacementPrep AI is a free practice tool for engineering interview preparation. You
              agree to use it for personal learning and not to abuse, scrape, or overload the
              service. Automated or bulk requests are not permitted.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">AI-generated content</h2>
            <p>
              Questions, evaluations, and model answers are produced by AI and may contain
              mistakes. Treat them as study aids, not authoritative answers. We make no guarantees
              about job outcomes or interview performance.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">No warranty</h2>
            <p>
              The service is provided "as is" without warranty of any kind. We may change, suspend,
              or discontinue features at any time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Acceptance</h2>
            <p>
              By using PlacementPrep AI you agree to these terms. If you don't agree, please don't
              use the service.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
