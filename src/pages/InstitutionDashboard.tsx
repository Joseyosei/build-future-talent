import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, MapPin, Building2, FileText, BarChart3,
  Settings, LogOut, Bell, Upload, ChevronRight, TrendingUp, Clock,
  Download, GraduationCap, CheckCircle, AlertCircle, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard/institution", icon: LayoutDashboard },
  { name: "Cohort Management", path: "/dashboard/institution/cohorts", icon: Users },
  { name: "Placement Tracker", path: "/dashboard/institution/placements", icon: MapPin },
  { name: "Employer Partners", path: "/dashboard/institution/partners", icon: Building2 },
  { name: "Government Reporting", path: "/dashboard/institution/reporting", icon: FileText },
  { name: "Analytics", path: "/dashboard/institution/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/institution/settings", icon: Settings },
];

const overviewStats = [
  { label: "Total Students Registered", value: "342", icon: GraduationCap, change: "+18 this month" },
  { label: "Active Placements", value: "87", icon: Users, change: "+12 this month" },
  { label: "Placed This Year", value: "156", icon: CheckCircle, change: "+23 vs last year" },
  { label: "Avg Time to Placement", value: "34", suffix: "days", icon: Clock, change: "-5 days vs avg" },
];

const recentActivity = [
  { student: "Emma Wilson", action: "Placed at Kier Group as Site Engineer", time: "2 hours ago", type: "success" },
  { student: "James Chen", action: "Interview scheduled with Balfour Beatty", time: "4 hours ago", type: "info" },
  { student: "Sophie Taylor", action: "Completed Build Ready - H&S module", time: "1 day ago", type: "badge" },
  { student: "Oliver Brown", action: "Application submitted for QS role", time: "1 day ago", type: "info" },
  { student: "Amira Khan", action: "3-month check-in completed", time: "2 days ago", type: "success" },
];

const cohortData = [
  { name: "Construction Mgmt 2026", total: 45, placed: 28, inProgress: 12, notStarted: 5 },
  { name: "Civil Engineering 2026", total: 38, placed: 22, inProgress: 10, notStarted: 6 },
  { name: "Carpentry Apprentices", total: 30, placed: 18, inProgress: 8, notStarted: 4 },
  { name: "QS & Surveying 2026", total: 25, placed: 15, inProgress: 7, notStarted: 3 },
];

const students = [
  { name: "Emma Wilson", course: "BSc Construction Mgmt", graduation: "Jul 2026", buildReady: 80, appStatus: "Active", placementStatus: "Placed" },
  { name: "James Chen", course: "HNC Civil Engineering", graduation: "Jun 2026", buildReady: 60, appStatus: "Interviewing", placementStatus: "In Progress" },
  { name: "Sophie Taylor", course: "Carpentry L3", graduation: "May 2026", buildReady: 100, appStatus: "Active", placementStatus: "Searching" },
  { name: "Oliver Brown", course: "BSc Quantity Surveying", graduation: "Jul 2026", buildReady: 40, appStatus: "Applied", placementStatus: "Searching" },
  { name: "Amira Khan", course: "BSc Construction Mgmt", graduation: "Jul 2026", buildReady: 90, appStatus: "Offered", placementStatus: "Placed" },
  { name: "Liam Murphy", course: "HNC Civil Engineering", graduation: "Jun 2026", buildReady: 20, appStatus: "Not Started", placementStatus: "Not Started" },
];

const placements = [
  { student: "Emma Wilson", course: "Construction Mgmt", employer: "Kier Group", role: "Site Engineer", startDate: "Sep 2025", threeMonth: "Completed", twelveMonth: "Pending", status: "Active" },
  { student: "Amira Khan", course: "Construction Mgmt", employer: "Balfour Beatty", role: "Graduate QS", startDate: "Aug 2025", threeMonth: "Completed", twelveMonth: "Completed", status: "Active" },
  { student: "Tom Richards", course: "Civil Engineering", employer: "Willmott Dixon", role: "Civil Engineer", startDate: "Jul 2025", threeMonth: "Completed", twelveMonth: "Pending", status: "Active" },
  { student: "Grace Lee", course: "Carpentry L3", employer: "Morgan Sindall", role: "Carpenter", startDate: "Oct 2025", threeMonth: "Scheduled", twelveMonth: "—", status: "Active" },
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

  const maxPlacement = Math.max(...monthlyPlacements.map(m => m.count));

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
              <span className="text-[10px] text-muted-foreground">Institution Portal</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveTab(link.name === "Overview" ? "overview" : link.name === "Cohort Management" ? "cohorts" : link.name === "Placement Tracker" ? "placements" : link.name === "Employer Partners" ? "partners" : link.name === "Government Reporting" ? "reporting" : link.name === "Analytics" ? "analytics" : "settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                (activeTab === "overview" && link.name === "Overview") ||
                (activeTab === "cohorts" && link.name === "Cohort Management") ||
                (activeTab === "placements" && link.name === "Placement Tracker") ||
                (activeTab === "partners" && link.name === "Employer Partners") ||
                (activeTab === "reporting" && link.name === "Government Reporting") ||
                (activeTab === "analytics" && link.name === "Analytics") ||
                (activeTab === "settings" && link.name === "Settings")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Institution Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </button>
            <div className="h-9 w-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}{stat.suffix && <span className="text-lg text-muted-foreground ml-1">{stat.suffix}</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-primary mt-2">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Cohort Health */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>Cohort Health</h3>
                <div className="space-y-4">
                  {cohortData.map((cohort) => (
                    <div key={cohort.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{cohort.name}</span>
                        <span className="text-xs text-muted-foreground">{cohort.total} students</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                        <div className="bg-primary h-full" style={{ width: `${(cohort.placed / cohort.total) * 100}%` }} />
                        <div className="bg-accent h-full" style={{ width: `${(cohort.inProgress / cohort.total) * 100}%` }} />
                        <div className="bg-muted-foreground/30 h-full" style={{ width: `${(cohort.notStarted / cohort.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-6 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Placed</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent" /> In Progress</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground/30" /> Not Started</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Recent Placement Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                          item.type === "success" ? "bg-primary/10" : item.type === "badge" ? "bg-accent/10" : "bg-secondary/10"
                        }`}>
                          {item.type === "success" ? <CheckCircle className="h-4 w-4 text-primary" /> :
                           item.type === "badge" ? <AlertCircle className="h-4 w-4 text-accent" /> :
                           <Calendar className="h-4 w-4 text-secondary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground"><span className="font-medium">{item.student}</span> — {item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>Quick Actions</h3>
                  <div className="grid gap-3">
                    <Button variant="outline" className="h-14 justify-start gap-3 text-left" onClick={() => setActiveTab("cohorts")}>
                      <Upload className="h-5 w-5 text-accent" /> <div><p className="font-medium">Upload Cohort</p><p className="text-xs text-muted-foreground">Import students via CSV</p></div>
                    </Button>
                    <Button variant="outline" className="h-14 justify-start gap-3 text-left" onClick={() => setActiveTab("reporting")}>
                      <FileText className="h-5 w-5 text-secondary" /> <div><p className="font-medium">Generate Report</p><p className="text-xs text-muted-foreground">DfE, Ofsted, CITB reports</p></div>
                    </Button>
                    <Button variant="outline" className="h-14 justify-start gap-3 text-left" onClick={() => setActiveTab("partners")}>
                      <Building2 className="h-5 w-5 text-primary" /> <div><p className="font-medium">View Partners</p><p className="text-xs text-muted-foreground">Manage employer relationships</p></div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COHORT MANAGEMENT TAB */}
          {activeTab === "cohorts" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Cohort Management</h2>
                  <p className="text-sm text-muted-foreground">Manage student cohorts and track progress</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Upload CSV
                  </Button>
                </div>
              </div>

              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Course</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Expected Graduation</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Build Ready</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Application Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Placement Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.name} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 text-sm font-medium text-foreground">{s.name}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{s.course}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{s.graduation}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${s.buildReady}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground">{s.buildReady}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              s.appStatus === "Active" ? "bg-primary/10 text-primary" :
                              s.appStatus === "Interviewing" ? "bg-secondary/10 text-secondary" :
                              s.appStatus === "Offered" ? "bg-accent/10 text-accent" :
                              s.appStatus === "Applied" ? "bg-secondary/10 text-secondary" :
                              "bg-muted text-muted-foreground"
                            }`}>{s.appStatus}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              s.placementStatus === "Placed" ? "bg-primary/10 text-primary" :
                              s.placementStatus === "In Progress" ? "bg-accent/10 text-accent" :
                              s.placementStatus === "Searching" ? "bg-secondary/10 text-secondary" :
                              "bg-muted text-muted-foreground"
                            }`}>{s.placementStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">Send Invites</Button>
                <Button variant="outline" size="sm">Assign to Event</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
              </div>
            </div>
          )}

          {/* PLACEMENT TRACKER TAB */}
          {activeTab === "placements" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Placement Tracker</h2>
                <p className="text-sm text-muted-foreground">Track student placements and check-in progress</p>
              </div>

              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Course</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Employer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Start Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">3-Month</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">12-Month</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placements.map((p) => (
                        <tr key={p.student} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                          <td className="py-4 px-4 text-sm font-medium text-foreground">{p.student}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{p.course}</td>
                          <td className="py-4 px-4 text-sm text-foreground">{p.employer}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{p.role}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{p.startDate}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              p.threeMonth === "Completed" ? "bg-primary/10 text-primary" :
                              p.threeMonth === "Scheduled" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                            }`}>{p.threeMonth}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              p.twelveMonth === "Completed" ? "bg-primary/10 text-primary" :
                              p.twelveMonth === "Pending" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                            }`}>{p.twelveMonth}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary">{p.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* EMPLOYER PARTNERS TAB */}
          {activeTab === "partners" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Employer Partners</h2>
                <p className="text-sm text-muted-foreground">Manage relationships with partner employers</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {["Kier Group", "Balfour Beatty", "Willmott Dixon", "Morgan Sindall", "Vistry Group", "Laing O'Rourke"].map((name) => (
                  <div key={name} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{Math.floor(Math.random() * 20 + 5)} students placed</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">View Partnership</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GOVERNMENT REPORTING TAB */}
          {activeTab === "reporting" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Government Reporting</h2>
                <p className="text-sm text-muted-foreground">Generate compliance reports with one click</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {reportCards.map((report) => (
                  <Card key={report.title} className="border-border hover:border-primary/30 transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`h-12 w-12 rounded-lg bg-card border border-border flex items-center justify-center mb-4`}>
                        <report.icon className={`h-6 w-6 ${report.color}`} />
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{report.desc}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Download className="h-4 w-4 mr-1" /> Generate PDF
                        </Button>
                        <Button variant="outline" size="sm">CSV</Button>
                        <Button variant="outline" size="sm">Excel</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Analytics</h2>
                <p className="text-sm text-muted-foreground">Insights into placement performance and outcomes</p>
              </div>

              {/* Placements over 12 months - bar chart */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Placements Over 12 Months</h3>
                <div className="flex items-end gap-2 h-40">
                  {monthlyPlacements.map((m) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{m.count}</span>
                      <div className="w-full bg-primary/80 rounded-t" style={{ height: `${(m.count / maxPlacement) * 100}%` }} />
                      <span className="text-xs text-muted-foreground">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Sector breakdown */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Industry Sector Breakdown</h3>
                  <div className="space-y-3">
                    {sectorData.map((s) => (
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

                {/* Salary outcomes */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Salary Outcomes by Role</h3>
                  <div className="space-y-3">
                    {salaryData.map((s) => (
                      <div key={s.role} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.role}</p>
                          <p className="text-xs text-muted-foreground">Avg: {s.avg} | National: {s.national}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">{s.delta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* D&I Stats */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Diversity & Inclusion</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Gender of Placed Students</h4>
                    <div className="space-y-2">
                      {[{ label: "Male", pct: 72, avg: 86 }, { label: "Female", pct: 22, avg: 12 }, { label: "Non-binary / Other", pct: 6, avg: 2 }].map((g) => (
                        <div key={g.label} className="flex items-center gap-3">
                          <span className="text-sm text-foreground w-32">{g.label}</span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${g.pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-10">{g.pct}%</span>
                          <span className="text-xs text-muted-foreground/60 w-16">avg {g.avg}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Ethnicity of Placed Students</h4>
                    <div className="space-y-2">
                      {[{ label: "White", pct: 68, avg: 78 }, { label: "Asian", pct: 14, avg: 8 }, { label: "Black", pct: 10, avg: 6 }, { label: "Mixed/Other", pct: 8, avg: 8 }].map((e) => (
                        <div key={e.label} className="flex items-center gap-3">
                          <span className="text-sm text-foreground w-32">{e.label}</span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${e.pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-10">{e.pct}%</span>
                          <span className="text-xs text-muted-foreground/60 w-16">avg {e.avg}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Settings</h2>
              <p className="text-muted-foreground">Institution settings and configuration coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
