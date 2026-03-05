import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, HardHat, MessageSquare, Users, Monitor, ArrowUp,
  ArrowRight, Clock, Award, Building2
} from "lucide-react";

const badges = [
  {
    title: "Health & Safety Awareness",
    desc: "Learn essential site safety, PPE requirements, and hazard identification for construction environments.",
    icon: Shield,
    time: "~15 mins",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "CSCS Exam Preparation",
    desc: "Practice questions and study material to prepare for your CSCS card test.",
    icon: HardHat,
    time: "~15 mins",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Site Communication Skills",
    desc: "Effective communication on construction sites — toolbox talks, reporting, and team coordination.",
    icon: MessageSquare,
    time: "~15 mins",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Diversity & Inclusion in Construction",
    desc: "Understanding inclusive practices, unconscious bias, and building a welcoming site culture.",
    icon: Users,
    time: "~15 mins",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Digital Construction Tools",
    desc: "Introduction to BIM, project management software, and digital measurement tools.",
    icon: Monitor,
    time: "~15 mins",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Working at Height Awareness",
    desc: "Understanding regulations, equipment, and safety protocols for working at height.",
    icon: ArrowUp,
    time: "~15 mins",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const employers = [
  "Kier Group", "Balfour Beatty", "Willmott Dixon", "Morgan Sindall",
  "Vistry Group", "Laing O'Rourke", "BAM Construction", "Galliford Try",
];

export default function BadgesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-hero">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            Build Ready Programme
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
            Stand out to employers{" "}
            <span className="text-gradient-primary">before you even apply</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete short learning modules to earn Build Ready badges. Show employers you're prepared, motivated, and ready for the site.
          </p>
        </div>
      </section>

      {/* Badge Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.title} className="border-border hover:border-primary/30 transition-all card-glow">
                <CardContent className="p-6">
                  <div className={`h-14 w-14 rounded-xl ${badge.bgColor} flex items-center justify-center mb-4`}>
                    <badge.icon className={`h-7 w-7 ${badge.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {badge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{badge.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {badge.time}
                    </span>
                    <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to="/login">Earn this badge <ArrowRight className="h-3 w-3 ml-1" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Employer strip */}
      <section className="py-12 border-t border-border bg-card/30">
        <div className="container">
          <h3 className="text-center text-sm font-medium text-muted-foreground mb-6">
            Employers who require Build Ready candidates
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {employers.map((name) => (
              <div key={name} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Ready to get Build Ready?
            </h2>
            <p className="text-muted-foreground mb-6">Create your free account and start earning badges today</p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/register">Get Started <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
