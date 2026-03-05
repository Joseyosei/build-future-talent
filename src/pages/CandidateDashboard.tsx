import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, User, FileText, Calendar, MessageSquare, BookOpen, Settings,
  Building2, LogOut, ChevronRight, Bell, CheckCircle, Clock, TrendingUp,
  Award, Compass, Shield, HardHat, Users, Monitor, ArrowUp, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarLinks = [
  { name: "Overview", tab: "overview", icon: LayoutDashboard },
  { name: "Find Jobs", tab: "jobs", icon: FileText },
  { name: "My Applications", tab: "applications", icon: Calendar },
  { name: "Career Path", tab: "career-path", icon: Compass },
  { name: "Build Ready Badges", tab: "badges", icon: Award },
  { name: "Profile", tab: "profile", icon: User },
  { name: "Settings", tab: "settings", icon: Settings },
];

const recommendedRoles = [
  { title: "Apprentice Carpenter", company: "Morrison Construction", location: "Birmingham", match: "95%" },
  { title: "Trainee Site Coordinator", company: "Kier Group", location: "Manchester", match: "88%" },
  { title: "Junior Quantity Surveyor", company: "Willmott Dixon", location: "Leeds", match: "82%" },
];

const applications = [
  { role: "Graduate QS", company: "Balfour Beatty", status: "Under Review", statusColor: "text-accent" },
  { role: "Site Engineer", company: "Laing O'Rourke", status: "Interview Scheduled", statusColor: "text-primary" },
  { role: "Apprentice Electrician", company: "Vistry Group", status: "Application Sent", statusColor: "text-secondary" },
];

const badges = [
  { title: "Health & Safety Awareness", icon: Shield, earned: true, date: "15 Jan 2026" },
  { title: "CSCS Exam Preparation", icon: HardHat, earned: true, date: "22 Jan 2026" },
  { title: "Site Communication Skills", icon: MessageSquare, earned: false, progress: 60 },
  { title: "Diversity & Inclusion", icon: Users, earned: false, progress: 0 },
  { title: "Digital Construction Tools", icon: Monitor, earned: false, progress: 0 },
  { title: "Working at Height", icon: ArrowUp, earned: false, progress: 0 },
];

const careerStages = [
  { role: "Site Supervisor", salary: "£28,000–£35,000", years: "Now – 2 years", tips: "Complete CSCS card, gain site experience, show leadership potential", current: true },
  { role: "Assistant Site Manager", salary: "£35,000–£45,000", years: "2–5 years", tips: "Get SMSTS qualification, manage small projects, build your network" },
  { role: "Site Manager", salary: "£45,000–£65,000", years: "5–10 years", tips: "Lead full projects, develop commercial awareness, mentor juniors" },
  { role: "Senior / Regional Manager", salary: "£65,000–£90,000", years: "10+ years", tips: "Strategic thinking, multi-project oversight, industry leadership" },
];

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm">BuildFuture</span>
              <span className="text-[10px] text-muted-foreground">Candidate Portal</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => setActiveTab(link.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === link.tab ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut className="h-5 w-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>Welcome back, Alex!</h2>
                <p className="text-muted-foreground">Your profile is 75% complete. Update it to improve your matches.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Profile Completion</h3>
                    <span className="text-primary font-semibold">75%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Basic Info</span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Education</span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-accent" /> Work Experience</span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-accent" /> CV Upload</span>
                  </div>
                  <Button variant="cta-secondary" size="sm" className="mt-4">Update Profile</Button>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    {[{ l: "Applications", v: "12" }, { l: "Interviews", v: "3" }, { l: "Profile Views", v: "47" }].map(s => (
                      <div key={s.l} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{s.l}</span>
                        <span className="text-xl font-bold text-foreground">{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recommended Roles</h3>
                  <Link to="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">View All <ChevronRight className="h-4 w-4" /></Link>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {recommendedRoles.map((role) => (
                    <div key={role.title} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">{role.match} Match</span>
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{role.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{role.company}</p>
                      <p className="text-xs text-muted-foreground">{role.location}</p>
                      <Button variant="cta-primary" size="sm" className="w-full mt-4">Apply Now</Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Your Applications</h3>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.role} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{app.role}</p>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                        <span className={`text-sm font-medium ${app.statusColor}`}>{app.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Messages</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground text-sm">Sarah - Your Recruiter</p>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">Great news! Interview scheduled with Balfour Beatty...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BUILD READY BADGES TAB */}
          {activeTab === "badges" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Build Ready Badges</h2>
                <p className="text-sm text-muted-foreground">Complete modules to earn badges and stand out to employers</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <Card key={badge.title} className={`border-border ${badge.earned ? 'bg-primary/5 border-primary/20' : ''}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${badge.earned ? 'bg-primary/10' : 'bg-muted'}`}>
                          <badge.icon className={`h-6 w-6 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        {badge.earned && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{badge.title}</h4>
                      {badge.earned ? (
                        <p className="text-xs text-primary">Earned {badge.date}</p>
                      ) : badge.progress ? (
                        <div className="mt-2">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${badge.progress}%` }} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{badge.progress}% complete</p>
                        </div>
                      ) : (
                        <Button size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">Start Module</Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CAREER PATH TAB */}
          {activeTab === "career-path" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Your Career Path</h2>
                <p className="text-sm text-muted-foreground">Personalised progression based on your onboarding quiz</p>
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {careerStages.map((stage, i) => (
                    <div key={stage.role} className="relative pl-14">
                      <div className={`absolute left-4 top-3 h-4 w-4 rounded-full border-2 ${stage.current ? 'bg-accent border-accent' : 'bg-card border-border'}`} />
                      <div className={`p-5 rounded-xl border ${stage.current ? 'bg-accent/5 border-accent/30' : 'bg-card border-border'}`}>
                        {stage.current && <span className="text-xs font-medium text-accent mb-1 block">← You are here</span>}
                        <h4 className="font-bold text-foreground">{stage.role}</h4>
                        <p className="text-sm text-accent font-medium">{stage.salary}</p>
                        <p className="text-xs text-muted-foreground mb-2">{stage.years}</p>
                        <p className="text-sm text-muted-foreground">{stage.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder tabs */}
          {(activeTab === "jobs" || activeTab === "applications" || activeTab === "profile" || activeTab === "settings") && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground capitalize" style={{ fontFamily: 'Georgia, serif' }}>{activeTab.replace("-", " ")}</h2>
              <p className="text-muted-foreground mt-2">This section is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
