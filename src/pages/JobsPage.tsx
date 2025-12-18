import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Building2, 
  Clock,
  Briefcase,
  ArrowRight,
  Filter
} from "lucide-react";

const jobListings = [
  {
    id: 1,
    title: "Apprentice Carpenter",
    company: "Morrison Construction",
    location: "Birmingham",
    type: "Apprenticeship",
    sector: "Residential",
    salary: "£15,000 - £18,000",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Graduate Quantity Surveyor",
    company: "Balfour Beatty",
    location: "London",
    type: "Graduate",
    sector: "Commercial",
    salary: "£28,000 - £32,000",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "Trainee Site Manager",
    company: "Kier Group",
    location: "Manchester",
    type: "Entry Level",
    sector: "Infrastructure",
    salary: "£24,000 - £28,000",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Apprentice Electrician",
    company: "Willmott Dixon",
    location: "Bristol",
    type: "Apprenticeship",
    sector: "Commercial",
    salary: "£14,000 - £17,000",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Junior Civil Engineer",
    company: "Laing O'Rourke",
    location: "Leeds",
    type: "Graduate",
    sector: "Infrastructure",
    salary: "£26,000 - £30,000",
    posted: "1 week ago",
  },
  {
    id: 6,
    title: "Apprentice Plumber",
    company: "Vistry Group",
    location: "Newcastle",
    type: "Apprenticeship",
    sector: "Residential",
    salary: "£13,000 - £16,000",
    posted: "4 days ago",
  },
];

const pathways = ["All", "Apprenticeship", "Entry Level", "Graduate"];
const sectors = ["All", "Residential", "Commercial", "Infrastructure"];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPathway, setSelectedPathway] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPathway = selectedPathway === "All" || job.type === selectedPathway;
    const matchesSector = selectedSector === "All" || job.sector === selectedSector;
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesPathway && matchesSector && matchesLocation;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 gradient-hero border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your <span className="text-gradient-primary">Construction Role</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse apprenticeships, entry-level positions, and graduate roles across the UK construction industry.
            </p>

            {/* Search Bar */}
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

      {/* Filters & Results */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="p-6 rounded-xl bg-card border border-border sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Pathway</label>
                    <div className="space-y-2">
                      {pathways.map((pathway) => (
                        <button
                          key={pathway}
                          onClick={() => setSelectedPathway(pathway)}
                          className={`w-full px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                            selectedPathway === pathway
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "text-muted-foreground hover:bg-card-alt hover:text-foreground"
                          }`}
                        >
                          {pathway}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Sector</label>
                    <div className="space-y-2">
                      {sectors.map((sector) => (
                        <button
                          key={sector}
                          onClick={() => setSelectedSector(sector)}
                          className={`w-full px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                            selectedSector === sector
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : "text-muted-foreground hover:bg-card-alt hover:text-foreground"
                          }`}
                        >
                          {sector}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">{filteredJobs.length}</span> jobs found
                </p>
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group card-glow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {job.type}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
                            {job.sector}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" asChild className="shrink-0">
                        <Link to="/candidate-dashboard">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No jobs match your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
