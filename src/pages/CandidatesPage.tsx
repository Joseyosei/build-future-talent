import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Search, 
  ClipboardCheck, 
  Briefcase,
  ArrowRight,
  FileText,
  Users,
  GraduationCap,
  CheckCircle
} from "lucide-react";

const journeySteps = [
  {
    step: 1,
    title: "Register",
    description: "Create your free profile and tell us about your qualifications, interests, and career goals.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Screening",
    description: "Our team reviews your profile and matches you with suitable opportunities in construction.",
    icon: Search,
  },
  {
    step: 3,
    title: "Shortlist",
    description: "Get shortlisted for roles that match your skills and receive interview preparation support.",
    icon: ClipboardCheck,
  },
  {
    step: 4,
    title: "Placement",
    description: "Land your dream role and start building your career in the construction industry.",
    icon: Briefcase,
  },
];

const benefits = [
  {
    title: "Free Career Support",
    description: "Access to career guidance, CV reviews, and interview preparation at no cost.",
    icon: FileText,
  },
  {
    title: "Industry Connections",
    description: "Direct access to leading construction employers actively hiring early-career talent.",
    icon: Users,
  },
  {
    title: "Skills Development",
    description: "Resources and workshops to help you develop the skills employers are looking for.",
    icon: GraduationCap,
  },
  {
    title: "Ongoing Support",
    description: "We don't just find you a job — we support your career growth after placement.",
    icon: CheckCircle,
  },
];

export default function CandidatesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.08),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Launch Your <span className="text-gradient-secondary">Construction Career</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Whether you're fresh from school, completing an apprenticeship, or a recent graduate, 
              we connect you with employers who value your potential. Our service is completely free for candidates.
            </p>
            <Button variant="cta-secondary" size="lg" asChild className="animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Link to="/candidate-dashboard">
                Register Now — It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free, comprehensive support to help you start your construction career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border card-glow card-glow-secondary"
              >
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Journey */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Journey to Employment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, supported process from registration to your first day on the job
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center">
                  <div className="relative mx-auto mb-6">
                    <div className="h-16 w-16 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center mx-auto">
                      <step.icon className="h-7 w-7 text-secondary" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Career?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of candidates who have found their path into construction through BuildFuture Talent.
            </p>
            <Button variant="cta-secondary" size="lg" asChild>
              <Link to="/candidate-dashboard">
                Register as a Candidate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
