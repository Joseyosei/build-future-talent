import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, User, FileText, Calendar, MessageSquare, BookOpen, Settings,
  Building2, LogOut, ChevronRight, Bell, CheckCircle, Clock, TrendingUp,
  Award, Compass, Shield, HardHat, Users, Monitor, ArrowUp, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useCandidateProfile, useCandidateApplications, useActiveJobs, useCandidateBadges, useBadges } from "@/hooks/useSupabaseQuery";

const sidebarLinks = [
  { name: "Overview", tab: "overview", icon: LayoutDashboard },
  { name: "Find Jobs", tab: "jobs", icon: FileText },
  { name: "My Applications", tab: "applications", icon: Calendar },
  { name: "Career Path", tab: "career-path", icon: Compass },
  { name: "Build Ready Badges", tab: "badges", icon: Award },
  { name: "Profile", tab: "profile", icon: User },
  { name: "Settings", tab: "settings", icon: Settings },
];

const careerStages = [
  { role: "Site Supervisor", salary: "£28,000–£35,000", years: "Now – 2 years", tips: "Complete CSCS card, gain site experience, show leadership potential", current: true },
  { role: "Assistant Site Manager", salary: "£35,000–£45,000", years: "2–5 years", tips: "Get SMSTS qualification, manage small projects, build your network" },
  { role: "Site Manager", salary: "£45,000–£65,000", years: "5–10 years", tips: "Lead full projects, develop commercial awareness, mentor juniors" },
  { role: "Senior / Regional Manager", salary: "£65,000–£90,000", years: "10+ years", tips: "Strategic thinking, multi-project oversight, industry leadership" },
];

const badgeIcons: Record<string, any> = {
  'safety': Shield,
  'certification': HardHat,
  'communication': MessageSquare,
  'culture': Users,
  'technology': Monitor,
};

function calcProfileCompletion(profile: any): number {
  if (!profile) return 0;
  const fields = ['first_name', 'last_name', 'location', 'phone', 'background_text', 'quiz_answers', 'availability', 'right_to_work', 'bio'];
  const filled = fields.filter(f => profile[f] && (typeof profile[f] === 'string' ? profile[f].trim() : true)).length;
  return Math.round((filled / fields.length) * 100);
}

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { signOut, user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useCandidateProfile();
  const { data: applications, isLoading: appsLoading } = useCandidateApplications();
  const { data: allBadges } = useBadges();
  const { data: earnedBadges } = useCandidateBadges();

  const completion = calcProfileCompletion(profile);
  const appCount = applications?.length || 0;
  const interviewCount = (applications || []).filter((a: any) => a.status === 'interview_scheduled').length;
  const earnedBadgeIds = new Set((earnedBadges || []).map((b: any) => b.badge_id));

  const statusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-accent';
      case 'shortlisted': return 'text-secondary';
      case 'interview_scheduled': return 'text-primary';
      case 'offer_made': return 'text-primary';
      case 'hired': return 'text-primary';
      case 'rejected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
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
          <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}!
                </h2>
                <p className="text-muted-foreground">Your profile is {completion}% complete. Update it to improve your matches.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Profile Completion</h3>
                    <span className="text-primary font-semibold">{completion}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all" style={{ width: `${completion}%` }} />
                  </div>
                  <Button variant="cta-secondary" size="sm" className="mt-4" onClick={() => setActiveTab('profile')}>Update Profile</Button>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    {[
                      { l: "Applications", v: appCount.toString() },
                      { l: "Interviews", v: interviewCount.toString() },
                      { l: "Badges Earned", v: (earnedBadges?.length || 0).toString() },
                    ].map(s => (
                      <div key={s.l} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{s.l}</span>
                        <span className="text-xl font-bold text-foreground">{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Your Applications</h3>
                {appsLoading ? (
                  <div className="space-y-3">{[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
                ) : (applications?.length || 0) === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No applications yet</p>
                    <Button asChild size="sm" className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(applications || []).slice(0, 5).map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{app.jobs?.title || 'Role'}</p>
                          <p className="text-sm text-muted-foreground">{app.jobs?.employer_profiles?.company_name || 'Company'}</p>
                        </div>
                        <span className={`text-sm font-medium capitalize ${statusColor(app.status)}`}>{app.status?.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Build Ready Badges</h2>
                <p className="text-sm text-muted-foreground">Complete modules to earn badges and stand out to employers</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(allBadges || []).map((badge: any) => {
                  const earned = earnedBadgeIds.has(badge.id);
                  const Icon = badgeIcons[badge.category] || Shield;
                  return (
                    <Card key={badge.id} className={`border-border ${earned ? 'bg-primary/5 border-primary/20' : ''}`}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${earned ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Icon className={`h-6 w-6 ${earned ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          {earned && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                        {earned ? (
                          <p className="text-xs text-primary">Earned ✓</p>
                        ) : (
                          <Button size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">Start Module</Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "career-path" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Your Career Path</h2>
                <p className="text-sm text-muted-foreground">Personalised progression based on your onboarding quiz</p>
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {careerStages.map((stage) => (
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

          {activeTab === "applications" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>My Applications</h2>
              {appsLoading ? (
                <div className="space-y-3">{[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}</div>
              ) : (applications?.length || 0) === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">No applications yet</p>
                  <p className="text-muted-foreground mb-4">Start applying to construction roles</p>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {(applications || []).map((app: any) => (
                    <div key={app.id} className="p-5 rounded-xl bg-card border border-border flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{app.jobs?.title}</p>
                        <p className="text-sm text-muted-foreground">{app.jobs?.employer_profiles?.company_name} • {app.jobs?.location}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${statusColor(app.status)} bg-current/10`}>
                        {app.status?.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(activeTab === "jobs" || activeTab === "profile" || activeTab === "settings") && (
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
