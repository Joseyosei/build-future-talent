import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  Building2, 
  Briefcase, 
  ArrowRight,
  School,
  Award,
  Wrench,
  BookOpen,
  CheckCircle
} from "lucide-react";

const pathways = [
  { name: "GCSEs", icon: BookOpen },
  { name: "A-Levels", icon: GraduationCap },
  { name: "T-Levels", icon: Award },
  { name: "Trade Schools", icon: Wrench },
  { name: "Apprenticeships", icon: Briefcase },
  { name: "Universities", icon: School },
];

const metrics = [
  { label: "Partner Schools", value: "150+" },
  { label: "Employer Clients", value: "500+" },
  { label: "Candidates Registered", value: "12,000+" },
  { label: "Placements Made", value: "3,500+" },
];

const valueCards = [
  {
    title: "Early Talent Pipeline",
    description: "Access a curated pool of motivated candidates from GCSEs to university graduates, all eager to start their construction careers.",
    icon: Users,
  },
  {
    title: "Education Partnerships",
    description: "Strong relationships with schools, colleges, and universities ensure a steady flow of well-prepared candidates.",
    icon: School,
  },
  {
    title: "Employer Outcomes",
    description: "Reduced time-to-hire, lower dropout rates, and better retention through targeted matching and candidate preparation.",
    icon: CheckCircle,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Building the Next Generation of{" "}
              <span className="text-gradient-primary">Construction Talent</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              From classroom to construction — apprenticeships, entry-level and graduate roles.
              Connecting early-career talent with industry-leading employers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Button variant="cta-secondary" size="lg" asChild>
                <Link to="/candidates">
                  I'm a Candidate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="cta-primary" size="lg" asChild>
                <Link to="/employers">
                  I'm an Employer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Badges */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {pathways.map((pathway, index) => (
              <div
                key={pathway.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default animate-fade-up opacity-0"
                style={{ animationDelay: `${0.4 + index * 0.05}s`, animationFillMode: "forwards" }}
              >
                <pathway.icon className="h-4 w-4 text-primary" />
                {pathway.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="p-6 rounded-xl bg-card border border-border text-center card-glow animate-fade-up opacity-0"
                style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why BuildFuture Talent?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in connecting construction employers with the next generation of talent
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((card, index) => (
              <div
                key={card.title}
                className="p-8 rounded-xl bg-card border border-border card-glow group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Build Your Future?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you're starting your career journey or looking for the next generation of construction talent, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="cta-secondary" size="lg" asChild>
                  <Link to="/candidate-dashboard">Register as Candidate</Link>
                </Button>
                <Button variant="cta-primary" size="lg" asChild>
                  <Link to="/employer-dashboard">Start Hiring</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
