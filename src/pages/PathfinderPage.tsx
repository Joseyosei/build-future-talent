import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap, BookOpen, Briefcase, Shield, Users, ArrowRight, ArrowLeft,
  Sun, Building, Shuffle, Hammer, Pencil, Phone, TrendingUp, Sparkles,
  MapPin, Navigation, Globe, ChevronRight
} from "lucide-react";

const backgrounds = [
  { value: "school-leaver", label: "School Leaver", desc: "Just finished GCSEs or A-Levels", icon: BookOpen },
  { value: "college", label: "College Student", desc: "Currently at or just left college", icon: GraduationCap },
  { value: "career-changer", label: "Career Changer", desc: "Moving from another industry", icon: Shuffle },
  { value: "graduate", label: "Graduate", desc: "University degree holder", icon: GraduationCap },
  { value: "ex-military", label: "Ex-Military", desc: "Transitioning from armed forces", icon: Shield },
  { value: "unemployed", label: "Currently Unemployed", desc: "Looking for a fresh start", icon: Users },
];

const questions = [
  {
    id: "workType",
    question: "What kind of work environment do you prefer?",
    options: [
      { value: "outdoors", label: "Outdoors", icon: Sun, desc: "On-site, open air" },
      { value: "indoors", label: "Indoors", icon: Building, desc: "Office or design studio" },
      { value: "mix", label: "A Mix", icon: Shuffle, desc: "Variety of both" },
    ],
  },
  {
    id: "style",
    question: "What type of work excites you most?",
    options: [
      { value: "hands-on", label: "Hands-on", icon: Hammer, desc: "Physical, tools & materials" },
      { value: "technical", label: "Technical", icon: Pencil, desc: "Plans & problem-solving" },
      { value: "managing", label: "Managing People", icon: Users, desc: "Leading teams" },
      { value: "client-facing", label: "Client-Facing", icon: Phone, desc: "Meetings & relationships" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { value: "earnings", label: "High Earnings", icon: TrendingUp, desc: "Maximise income" },
      { value: "progression", label: "Progression", icon: Sparkles, desc: "Clear career path" },
      { value: "security", label: "Job Security", icon: Shield, desc: "Stable employment" },
      { value: "variety", label: "Variety", icon: Shuffle, desc: "New challenges daily" },
    ],
  },
  {
    id: "location",
    question: "How flexible are you with location?",
    options: [
      { value: "local", label: "Local Only", icon: MapPin, desc: "My town or city" },
      { value: "30miles", label: "Within 30 Miles", icon: Navigation, desc: "Happy to commute" },
      { value: "anywhere", label: "Anywhere UK", icon: Globe, desc: "Will relocate" },
    ],
  },
];

const careerPaths = [
  {
    title: "Site Management",
    stages: [
      { role: "Site Supervisor", salary: "£28,000–£35,000", years: "0–2 years" },
      { role: "Assistant Site Manager", salary: "£35,000–£45,000", years: "2–5 years" },
      { role: "Site Manager", salary: "£45,000–£65,000", years: "5–10 years" },
    ],
    match: 94,
  },
  {
    title: "Quantity Surveying",
    stages: [
      { role: "Trainee QS", salary: "£24,000–£30,000", years: "0–2 years" },
      { role: "Quantity Surveyor", salary: "£35,000–£50,000", years: "2–5 years" },
      { role: "Senior QS / Commercial Manager", salary: "£55,000–£80,000", years: "5–10 years" },
    ],
    match: 87,
  },
  {
    title: "Civil Engineering",
    stages: [
      { role: "Graduate Engineer", salary: "£26,000–£32,000", years: "0–2 years" },
      { role: "Civil Engineer", salary: "£35,000–£48,000", years: "2–5 years" },
      { role: "Senior / Principal Engineer", salary: "£50,000–£75,000", years: "5–10 years" },
    ],
    match: 81,
  },
];

export default function PathfinderPage() {
  const [step, setStep] = useState(1);
  const [background, setBackground] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const handleBackgroundSelect = (value: string) => {
    setBackground(value);
    setStep(2);
  };

  const handleAnswer = (qId: string, value: string) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(3);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12 px-4">
        {/* Progress */}
        <div className="flex gap-1 max-w-md mx-auto mb-10">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-muted'}`} />
          ))}
        </div>

        {/* Step 1: Background */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                Discover Your Construction Career
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Answer a few quick questions to find your ideal path into construction
              </p>
            </div>
            <div className="text-center mb-2">
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                What's your background?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {backgrounds.map((bg) => (
                <Card
                  key={bg.value}
                  className="cursor-pointer border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
                  onClick={() => handleBackgroundSelect(bg.value)}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <bg.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{bg.label}</p>
                      <p className="text-sm text-muted-foreground">{bg.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Quiz */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => currentQ === 0 ? setStep(1) : setCurrentQ(currentQ - 1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  What matters most to you?
                </h2>
                <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">{questions[currentQ].question}</h3>
            <div className="grid gap-3">
              {questions[currentQ].options.map((opt) => (
                <Card
                  key={opt.value}
                  className="cursor-pointer border-border hover:border-accent/50 transition-all"
                  onClick={() => handleAnswer(questions[currentQ].id, opt.value)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <opt.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{opt.label}</p>
                      <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                Your Top Career Paths 🏗️
              </h1>
              <p className="mt-2 text-muted-foreground">Based on your answers, here are your best matches</p>
            </div>

            <div className="space-y-6">
              {careerPaths.map((path, idx) => (
                <div key={path.title} className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>{path.title}</h3>
                    <span className="px-3 py-1 text-sm font-bold bg-primary/10 text-primary rounded-full">{path.match}% match</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {path.stages.map((stage, i) => (
                      <div key={stage.role} className="flex items-center gap-2">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border min-w-[180px]">
                          <p className="font-semibold text-foreground text-sm">{stage.role}</p>
                          <p className="text-xs text-accent font-medium mt-1">{stage.salary}</p>
                          <p className="text-xs text-muted-foreground">{stage.years}</p>
                        </div>
                        {i < path.stages.length - 1 && <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                      <Link to="/jobs">Apply for {path.stages[0].role} jobs <ArrowRight className="h-4 w-4 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild size="lg" variant="outline">
                <Link to="/register">Create your profile to get matched <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
