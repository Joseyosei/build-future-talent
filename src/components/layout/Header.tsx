import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const visibleLinks = [
  { name: "Jobs", path: "/jobs" },
  { name: "Employers", path: "/employers" },
  { name: "Institutions", path: "/schools" },
];

const dropdownLinks = [
  { name: "About Us", path: "/about" },
  { name: "Resources", path: "/resources" },
  { name: "Contact Us", path: "/contact" },
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
          {visibleLinks.map((link) => (
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
          
          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-card focus:outline-none">
              More
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border">
              {dropdownLinks.map((link) => (
                <DropdownMenuItem key={link.path} asChild>
                  <Link
                    to={link.path}
                    className={`w-full cursor-pointer ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA Buttons - Always visible, compact on mobile */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 lg:h-9 px-4 text-sm"
            asChild
          >
            <Link to="/login">Sign In</Link>
          </Button>
          <Button 
            size="sm" 
            className="h-10 lg:h-9 px-5 text-sm rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            asChild
          >
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
