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
  CheckCircle,
  UserCircle,
  FileText,
  HelpCircle,
  MapPin,
  BarChart3,
  Handshake
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pathways = [
  { name: "GCSEs", icon: BookOpen },
  { name: "A-Levels", icon: GraduationCap },
  { name: "T-Levels", icon: Award },
  { name: "Trade Schools", icon: Wrench },
  { name: "Apprenticeships", icon: Briefcase },
  { name: "Universities", icon: School },
];

const socialProofStats = [
  { label: "Candidates", value: 500, suffix: "+" },
  { label: "Employers", value: 120, suffix: "+" },
  { label: "Retention Rate", value: 94, suffix: "%" },
  { label: "UK Regions", value: 12, suffix: "" },
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

const howItWorks = {
  candidates: [
    { step: 1, title: "Create your profile", desc: "Tell us about your background and interests" },
    { step: 2, title: "Take the career quiz", desc: "Get matched to your ideal construction role" },
    { step: 3, title: "Apply & get hired", desc: "Connect with employers looking for you" },
  ],
  employers: [
    { step: 1, title: "Post your roles", desc: "Describe what you're looking for" },
    { step: 2, title: "Get matched candidates", desc: "AI-powered matching finds the best fit" },
    { step: 3, title: "Hire with confidence", desc: "Build Ready badges show who's prepared" },
  ],
  institutions: [
    { step: 1, title: "Register your institution", desc: "Upload your student cohorts" },
    { step: 2, title: "Track placements", desc: "Monitor student outcomes in real-time" },
    { step: 3, title: "Generate reports", desc: "One-click DfE, Ofsted, and CITB reporting" },
  ],
};

const quickLinks = [
  { name: "Candidates", path: "/candidates", icon: UserCircle, description: "Start your career journey" },
  { name: "Employers", path: "/employers", icon: Building2, description: "Find early-career talent" },
  { name: "Jobs", path: "/jobs", icon: Briefcase, description: "Browse opportunities" },
  { name: "Schools & Colleges", path: "/schools", icon: School, description: "Partner with us" },
  { name: "Resources", path: "/resources", icon: FileText, description: "Guides & templates" },
  { name: "About Us", path: "/about", icon: HelpCircle, description: "Our mission" },
  { name: "Contact Us", path: "/contact", icon: Users, description: "Get in touch" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-3xl md:text-4xl font-bold text-accent">{count}{suffix}</div>;
}

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards", fontFamily: 'Georgia, serif' }}>
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
                <Link to="/pathfinder">
                  Career Pathfinder
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Counters */}
      <section className="py-10 border-y border-border bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialProofStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Badges */}
      <section className="py-12 border-b border-border bg-card/30">
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

      {/* Quick Links Section - Mobile Navigation Alternative */}
      <section className="py-12 lg:hidden">
        <div className="container">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{link.name}</div>
                    <div className="text-xs text-muted-foreground">{link.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Three simple steps for every user type</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(["candidates", "employers", "institutions"] as const).map((type) => (
              <div key={type} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 capitalize" style={{ fontFamily: 'Georgia, serif' }}>
                  {type === "candidates" ? "🎓 Candidates" : type === "employers" ? "🏗️ Employers" : "🏫 Institutions"}
                </h3>
                <div className="space-y-4">
                  {howItWorks[type].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-sm font-bold text-accent">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Why BuildFuture Talent?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in connecting construction employers with the next generation of talent
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((card) => (
              <div key={card.title} className="p-8 rounded-xl bg-card border border-border card-glow group">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Schools & Colleges Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              For Schools & Colleges
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with us to place your students into rewarding construction careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { title: "Track Placements", desc: "Real-time dashboard showing where your students are placed and how they're progressing.", icon: MapPin },
              { title: "Government Reporting", desc: "One-click DfE, Ofsted, and CITB reports — no more manual spreadsheets.", icon: BarChart3 },
              { title: "Direct Employer Connections", desc: "Connect your students directly with vetted construction employers in your region.", icon: Handshake },
            ].map((card) => (
              <div key={card.title} className="p-8 rounded-xl bg-card border border-border card-glow group">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <card.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/register">Become an Institution Partner <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Ready to Build Your Future?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you're starting your career journey or looking for the next generation of construction talent, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="cta-secondary" size="lg" asChild>
                  <Link to="/register">Register as Candidate</Link>
                </Button>
                <Button variant="cta-primary" size="lg" asChild>
                  <Link to="/register">Start Hiring</Link>
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
