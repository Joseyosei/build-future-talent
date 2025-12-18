import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Presentation, 
  Users, 
  Calendar,
  Briefcase,
  ArrowRight,
  School,
  CheckCircle
} from "lucide-react";

const programs = [
  {
    title: "Career Talks",
    description: "Engaging presentations introducing students to diverse construction career paths, from trades to professional roles.",
    icon: Presentation,
    features: ["30-60 minute sessions", "Interactive Q&A", "Industry professionals", "Customized content"],
  },
  {
    title: "Skills Workshops",
    description: "Hands-on workshops developing employability skills including CV writing, interview techniques, and workplace readiness.",
    icon: Users,
    features: ["Practical activities", "Industry-relevant skills", "CV templates provided", "Mock interviews"],
  },
  {
    title: "Employer Networking Day",
    description: "Connect your students directly with construction employers looking to hire early-career talent.",
    icon: Calendar,
    features: ["Multiple employers", "Speed networking", "Live opportunities", "Follow-up support"],
  },
  {
    title: "Work Experience Matching",
    description: "We coordinate meaningful work placements with our employer partners, giving students real industry exposure.",
    icon: Briefcase,
    features: ["Vetted placements", "Health & safety briefing", "Structured program", "Feedback reports"],
  },
];

const benefits = [
  "Access to construction industry employers",
  "Free career resources for students",
  "Support for careers guidance teams",
  "Destination data improvement",
  "CEIAG benchmark compliance support",
  "Customized partnership approach",
];

export default function SchoolsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.06),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <School className="h-8 w-8 text-accent" />
              <span className="text-accent font-semibold">For Schools & Colleges</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Partner With Us to <span className="text-gradient-primary">Build Futures</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Connect your students with real opportunities in the construction industry. 
              Our partnership programs support your careers provision and help students 
              discover fulfilling career paths.
            </p>
            <Button variant="cta-primary" size="lg" asChild className="animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Link to="/contact">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free, flexible programs designed to support your careers provision
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="p-8 rounded-xl bg-card border border-border card-glow"
              >
                <div className="h-14 w-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <program.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why Partner With BuildFuture?</h2>
              <p className="text-muted-foreground mb-8">
                We understand the challenges faced by careers teams. Our programs are designed 
                to complement your existing provision and provide tangible outcomes for students.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-foreground">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-xl bg-card border border-border">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">150+</div>
                <p className="text-muted-foreground mb-6">Partner Schools & Colleges</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-background">
                    <div className="text-2xl font-bold text-foreground">500+</div>
                    <p className="text-sm text-muted-foreground">Career Talks Delivered</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background">
                    <div className="text-2xl font-bold text-foreground">2,000+</div>
                    <p className="text-sm text-muted-foreground">Work Placements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border">
            <School className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Partner?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can support your students' journey into construction careers.
            </p>
            <Button variant="cta-primary" size="lg" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
