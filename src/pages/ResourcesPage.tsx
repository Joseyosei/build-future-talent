import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MessageSquare, 
  Compass,
  Download,
  ArrowRight,
  BookOpen
} from "lucide-react";

const resources = [
  {
    title: "CV Templates",
    description: "Professional CV templates designed for construction roles, from apprenticeships to graduate positions.",
    icon: FileText,
    cta: "Download Templates",
    items: ["Apprenticeship CV Template", "Graduate CV Template", "Career Change CV Template", "Cover Letter Guide"],
  },
  {
    title: "Interview Preparation",
    description: "Comprehensive guides and tips to help you ace your construction industry interviews.",
    icon: MessageSquare,
    cta: "View Guides",
    items: ["Common Interview Questions", "STAR Method Guide", "Technical Assessment Tips", "Video Interview Guide"],
  },
  {
    title: "Career Pathways",
    description: "Explore the diverse career paths available in the construction industry.",
    icon: Compass,
    cta: "Explore Careers",
    items: ["Trades & Crafts", "Site Management", "Quantity Surveying", "Civil Engineering", "Health & Safety", "Project Management"],
  },
];

const guides = [
  {
    title: "Getting Started in Construction",
    description: "A beginner's guide to understanding the construction industry and finding your first role.",
    readTime: "10 min read",
  },
  {
    title: "Understanding Apprenticeships",
    description: "Everything you need to know about construction apprenticeships in the UK.",
    readTime: "8 min read",
  },
  {
    title: "T-Levels Explained",
    description: "What are T-Levels and how can they lead to a career in construction?",
    readTime: "6 min read",
  },
  {
    title: "CSCS Cards Guide",
    description: "Understanding CSCS cards, why you need one, and how to get one.",
    readTime: "5 min read",
  },
];

export default function ResourcesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 gradient-hero border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Career <span className="text-gradient-secondary">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Free tools, templates, and guides to help you succeed in your construction career journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Resources */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="p-8 rounded-xl bg-card border border-border card-glow card-glow-secondary flex flex-col"
              >
                <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <resource.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{resource.title}</h3>
                <p className="text-muted-foreground mb-6">{resource.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {resource.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <Download className="h-4 w-4 text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  {resource.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 md:py-24 bg-background-deep">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Career Guides</h2>
              <p className="text-muted-foreground">In-depth articles to help you understand the industry</p>
            </div>
            <BookOpen className="h-10 w-10 text-primary hidden md:block" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                    <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
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
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground mb-8">
              Register with BuildFuture Talent for personalized career support and access to exclusive opportunities.
            </p>
            <Button variant="cta-secondary" size="lg" asChild>
              <Link to="/candidate-dashboard">
                Register for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
