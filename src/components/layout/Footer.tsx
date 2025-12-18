import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Candidates", path: "/candidates" },
  { name: "Employers", path: "/employers" },
  { name: "Jobs", path: "/jobs" },
  { name: "Schools & Colleges", path: "/schools" },
  { name: "Resources", path: "/resources" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const legalLinks = [
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Privacy Policy (GDPR)", path: "/privacy" },
  { name: "Cookie Policy", path: "/cookies" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-deep">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">
                BuildFuture Talent
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bridging the gap between early-career talent and construction industry 
              employers. Building careers, shaping futures.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get Started */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Get Started</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/candidate-dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Register as Candidate
              </Link>
              <Link
                to="/employer-dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Hire Talent
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} BuildFuture Talent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
