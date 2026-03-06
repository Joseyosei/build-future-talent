import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, MapPin, Building2, FileText, BarChart3,
  Settings, LogOut, Bell, Upload, ChevronRight, TrendingUp, Clock,
  Download, GraduationCap, CheckCircle, AlertCircle, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useInstitutionProfile } from "@/hooks/useSupabaseQuery";

const sidebarLinks = [
  { name: "Overview", tab: "overview", icon: LayoutDashboard },
  { name: "Cohort Management", tab: "cohorts", icon: Users },
  { name: "Placement Tracker", tab: "placements", icon: MapPin },
  { name: "Employer Partners", tab: "partners", icon: Building2 },
  { name: "Government Reporting", tab: "reporting", icon: FileText },
  { name: "Analytics", tab: "analytics", icon: BarChart3 },
  { name: "Settings", tab: "settings", icon: Settings },
];

const reportCards = [
  { title: "DfE Skills Boot Camp Outcomes", desc: "Completion rates, progression data, and learner destinations for DfE reporting.", icon: FileText, color: "text-secondary" },
  { title: "Apprenticeship Completion Data", desc: "End-point assessment results, retention rates, and employer feedback.", icon: GraduationCap, color: "text-primary" },
  { title: "CITB Levy Spend Summary", desc: "Training investment, grant claims, and levy spend breakdown by category.", icon: Building2, color: "text-accent" },
  { title: "Ofsted Evidence Pack", desc: "Student outcomes, employer satisfaction, and destination data for inspections.", icon: CheckCircle, color: "text-primary" },
];

const sectorData = [
  { sector: "Residential", pct: 35 },
  { sector: "Commercial", pct: 25 },
  { sector: "Infrastructure", pct: 20 },
  { sector: "Industrial", pct: 12 },
  { sector: "Other", pct: 8 },
];

const salaryData = [
  { role: "Site Manager", avg: "£38,000", national: "£36,500", delta: "+4.1%" },
  { role: "Quantity Surveyor", avg: "£34,000", national: "£33,000", delta: "+3.0%" },
  { role: "Civil Engineer", avg: "£32,000", national: "£31,500", delta: "+1.6%" },
  { role: "Carpenter", avg: "£28,000", national: "£27,000", delta: "+3.7%" },
];

const monthlyPlacements = [
  { month: "Jan", count: 8 }, { month: "Feb", count: 12 }, { month: "Mar", count: 15 },
  { month: "Apr", count: 10 }, { month: "May", count: 18 }, { month: "Jun", count: 22 },
  { month: "Jul", count: 25 }, { month: "Aug", count: 20 }, { month: "Sep", count: 28 },
  { month: "Oct", count: 16 }, { month: "Nov", count: 14 }, { month: "Dec", count: 10 },
];

export default function InstitutionDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes("/cohorts")) return "cohorts";
    if (path.includes("/placements")) return "placements";
    if (path.includes("/partners")) return "partners";
    if (path.includes("/reporting")) return "reporting";
    if (path.includes("/analytics")) return "analytics";
    if (path.includes("/settings")) return "settings";
    return "overview";
  });

  const { signOut } = useAuth();
  const { data: profile } = useInstitutionProfile();
  const maxPlacement = Math.max(...monthlyPlacements.map(m => m.count));

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
              <span className="text-[10px] text-muted-foreground">Institution Portal</span>
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
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Institution Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Students", value: "0", icon: GraduationCap },
                  { label: "Active Placements", value: "0", icon: Users },
                  { label: "Placed This Year", value: "0", icon: CheckCircle },
                  { label: "Avg Time to Placement", value: "—", icon: Clock },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Recent Activity</h3>
                  <div className="text-center py-8">
                    <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Quick Actions</h3>
                  <div className="grid gap-3">
                    <Button variant="outline" className="h-14 justify-start gap-3 text-left" onClick={() => setActiveTab("cohorts")}>
                      <Upload className="h-5 w-5 text-accent" /> <div><p className="font-medium">Upload Cohort</p><p className="text-xs text-muted-foreground">Import students via CSV</p></div>
                    </Button>
                    <Button variant="outline" className="h-14 justify-start gap-3 text-left" onClick={() => setActiveTab("reporting")}>
                      <FileText className="h-5 w-5 text-secondary" /> <div><p className="font-medium">Generate Report</p><p className="text-xs text-muted-foreground">DfE, Ofsted, CITB reports</p></div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COHORTS */}
          {activeTab === "cohorts" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Cohort Management</h2>
                  <p className="text-sm text-muted-foreground">Upload and manage student cohorts</p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                  <Upload className="h-4 w-4 mr-2" /> Upload CSV
                </Button>
              </div>
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No cohorts uploaded yet</p>
                <p className="text-muted-foreground">Upload a CSV file with your student data to get started.</p>
              </div>
            </div>
          )}

          {/* GOVERNMENT REPORTING */}
          {activeTab === "reporting" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Government Reporting</h2>
                <p className="text-sm text-muted-foreground">Generate compliance reports with one click</p>
              </div>
              <div className="flex gap-3 items-center mb-6">
                <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
                <span className="text-muted-foreground">to</span>
                <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {reportCards.map((card) => (
                  <div key={card.title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> PDF</Button>
                      <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> CSV</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Analytics</h2>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Placements Over 12 Months</h3>
                <div className="flex items-end gap-2 h-40">
                  {monthlyPlacements.map(m => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary rounded-t" style={{ height: `${(m.count / maxPlacement) * 100}%` }} />
                      <span className="text-[10px] text-muted-foreground">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Sector Breakdown</h3>
                  <div className="space-y-3">
                    {sectorData.map(s => (
                      <div key={s.sector}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{s.sector}</span>
                          <span className="text-muted-foreground">{s.pct}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: `${s.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Salary Outcomes</h3>
                  <div className="space-y-3">
                    {salaryData.map(s => (
                      <div key={s.role} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.role}</p>
                          <p className="text-xs text-muted-foreground">National: {s.national}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">{s.avg}</p>
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">{s.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "placements" || activeTab === "partners" || activeTab === "settings") && (
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
