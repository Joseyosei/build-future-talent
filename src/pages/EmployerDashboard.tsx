import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Plus, 
  Users, 
  Star,
  Calendar,
  MessageSquare,
  GitBranch,
  CreditCard,
  Settings,
  Building2,
  LogOut,
  ChevronRight,
  Bell,
  TrendingUp,
  Briefcase,
  Eye,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Overview", path: "/employer-dashboard", icon: LayoutDashboard },
  { name: "Post a Job", path: "/employer-dashboard/post", icon: Plus },
  { name: "Applicants", path: "/employer-dashboard/applicants", icon: Users },
  { name: "Shortlists", path: "/employer-dashboard/shortlists", icon: Star },
  { name: "Interviews", path: "/employer-dashboard/interviews", icon: Calendar },
  { name: "Messages", path: "/employer-dashboard/messages", icon: MessageSquare },
  { name: "Pipeline", path: "/employer-dashboard/pipeline", icon: GitBranch },
  { name: "Billing", path: "/employer-dashboard/billing", icon: CreditCard },
  { name: "Settings", path: "/employer-dashboard/settings", icon: Settings },
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

export default function EmployerDashboard() {
  const location = useLocation();

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
              <span className="text-[10px] text-muted-foreground">Employer Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-foreground">Employer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="cta-primary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Post a Job
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

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Metrics */}
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

          {/* Active Jobs & Shortlisted */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Active Job Posts */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Active Job Posts</h3>
                <Link to="/employer-dashboard/post" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Manage <ChevronRight className="h-4 w-4" />
                </Link>
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
                            job.status === "Active" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-accent/10 text-accent"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shortlisted Candidates */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Shortlisted Candidates</h3>
                <Link to="/employer-dashboard/shortlists" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {shortlistedCandidates.map((candidate) => (
                  <div key={candidate.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.role}</p>
                        <p className="text-xs text-muted-foreground">{candidate.experience}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                        {candidate.match} Match
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="cta-secondary" size="sm" className="w-full mt-4">
                View Shortlist
              </Button>
            </div>
          </div>

          {/* Pipeline Health */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Pipeline Health</h3>
                <p className="text-sm text-muted-foreground">Schools & colleges engagement</p>
              </div>
              <Button variant="outline" size="sm">View Report</Button>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold text-foreground mb-1">24</p>
                <p className="text-sm text-muted-foreground">Partner Schools</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold text-foreground mb-1">8</p>
                <p className="text-sm text-muted-foreground">Events Scheduled</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold text-foreground mb-1">156</p>
                <p className="text-sm text-muted-foreground">Students Engaged</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold text-foreground mb-1">42</p>
                <p className="text-sm text-muted-foreground">Work Experience</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
