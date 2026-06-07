import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · PlacementPrep AI" },
      { name: "description", content: "How PlacementPrep AI handles your data and third-party cookies." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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

      <main className="flex-1 mx-auto max-w-3xl px-6 py-12 prose-sm">
        <h1 className="text-3xl font-semibold font-display">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 mt-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-lg font-semibold mb-2">Your data, your control</h2>
            <p>
              PlacementPrep AI respects your privacy. We do not require an account to use the mock
              interview simulator, and your typed answers stay in your browser's local storage on
              your own device. We do not sell personal data.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Third-party advertising & cookies</h2>
            <p>
              We use Google AdSense to display advertisements on this site. Google and its partners
              may use cookies (including the DoubleClick DART cookie) to serve ads based on your
              prior visits to this and other websites. You can opt out of personalised advertising
              by visiting{" "}
              <a href="https://www.google.com/settings/ads" className="underline">
                Google Ad Settings
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">AI processing</h2>
            <p>
              Questions and answers you submit are sent to our AI provider only to generate
              feedback and are not used to train models. We do not store this content on our
              servers.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              Questions about this policy? Reach us via the{" "}
              <Link to="/contact" className="underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
