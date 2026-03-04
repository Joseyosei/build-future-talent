import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowRight, ArrowLeft, Upload, Check, X } from 'lucide-react';

const institutionTypes = ['College', 'University', 'Training Provider', 'CITB', 'Government Body'];
const ukRegions = [
  'London', 'South East', 'South West', 'East of England', 'East Midlands',
  'West Midlands', 'North West', 'North East', 'Yorkshire & Humber',
  'Scotland', 'Wales', 'Northern Ireland',
];

const partnershipGoals = [
  'Track student placements',
  'Export DfE data',
  'CITB levy reporting',
  'Cohort hiring events',
  'Graduate outcome analytics',
];

const plans = [
  {
    name: 'Starter',
    price: '£0',
    period: 'forever',
    features: ['Up to 50 students', 'Basic placement tracking', 'Email support'],
    missing: ['Advanced analytics', 'Government reporting', 'API access'],
  },
  {
    name: 'Professional',
    price: '£5,000',
    period: '/year',
    features: ['Up to 500 students', 'Full placement tracking', 'DfE & Ofsted reports', 'Employer partner network', 'Priority support'],
    missing: ['Custom API access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited students', 'Full placement tracking', 'All reporting', 'Custom API integrations', 'Dedicated account manager', 'SLA guarantee'],
    missing: [],
  },
];

export default function InstitutionOnboarding() {
  const [step, setStep] = useState(1);
  const [institutionType, setInstitutionType] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [regulatoryBody, setRegulatoryBody] = useState('');
  const [region, setRegion] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleGoal = (goal: string) => {
    setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);
    const { error } = await supabase.from('institution_profiles').upsert({
      user_id: user.id,
      institution_type: institutionType,
      description,
      website,
      regulatory_body: regulatoryBody,
      region,
      partnership_goals: goals,
      plan: selectedPlan,
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Profile complete!' });
      navigate('/dashboard/institution');
    }
  };

  const totalSteps = 3;

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
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-accent' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-10 px-4">
        {/* Step 1: Institution Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Institution details</h1>
              <p className="text-sm text-muted-foreground mt-1">Tell us about your institution</p>
            </div>

            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-accent/30 transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of your institution..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution type</Label>
                  <Select onValueChange={setInstitutionType}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {institutionTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select onValueChange={setRegion}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select region" /></SelectTrigger>
                    <SelectContent>
                      {ukRegions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ofsted / Regulatory body</Label>
                <Input value={regulatoryBody} onChange={e => setRegulatoryBody(e.target.value)} placeholder="e.g. Ofsted, QAA" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://www.institution.ac.uk" className="h-11" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!institutionType || !region} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Partnership Goals */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Partnership goals</h1>
                <p className="text-sm text-muted-foreground">What would you like to achieve with BuildFuture Talent?</p>
              </div>
            </div>

            <div className="grid gap-3">
              {partnershipGoals.map(goal => (
                <Card
                  key={goal}
                  className={`cursor-pointer transition-all ${goals.includes(goal) ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}
                  onClick={() => toggleGoal(goal)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`h-5 w-5 rounded border flex items-center justify-center ${goals.includes(goal) ? 'bg-accent border-accent' : 'border-border'}`}>
                      {goals.includes(goal) && <Check className="h-3 w-3 text-accent-foreground" />}
                    </div>
                    <span className="text-foreground">{goal}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(3)} disabled={goals.length === 0} className="bg-accent text-accent-foreground hover:bg-accent/90">
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
                <p className="text-sm text-muted-foreground">Select the plan that fits your institution</p>
              </div>
            </div>

            <div className="grid gap-4">
              {plans.map(plan => (
                <Card
                  key={plan.name}
                  className={`cursor-pointer transition-all relative ${selectedPlan === plan.name ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Recommended
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
