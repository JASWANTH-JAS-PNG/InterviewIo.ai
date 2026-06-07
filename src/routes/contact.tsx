import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · PlacementPrep AI" },
      { name: "description", content: "Get in touch with the PlacementPrep AI team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Thanks! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

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

      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-12">
        <h1 className="text-3xl font-semibold font-display">Contact us</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Questions, feedback, or bug reports — we'd love to hear from you.
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <a href="mailto:support@placementprep.ai" className="hover:text-foreground">
            support@placementprep.ai
          </a>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 rounded-3xl border border-border bg-card shadow-card p-6 md:p-8 space-y-4"
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 min-h-[140px]"
            />
          </div>
          <Button type="submit" className="bg-hero-gradient text-primary-foreground shadow-glow">
            Send message
          </Button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
