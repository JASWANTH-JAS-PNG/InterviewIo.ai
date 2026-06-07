import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} PlacementPrep AI</div>
        <nav className="flex items-center gap-4">
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
