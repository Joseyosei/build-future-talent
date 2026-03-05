import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Plus, Users, Star, Calendar, MessageSquare,
  GitBranch, CreditCard, Settings, Building2, LogOut, ChevronRight,
  Bell, TrendingUp, Briefcase, Eye, UserCheck, PieChart, FileText, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Overview", tab: "overview", icon: LayoutDashboard },
  { name: "Post a Job", tab: "post", icon: Plus },
  { name: "Applicants", tab: "applicants", icon: Users },
  { name: "Pipeline", tab: "pipeline", icon: GitBranch },
  { name: "Diversity & Inclusion", tab: "dei", icon: PieChart },
  { name: "CITB Reporting", tab: "citb", icon: FileText },
  { name: "Billing", tab: "billing", icon: CreditCard },
  { name: "Settings", tab: "settings", icon: Settings },
];

const metrics = [
  { label: "Open Roles", value: "8", icon: Briefcase, change: "+2 this week" },
  { label: "Total Applicants", value: "156", icon: Users, change: "+23 this week" },
  { label: "Shortlisted", value: "34", icon: Star, change: "+8 this week" },
  { label: "Interviews", value: "12", icon: Calendar, change: "5 scheduled" },
];

const activeJobs = [
  { role: "Graduate Quantity Surveyor", location: "London", applicants: 42, status: "Active" },
  { role: "Apprentice Carpenter", location: "Birmingham", applicants: 28, status: "Active" },
  { role: "Site Engineer", location: "Manchester", applicants: 35, status: "Active" },
  { role: "Trainee Project Manager", location: "Leeds", applicants: 51, status: "Paused" },
];

const shortlistedCandidates = [
  { name: "James Wilson", role: "Graduate QS", experience: "BSc Quantity Surveying", match: "96%" },
  { name: "Emma Thompson", role: "Site Engineer", experience: "HNC Civil Engineering", match: "92%" },
  { name: "Michael Chen", role: "Apprentice Carpenter", experience: "Level 2 Carpentry", match: "89%" },
];

const genderData = [
  { label: "Male", applicants: 68, hires: 72 },
  { label: "Female", applicants: 24, hires: 22 },
  { label: "Non-binary", applicants: 8, hires: 6 },
];

const ethnicityData = [
  { label: "White", pct: 62 },
  { label: "Asian", pct: 16 },
  { label: "Black", pct: 12 },
  { label: "Mixed", pct: 7 },
  { label: "Other", pct: 3 },
];

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
              <span className="text-[10px] text-muted-foreground">Employer Portal</span>
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

      <main className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Employer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Post a Job
            </Button>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </button>
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric) => (
                  <div key={metric.label} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <metric.icon className="h-6 w-6 text-primary" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xs text-primary mt-2">{metric.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground">Active Job Posts</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Role</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Location</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Applicants</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeJobs.map((job) => (
                          <tr key={job.role} className="border-b border-border last:border-0">
                            <td className="py-4 text-sm font-medium text-foreground">{job.role}</td>
                            <td className="py-4 text-sm text-muted-foreground">{job.location}</td>
                            <td className="py-4 text-sm text-foreground">{job.applicants}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                job.status === "Active" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                              }`}>{job.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-6">Shortlisted Candidates</h3>
                  <div className="space-y-4">
                    {shortlistedCandidates.map((candidate) => (
                      <div key={candidate.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.role}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">{candidate.match}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-6">Pipeline Health</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[{ l: "Partner Schools", v: "24" }, { l: "Events Scheduled", v: "8" }, { l: "Students Engaged", v: "156" }, { l: "Work Experience", v: "42" }].map(s => (
                    <div key={s.l} className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold text-foreground mb-1">{s.v}</p>
                      <p className="text-sm text-muted-foreground">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DIVERSITY & INCLUSION TAB */}
          {activeTab === "dei" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Diversity & Inclusion</h2>
                  <p className="text-sm text-muted-foreground">Understand the diversity of your applicant pool and hires</p>
                </div>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download ESG Report</Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Gender Breakdown</h3>
                  <p className="text-xs text-muted-foreground mb-4">Applicants vs Hires</p>
                  <div className="space-y-4">
                    {genderData.map((g) => (
                      <div key={g.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{g.label}</span>
                          <span className="text-muted-foreground">Apps {g.applicants}% | Hires {g.hires}%</span>
                        </div>
                        <div className="flex gap-1 h-4">
                          <div className="bg-secondary/60 rounded-l" style={{ width: `${g.applicants}%` }} />
                          <div className="bg-primary/60 rounded-r" style={{ width: `${g.hires}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-secondary/60" /> Applicants</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-primary/60" /> Hires</span>
                    </div>
                  </div>
                </div>

                {/* Ethnicity */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Ethnicity Distribution</h3>
                  <div className="space-y-3">
                    {ethnicityData.map((e) => (
                      <div key={e.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{e.label}</span>
                          <span className="text-muted-foreground">{e.pct}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${e.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regional Reach placeholder */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Regional Reach</h3>
                <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Regional map visualisation coming soon</p>
                </div>
              </div>

              {/* Comparison row */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Your Score vs UK Construction Average</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Female representation", yours: "24%", avg: "14%", delta: "+10%" },
                    { label: "Ethnic minority representation", yours: "38%", avg: "22%", delta: "+16%" },
                    { label: "Disability disclosure", yours: "8%", avg: "5%", delta: "+3%" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-foreground">{item.yours}</p>
                      <p className="text-xs text-muted-foreground">Avg: {item.avg}</p>
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded mt-1 inline-block">{item.delta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CITB REPORTING TAB */}
          {activeTab === "citb" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>CITB Reporting</h2>
                <p className="text-sm text-muted-foreground">Levy-compliant reporting and training investment tracking</p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="flex gap-2">
                  <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
                  <span className="text-muted-foreground self-center">to</span>
                  <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
                </div>
                <Button variant="outline" size="sm">Apply</Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Apprenticeship Placements", value: "24", sub: "This period" },
                  { label: "Training Investment", value: "£48,500", sub: "Total spend" },
                  { label: "Completion Rate", value: "87%", sub: "vs 78% national avg" },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-xl bg-card border border-border text-center">
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-primary mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Outcome Tracking</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Apprentice</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Programme</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Start</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Tom Richards", prog: "L3 Carpentry", start: "Sep 2025", status: "On Track" },
                      { name: "Aisha Patel", prog: "L4 Civil Engineering", start: "Aug 2025", status: "On Track" },
                      { name: "Kyle O'Brien", prog: "L2 Bricklaying", start: "Jul 2025", status: "Completed" },
                    ].map((a) => (
                      <tr key={a.name} className="border-b border-border last:border-0">
                        <td className="py-3 text-sm font-medium text-foreground">{a.name}</td>
                        <td className="py-3 text-sm text-muted-foreground">{a.prog}</td>
                        <td className="py-3 text-sm text-muted-foreground">{a.start}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${a.status === "Completed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download CSV</Button>
              </div>
            </div>
          )}

          {/* Placeholder tabs */}
          {!["overview", "dei", "citb"].includes(activeTab) && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground capitalize" style={{ fontFamily: 'Georgia, serif' }}>{activeTab}</h2>
              <p className="text-muted-foreground mt-2">This section is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
