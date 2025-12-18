import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  TrendingDown, 
  Users,
  ArrowRight,
  CheckCircle,
  Building2,
  CalendarCheck,
  Handshake
} from "lucide-react";

const benefits = [
  {
    title: "Faster Time-to-Hire",
    description: "Pre-screened candidates ready to start, reducing your recruitment cycle significantly.",
    icon: Clock,
  },
  {
    title: "Lower Dropout Rates",
    description: "Candidates are matched based on genuine interest and preparation, not just qualifications.",
    icon: TrendingDown,
  },
  {
    title: "Workforce Planning",
    description: "Build your talent pipeline with ongoing access to early-career candidates.",
    icon: Users,
  },
  {
    title: "Education Partnerships",
    description: "Connect directly with schools and colleges through our established relationships.",
    icon: Handshake,
  },
];

const packages = [
  {
    title: "Apprenticeships",
    priceRange: "£2,000 – £4,000",
    description: "Per successful placement",
    features: [
      "Pre-screened apprenticeship candidates",
      "Skills and aptitude matching",
      "Candidate preparation and briefing",
      "90-day placement guarantee",
    ],
    popular: false,
  },
  {
    title: "Graduate & Early Career",
    priceRange: "12% – 18%",
    description: "Of first year salary",
    features: [
      "University and college graduates",
      "T-Level completers",
      "Comprehensive screening process",
      "Interview coordination",
      "6-month rebate period",
    ],
    popular: true,
  },
  {
    title: "Pipeline Partnership",
    priceRange: "£20,000 – £50,000",
    description: "Annual retained partnership",
    features: [
      "Dedicated account manager",
      "Exclusive school/college partnerships",
      "Employer branding at career events",
      "Priority access to top talent",
      "Quarterly pipeline reviews",
      "Workforce planning support",
    ],
    popular: false,
  },
];

export default function EmployersPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Hire the <span className="text-gradient-primary">Next Generation</span> of Construction Talent
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Access a pipeline of motivated, pre-screened early-career candidates ready to contribute 
              to your projects. From apprentices to graduates, we match you with talent that fits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Button variant="cta-primary" size="lg" asChild>
                <Link to="/employer-dashboard">
                  Start Hiring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Employers Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in early-career construction recruitment, delivering results that matter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border card-glow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recruitment Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible options to suit your hiring needs, from one-off placements to ongoing partnerships
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className={`p-8 rounded-xl border ${
                  pkg.popular 
                    ? "bg-card border-primary/50 relative" 
                    : "bg-card border-border"
                } card-glow`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{pkg.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{pkg.priceRange}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={pkg.popular ? "cta-primary" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Build Your Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss your hiring needs and find the right talent for your construction projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta-primary" size="lg" asChild>
                <Link to="/employer-dashboard">Hire Talent</Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
