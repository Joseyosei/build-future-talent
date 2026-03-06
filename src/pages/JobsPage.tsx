import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActiveJobs, useApplyForJob, useCandidateApplications } from "@/hooks/useSupabaseQuery";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Search, MapPin, Building2, Clock, Briefcase, ArrowRight, Filter, Check
} from "lucide-react";

const categories = [
  "All", "Site Engineer", "Quantity Surveyor", "Project Manager",
  "Apprentice Carpenter", "Apprentice Electrician", "Apprentice Plumber",
  "Trainee Site Coordinator", "Graduate Civil Engineer", "BIM Technician",
  "Health & Safety Officer", "Site Manager", "Estimator", "CAD Technician",
];

const contractTypes = ["All", "Full-time", "Part-time", "Apprenticeship", "Contract"];

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All");
  const [selectedContract, setSelectedContract] = useState("All");
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  const { data: jobs, isLoading } = useActiveJobs({
    category: selectedCategory,
    location: locationFilter,
    search: searchTerm,
  });

  const { data: myApplications } = useCandidateApplications();
  const applyMutation = useApplyForJob();

  const appliedJobIds = new Set((myApplications || []).map((a: any) => a.job_id));

  const handleApply = async (jobId: string) => {
    if (!user) {
      window.location.href = '/register';
      return;
    }
    try {
      await applyMutation.mutateAsync(jobId);
      toast({ title: 'Application submitted!' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const filteredJobs = (jobs || []).filter((job: any) => {
    if (selectedContract !== "All" && job.contract_type !== selectedContract) return false;
    return true;
  });

  return (
    <Layout>
      <section className="py-12 md:py-16 gradient-hero border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your <span className="text-gradient-primary">Construction Role</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse apprenticeships, entry-level positions, and graduate roles across the UK construction industry.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="relative md:w-48">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <div className="p-6 rounded-xl bg-card border border-border sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                            selectedCategory === cat
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "text-muted-foreground hover:bg-card-alt hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Contract Type</label>
                    <div className="space-y-2">
                      {contractTypes.map((ct) => (
                        <button
                          key={ct}
                          onClick={() => setSelectedContract(ct)}
                          className={`w-full px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                            selectedContract === ct
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "text-muted-foreground hover:bg-card-alt hover:text-foreground"
                          }`}
                        >
                          {ct}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{filteredJobs.length}</span> jobs found
                </p>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-6 rounded-xl bg-card border border-border">
                      <Skeleton className="h-6 w-1/3 mb-3" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">No jobs found</p>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job: any) => (
                    <div key={job.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group card-glow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                              {job.category}
                            </span>
                            {job.contract_type && (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
                                {job.contract_type}
                              </span>
                            )}
                            {job.build_ready_required && (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                                Build Ready Required
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {(job as any).employer_profiles?.company_name || 'Company'}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {job.location}
                            </span>
                            {job.salary_min && job.salary_max && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                £{job.salary_min.toLocaleString()} - £{job.salary_max.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {appliedJobIds.has(job.id) ? (
                          <Button variant="outline" disabled className="shrink-0 text-primary border-primary/30">
                            <Check className="h-4 w-4 mr-2" /> Applied
                          </Button>
                        ) : (
                          <Button
                            className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={() => handleApply(job.id)}
                            disabled={applyMutation.isPending}
                          >
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
