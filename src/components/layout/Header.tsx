import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Employers", path: "/employers" },
  { name: "Jobs", path: "/jobs" },
  { name: "Resources", path: "/resources" },
  { name: "Schools & Colleges", path: "/schools" },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">
              BuildFuture Talent
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight hidden lg:block">
              Early-career construction recruitment
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Only visible on lg screens and up */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons - Always visible, compact on mobile */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button 
            variant="cta-secondary" 
            size="sm" 
            className="h-10 lg:h-9 px-4 lg:px-4 text-sm rounded-full"
            asChild
          >
            <Link to="/candidate-dashboard">Register</Link>
          </Button>
          <Button 
            variant="cta-primary" 
            size="sm" 
            className="h-10 lg:h-9 px-4 lg:px-4 text-sm rounded-full"
            asChild
          >
            <Link to="/employer-dashboard">Hire Talent</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
