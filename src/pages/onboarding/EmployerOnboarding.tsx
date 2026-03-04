import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowRight, ArrowLeft, Upload, Check, X } from 'lucide-react';

const companyTypes = ['Main Contractor', 'Subcontractor', 'Developer', 'Consultancy', 'SME'];

const constructionRoles = [
  'Site Manager', 'Project Manager', 'Quantity Surveyor', 'Estimator', 'Site Engineer',
  'Civil Engineer', 'Structural Engineer', 'Architect', 'CAD Technician', 'BIM Manager',
  'Health & Safety Officer', 'Electrician', 'Plumber', 'Carpenter', 'Bricklayer',
  'Plasterer', 'Painter & Decorator', 'Crane Operator', 'Plant Operator', 'Labourer',
  'Contracts Manager', 'Commercial Manager', 'Design Manager', 'Planning Engineer', 'Surveyor',
];

const ukRegions = [
  'London', 'South East', 'South West', 'East of England', 'East Midlands',
  'West Midlands', 'North West', 'North East', 'Yorkshire & Humber',
  'Scotland', 'Wales', 'Northern Ireland',
];

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    features: ['2 active job posts', 'Basic candidate search', 'Email support'],
    missing: ['D&I dashboard', 'CITB reporting', 'Cohort hiring events', 'Talent sponsorship'],
  },
  {
    name: 'Growth',
    price: '£299',
    period: '/month',
    features: ['10 active job posts', 'Advanced matching', 'D&I dashboard', 'Priority support', 'Employer trust badge'],
    missing: ['CITB reporting', 'Cohort hiring events'],
    popular: true,
  },
  {
    name: 'Scale',
    price: '£999',
    period: '/month',
    features: ['Unlimited job posts', 'Advanced matching', 'D&I dashboard', 'CITB reporting', 'Cohort hiring events', 'Talent sponsorship', 'Dedicated account manager'],
    missing: [],
  },
];

export default function EmployerOnboarding() {
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [hiringRoles, setHiringRoles] = useState<string[]>([]);
  const [hireVolume, setHireVolume] = useState('');
  const [hiringRegions, setHiringRegions] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleRole = (role: string) => {
    setHiringRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const toggleRegion = (region: string) => {
    setHiringRegions(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);
    const { error } = await supabase.from('employer_profiles').upsert({
      user_id: user.id,
      company_type: companyType,
      description,
      website,
      hiring_roles: hiringRoles,
      hire_volume: hireVolume,
      region: hiringRegions.join(', '),
      plan: selectedPlan,
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Profile complete!' });
      navigate('/dashboard/employer');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container flex h-14 items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          <span className="font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>BuildFuture Talent</span>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="container py-3">
          <div className="flex gap-1 max-w-lg mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-10 px-4">
        {/* Step 1: Company Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Company details</h1>
              <p className="text-sm text-muted-foreground mt-1">Tell us about your organisation</p>
            </div>

            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-accent/30 transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground">Upload company logo</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Company description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of your company..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://www.company.com" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Company type</Label>
                <Select onValueChange={setCompanyType}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {companyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!companyType} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Hiring Needs */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Hiring needs</h1>
                <p className="text-sm text-muted-foreground">What roles do you typically hire for?</p>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Roles you hire for</Label>
              <div className="flex flex-wrap gap-2">
                {constructionRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      hiringRoles.includes(role)
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-transparent text-muted-foreground border-border hover:border-accent/30'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Typical hires per quarter</Label>
              <Select onValueChange={setHireVolume}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select volume" /></SelectTrigger>
                <SelectContent>
                  {['1-5', '6-20', '21-50', '50+'].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-3 block">Regions hiring in</Label>
              <div className="flex flex-wrap gap-2">
                {ukRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      hiringRegions.includes(region)
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-transparent text-muted-foreground border-border hover:border-accent/30'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(3)} disabled={hiringRoles.length === 0} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Choose your plan</h1>
                <p className="text-sm text-muted-foreground">You can upgrade anytime</p>
              </div>
            </div>

            <div className="grid gap-4">
              {plans.map(plan => (
                <Card
                  key={plan.name}
                  className={`cursor-pointer transition-all relative ${
                    selectedPlan === plan.name ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'
                  }`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3">{plan.name}</h3>
                    <ul className="space-y-1.5">
                      {plan.features.map(f => (
                        <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-accent shrink-0" /> {f}
                        </li>
                      ))}
                      {plan.missing.map(f => (
                        <li key={f} className="text-sm text-muted-foreground/50 flex items-center gap-2">
                          <X className="h-3.5 w-3.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleSave}
              disabled={!selectedPlan || isLoading}
              className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
