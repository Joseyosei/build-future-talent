import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Heart, 
  Handshake,
  Trophy,
  ArrowRight,
  Building2
} from "lucide-react";

const values = [
  {
    title: "Access",
    description: "Breaking down barriers and creating pathways for everyone to enter the construction industry, regardless of background.",
    icon: Target,
  },
  {
    title: "Preparation",
    description: "Equipping candidates with the skills, knowledge, and confidence they need to succeed in their roles.",
    icon: Heart,
  },
  {
    title: "Partnership",
    description: "Building strong relationships with employers, schools, and candidates based on trust and mutual benefit.",
    icon: Handshake,
  },
  {
    title: "Outcomes",
    description: "Measuring our success by the careers we launch and the positive impact on the construction industry.",
    icon: Trophy,
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_60%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To solve the construction industry's skills gap by connecting motivated early-career 
              talent with employers who value potential. We believe that with the right support, 
              anyone can build a fulfilling career in construction.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The UK construction industry faces a significant challenge: an aging workforce and 
                a critical shortage of skilled workers. At the same time, thousands of young people 
                are searching for meaningful career paths but don't know how to break into the industry.
              </p>
              <p>
                BuildFuture Talent was founded to bridge this gap. We specialize in early-career 
                recruitment — from school leavers and apprentices to university graduates — connecting 
                them with construction employers who understand the value of investing in young talent.
              </p>
              <p>
                Our approach is different. We don't just match CVs to job descriptions. We prepare 
                candidates for success through career guidance, skills development, and ongoing support. 
                We partner with schools and colleges to reach talent early. And we work closely with 
                employers to understand their needs and culture.
              </p>
              <p>
                The result? Better matches, lower dropout rates, and stronger retention. We're not 
                just filling roles — we're building the future of construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at BuildFuture Talent
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-card border border-border card-glow text-center"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">Years in Business</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">3,500+</div>
              <p className="text-muted-foreground">Successful Placements</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">92%</div>
              <p className="text-muted-foreground">Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Join Our Mission
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you're looking to start your career or find your next hire, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta-secondary" size="lg" asChild>
                <Link to="/candidates">For Candidates</Link>
              </Button>
              <Button variant="cta-primary" size="lg" asChild>
                <Link to="/employers">For Employers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
