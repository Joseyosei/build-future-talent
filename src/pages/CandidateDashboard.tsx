import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Calendar,
  MessageSquare,
  BookOpen,
  Settings,
  Building2,
  LogOut,
  ChevronRight,
  Bell,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Overview", path: "/candidate-dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/candidate-dashboard/profile", icon: User },
  { name: "Applications", path: "/candidate-dashboard/applications", icon: FileText },
  { name: "Interviews", path: "/candidate-dashboard/interviews", icon: Calendar },
  { name: "Messages", path: "/candidate-dashboard/messages", icon: MessageSquare },
  { name: "Resources", path: "/candidate-dashboard/resources", icon: BookOpen },
  { name: "Settings", path: "/candidate-dashboard/settings", icon: Settings },
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

export default function CandidateDashboard() {
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
              <span className="text-[10px] text-muted-foreground">Candidate Portal</span>
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
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
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

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Banner */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Alex!</h2>
            <p className="text-muted-foreground">Your profile is 75% complete. Update it to improve your matches.</p>
          </div>

          {/* Profile Completion */}
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
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" /> Basic Info
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" /> Education
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-accent" /> Work Experience
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-accent" /> CV Upload
                </span>
              </div>
              <Button variant="cta-secondary" size="sm" className="mt-4">
                Update Profile
              </Button>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="text-xl font-bold text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interviews</span>
                  <span className="text-xl font-bold text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="text-xl font-bold text-foreground">47</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Roles */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recommended Roles</h3>
              <Link to="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedRoles.map((role) => (
                <div key={role.title} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                      {role.match} Match
                    </span>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{role.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{role.company}</p>
                  <p className="text-xs text-muted-foreground">{role.location}</p>
                  <Button variant="cta-primary" size="sm" className="w-full mt-4">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Messages */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Applications Table */}
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
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Applications
              </Button>
            </div>

            {/* Messages Preview */}
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
                    <p className="text-sm text-muted-foreground truncate">
                      Great news! I've scheduled your interview with Balfour Beatty for next Tuesday...
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground text-sm">Kier Group</p>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Thank you for your application. We would like to invite you to...
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Messages
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
