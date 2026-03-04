import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Building2, HardHat, GraduationCap, Briefcase, ArrowLeft, ArrowRight, Check, Mail } from 'lucide-react';

type UserRole = 'candidate' | 'employer' | 'institution';

const roleCards = [
  {
    role: 'candidate' as UserRole,
    icon: HardHat,
    title: 'Job Seeker',
    lines: [
      'Get matched to construction roles based on your skills',
      'Earn Build Ready badges to stand out',
      'Access career pathways and training resources',
    ],
  },
  {
    role: 'employer' as UserRole,
    icon: Briefcase,
    title: 'Employer',
    lines: [
      'Post jobs and find pre-vetted early-career talent',
      'Access diversity & inclusion dashboards',
      'Run cohort hiring events and CITB reporting',
    ],
  },
  {
    role: 'institution' as UserRole,
    icon: GraduationCap,
    title: 'Educational Institution',
    lines: [
      'Track student placements and outcomes',
      'Export DfE and Ofsted-ready reports',
      'Partner with employers for cohort hiring',
    ],
  },
];

const candidateSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  email: z.string().trim().email('Valid email required').max(255),
  password: z.string().min(8, 'At least 8 characters'),
  location: z.string().trim().min(1, 'Location is required').max(20),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
});

const employerSchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required').max(100),
  contactName: z.string().trim().min(1, 'Contact name is required').max(100),
  email: z.string().trim().email('Valid email required').max(255),
  password: z.string().min(8, 'At least 8 characters'),
  companySize: z.string().min(1, 'Select company size'),
  region: z.string().min(1, 'Select region'),
});

const institutionSchema = z.object({
  institutionName: z.string().trim().min(1, 'Institution name is required').max(100),
  contactName: z.string().trim().min(1, 'Contact name is required').max(100),
  email: z.string().trim().email('Valid email required').max(255),
  password: z.string().min(8, 'At least 8 characters'),
  institutionType: z.string().min(1, 'Select institution type'),
  region: z.string().min(1, 'Select region'),
});

const ukRegions = [
  'London', 'South East', 'South West', 'East of England', 'East Midlands',
  'West Midlands', 'North West', 'North East', 'Yorkshire & Humber',
  'Scotland', 'Wales', 'Northern Ireland',
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const candidateForm = useForm({ resolver: zodResolver(candidateSchema) });
  const employerForm = useForm({ resolver: zodResolver(employerSchema) });
  const institutionForm = useForm({ resolver: zodResolver(institutionSchema) });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const submitRegistration = async (data: Record<string, string>) => {
    if (!selectedRole) return;
    setIsLoading(true);

    const { email, password, ...metadata } = data;
    const { error } = await signUp(email, password, selectedRole, metadata);
    setIsLoading(false);

    if (error) {
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
    } else {
      setStep(3);
      setEmailSent(true);
    }
  };

  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <span className="font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
              BuildFuture Talent
            </span>
          </Link>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? <span className="text-accent font-medium">Sign in</span>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 max-w-lg mx-auto">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div className={`h-2 flex-1 rounded-full transition-colors ${i < step ? 'bg-accent' : 'bg-muted'}`} />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Step 1: Choose Role */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  How will you use BuildFuture Talent?
                </h1>
                <p className="mt-2 text-muted-foreground">Choose the account type that best describes you</p>
              </div>

              <div className="grid gap-4">
                {roleCards.map((card) => (
                  <Card
                    key={card.role}
                    className="cursor-pointer border-border hover:border-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-accent/5"
                    onClick={() => handleRoleSelect(card.role)}
                  >
                    <CardContent className="p-6 flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                        <card.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                          {card.title}
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {card.lines.map((line, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Role-specific Form */}
          {step === 2 && selectedRole === 'candidate' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                    Create your Job Seeker account
                  </h1>
                  <p className="text-sm text-muted-foreground">Tell us about yourself to get started</p>
                </div>
              </div>
              <form onSubmit={candidateForm.handleSubmit(submitRegistration)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First name</Label>
                    <Input placeholder="John" className="h-11" {...candidateForm.register('firstName')} />
                    {candidateForm.formState.errors.firstName && <p className="text-xs text-destructive">{candidateForm.formState.errors.firstName.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Last name</Label>
                    <Input placeholder="Smith" className="h-11" {...candidateForm.register('lastName')} />
                    {candidateForm.formState.errors.lastName && <p className="text-xs text-destructive">{candidateForm.formState.errors.lastName.message as string}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email address</Label>
                  <Input type="email" placeholder="you@example.com" className="h-11" {...candidateForm.register('email')} />
                  {candidateForm.formState.errors.email && <p className="text-xs text-destructive">{candidateForm.formState.errors.email.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="At least 8 characters" className="h-11" {...candidateForm.register('password')} />
                  {candidateForm.formState.errors.password && <p className="text-xs text-destructive">{candidateForm.formState.errors.password.message as string}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>UK postcode</Label>
                    <Input placeholder="SW1A 1AA" className="h-11" {...candidateForm.register('location')} />
                    {candidateForm.formState.errors.location && <p className="text-xs text-destructive">{candidateForm.formState.errors.location.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone number</Label>
                    <Input placeholder="07700 900000" className="h-11" {...candidateForm.register('phone')} />
                    {candidateForm.formState.errors.phone && <p className="text-xs text-destructive">{candidateForm.formState.errors.phone.message as string}</p>}
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 mt-2 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </form>
            </div>
          )}

          {step === 2 && selectedRole === 'employer' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                    Register your company
                  </h1>
                  <p className="text-sm text-muted-foreground">Start hiring early-career construction talent</p>
                </div>
              </div>
              <form onSubmit={employerForm.handleSubmit(submitRegistration)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Company name</Label>
                  <Input placeholder="Acme Construction Ltd" className="h-11" {...employerForm.register('companyName')} />
                  {employerForm.formState.errors.companyName && <p className="text-xs text-destructive">{employerForm.formState.errors.companyName.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Your name</Label>
                  <Input placeholder="Jane Smith" className="h-11" {...employerForm.register('contactName')} />
                  {employerForm.formState.errors.contactName && <p className="text-xs text-destructive">{employerForm.formState.errors.contactName.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Work email</Label>
                  <Input type="email" placeholder="you@company.com" className="h-11" {...employerForm.register('email')} />
                  {employerForm.formState.errors.email && <p className="text-xs text-destructive">{employerForm.formState.errors.email.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="At least 8 characters" className="h-11" {...employerForm.register('password')} />
                  {employerForm.formState.errors.password && <p className="text-xs text-destructive">{employerForm.formState.errors.password.message as string}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company size</Label>
                    <Select onValueChange={(v) => employerForm.setValue('companySize', v)}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select size" /></SelectTrigger>
                      <SelectContent>
                        {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => (
                          <SelectItem key={s} value={s}>{s} employees</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {employerForm.formState.errors.companySize && <p className="text-xs text-destructive">{employerForm.formState.errors.companySize.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select onValueChange={(v) => employerForm.setValue('region', v)}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>
                        {ukRegions.map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {employerForm.formState.errors.region && <p className="text-xs text-destructive">{employerForm.formState.errors.region.message as string}</p>}
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 mt-2 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </form>
            </div>
          )}

          {step === 2 && selectedRole === 'institution' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                    Register your institution
                  </h1>
                  <p className="text-sm text-muted-foreground">Track placements and partner with employers</p>
                </div>
              </div>
              <form onSubmit={institutionForm.handleSubmit(submitRegistration)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Institution name</Label>
                  <Input placeholder="City College London" className="h-11" {...institutionForm.register('institutionName')} />
                  {institutionForm.formState.errors.institutionName && <p className="text-xs text-destructive">{institutionForm.formState.errors.institutionName.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Contact name</Label>
                  <Input placeholder="Dr Sarah Jones" className="h-11" {...institutionForm.register('contactName')} />
                  {institutionForm.formState.errors.contactName && <p className="text-xs text-destructive">{institutionForm.formState.errors.contactName.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="admin@college.ac.uk" className="h-11" {...institutionForm.register('email')} />
                  {institutionForm.formState.errors.email && <p className="text-xs text-destructive">{institutionForm.formState.errors.email.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="At least 8 characters" className="h-11" {...institutionForm.register('password')} />
                  {institutionForm.formState.errors.password && <p className="text-xs text-destructive">{institutionForm.formState.errors.password.message as string}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution type</Label>
                    <Select onValueChange={(v) => institutionForm.setValue('institutionType', v)}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {['College', 'University', 'Training Provider', 'CITB', 'Government Body'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {institutionForm.formState.errors.institutionType && <p className="text-xs text-destructive">{institutionForm.formState.errors.institutionType.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select onValueChange={(v) => institutionForm.setValue('region', v)}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>
                        {ukRegions.map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {institutionForm.formState.errors.region && <p className="text-xs text-destructive">{institutionForm.formState.errors.region.message as string}</p>}
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 mt-2 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </form>
            </div>
          )}

          {/* Step 3: Email Verification */}
          {step === 3 && (
            <div className="text-center space-y-6 animate-fade-in py-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                <Mail className="h-10 w-10 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  Check your email
                </h1>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                  We've sent a verification link to your email address. Click the link to activate your account.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => toast({ title: 'Verification email resent' })}
                className="mt-4"
              >
                Resend verification email
              </Button>
              <p className="text-sm text-muted-foreground">
                Already verified?{' '}
                <Link to="/login" className="text-accent hover:text-accent/80 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
