import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Plus, Users, Star, Calendar, MessageSquare,
  GitBranch, CreditCard, Settings, Building2, LogOut, ChevronRight,
  Bell, TrendingUp, Briefcase, Eye, UserCheck, PieChart, FileText, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useEmployerProfile, useEmployerJobs, usePostJob, useUpdateJobStatus } from "@/hooks/useSupabaseQuery";
import { useToast } from "@/hooks/use-toast";

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

const jobCategories = [
  "Site Engineer", "Quantity Surveyor", "Project Manager",
  "Apprentice Carpenter", "Apprentice Electrician", "Apprentice Plumber",
  "Trainee Site Coordinator", "Graduate Civil Engineer", "BIM Technician",
  "Health & Safety Officer", "Site Manager", "Estimator", "CAD Technician", "Other",
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
  const { signOut } = useAuth();
  const { toast } = useToast();
  const { data: profile } = useEmployerProfile();
  const { data: jobs, isLoading: jobsLoading } = useEmployerJobs();
  const postJobMutation = usePostJob();
  const updateJobStatusMutation = useUpdateJobStatus();

  // Post job form state
  const [jobForm, setJobForm] = useState({
    title: '', category: '', location: '', salary_min: '', salary_max: '',
    contract_type: '', description: '', requirements: '',
    build_ready_required: false, open_to_career_changers: true,
  });

  const handlePostJob = async () => {
    try {
      await postJobMutation.mutateAsync({
        ...jobForm,
        salary_min: parseInt(jobForm.salary_min) || 0,
        salary_max: parseInt(jobForm.salary_max) || 0,
      });
      toast({ title: 'Job posted successfully!' });
      setActiveTab('overview');
      setJobForm({ title: '', category: '', location: '', salary_min: '', salary_max: '', contract_type: '', description: '', requirements: '', build_ready_required: false, open_to_career_changers: true });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const activeJobs = (jobs || []).filter((j: any) => j.status === 'active');
  const totalApplicants = (jobs || []).reduce((sum: number, j: any) => sum + (j.applications?.[0]?.count || 0), 0);

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
          <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Employer Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm" onClick={() => setActiveTab('post')}>
              <Plus className="h-4 w-4 mr-2" /> Post a Job
            </Button>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Open Roles", value: activeJobs.length.toString(), icon: Briefcase },
                  { label: "Total Applicants", value: totalApplicants.toString(), icon: Users },
                  { label: "Active Jobs", value: (jobs?.length || 0).toString(), icon: Star },
                ].map((metric) => (
                  <div key={metric.label} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <metric.icon className="h-6 w-6 text-primary" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-card border border-border mb-8">
                <h3 className="font-semibold text-foreground mb-6">Active Job Posts</h3>
                {jobsLoading ? (
                  <div className="space-y-3">{[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
                ) : (jobs?.length || 0) === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No jobs posted yet</p>
                    <Button className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setActiveTab('post')}>Post your first job</Button>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Role</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Location</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Applicants</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(jobs || []).map((job: any) => (
                        <tr key={job.id} className="border-b border-border last:border-0">
                          <td className="py-4 text-sm font-medium text-foreground">{job.title}</td>
                          <td className="py-4 text-sm text-muted-foreground">{job.location}</td>
                          <td className="py-4 text-sm text-foreground">{job.applications?.[0]?.count || 0}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              job.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                            }`}>{job.status}</span>
                          </td>
                          <td className="py-4">
                            {job.status === 'active' ? (
                              <Button size="sm" variant="ghost" onClick={() => updateJobStatusMutation.mutate({ id: job.id, status: 'paused' })}>Pause</Button>
                            ) : (
                              <Button size="sm" variant="ghost" onClick={() => updateJobStatusMutation.mutate({ id: job.id, status: 'active' })}>Activate</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* POST A JOB */}
          {activeTab === "post" && (
            <div className="max-w-2xl space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Post a New Job</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input value={jobForm.title} onChange={e => setJobForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Graduate Quantity Surveyor" className="h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select onValueChange={v => setJobForm(f => ({ ...f, category: v }))}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>{jobCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={jobForm.location} onChange={e => setJobForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. London" className="h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Salary Min (£)</Label>
                    <Input type="number" value={jobForm.salary_min} onChange={e => setJobForm(f => ({ ...f, salary_min: e.target.value }))} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Max (£)</Label>
                    <Input type="number" value={jobForm.salary_max} onChange={e => setJobForm(f => ({ ...f, salary_max: e.target.value }))} className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contract Type</Label>
                  <Select onValueChange={v => setJobForm(f => ({ ...f, contract_type: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {['Full-time', 'Part-time', 'Apprenticeship', 'Contract'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={jobForm.description} onChange={e => setJobForm(f => ({ ...f, description: e.target.value }))} rows={5} />
                </div>
                <div className="space-y-2">
                  <Label>Requirements</Label>
                  <Textarea value={jobForm.requirements} onChange={e => setJobForm(f => ({ ...f, requirements: e.target.value }))} rows={3} />
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Switch checked={jobForm.build_ready_required} onCheckedChange={v => setJobForm(f => ({ ...f, build_ready_required: v }))} />
                    <Label>Build Ready Required</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={jobForm.open_to_career_changers} onCheckedChange={v => setJobForm(f => ({ ...f, open_to_career_changers: v }))} />
                    <Label>Open to Career Changers</Label>
                  </div>
                </div>
                <Button onClick={handlePostJob} disabled={!jobForm.title || !jobForm.category || postJobMutation.isPending} className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90">
                  {postJobMutation.isPending ? 'Posting...' : 'Post Job'}
                </Button>
              </div>
            </div>
          )}

          {/* D&I TAB */}
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
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Gender Breakdown</h3>
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
                  </div>
                </div>
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

          {/* CITB TAB */}
          {activeTab === "citb" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>CITB Reporting</h2>
                <p className="text-sm text-muted-foreground">Levy-compliant reporting and training investment tracking</p>
              </div>
              <div className="flex gap-3 items-center">
                <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
                <span className="text-muted-foreground">to</span>
                <input type="date" className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground" />
                <Button variant="outline" size="sm">Apply</Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Apprenticeship Placements", value: "0", sub: "This period" },
                  { label: "Training Investment", value: "£0", sub: "Total spend" },
                  { label: "Completion Rate", value: "—", sub: "No data yet" },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-xl bg-card border border-border text-center">
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-primary mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download CSV</Button>
              </div>
            </div>
          )}

          {(activeTab === "applicants" || activeTab === "pipeline" || activeTab === "billing" || activeTab === "settings") && (
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
