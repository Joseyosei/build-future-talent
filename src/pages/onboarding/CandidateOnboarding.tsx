import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowRight, ArrowLeft, Sun, Building, Shuffle, Hammer, Pencil, Users, Phone, TrendingUp, Shield, Sparkles, MapPin, Navigation, Globe, Upload, Camera, Check } from 'lucide-react';

const quizQuestions = [
  {
    id: 'workStyle',
    question: 'What kind of work environment do you prefer?',
    options: [
      { value: 'outdoors', label: 'Outdoors', icon: Sun, desc: 'On-site, open air, weather and all' },
      { value: 'indoors', label: 'Indoors', icon: Building, desc: 'Office, design studio, or control room' },
      { value: 'mix', label: 'A Mix', icon: Shuffle, desc: 'Variety — some days on-site, some in the office' },
    ],
  },
  {
    id: 'preference',
    question: 'What type of work excites you most?',
    options: [
      { value: 'hands-on', label: 'Hands-on Building', icon: Hammer, desc: 'Physical work, tools, and materials' },
      { value: 'technical', label: 'Technical Design', icon: Pencil, desc: 'Plans, drawings, and problem-solving' },
      { value: 'managing', label: 'Managing People', icon: Users, desc: 'Leading teams and coordinating projects' },
      { value: 'client-facing', label: 'Client-Facing', icon: Phone, desc: 'Meetings, presentations, and relationships' },
    ],
  },
  {
    id: 'motivation',
    question: 'What matters most to you in a career?',
    options: [
      { value: 'earnings', label: 'High Earnings', icon: TrendingUp, desc: 'Maximise your income potential' },
      { value: 'progression', label: 'Career Progression', icon: Sparkles, desc: 'Clear path to senior roles' },
      { value: 'security', label: 'Job Security', icon: Shield, desc: 'Stable, long-term employment' },
      { value: 'variety', label: 'Variety', icon: Shuffle, desc: 'Different projects and challenges' },
    ],
  },
  {
    id: 'location',
    question: 'How flexible are you with location?',
    options: [
      { value: 'local', label: 'Local Only', icon: MapPin, desc: 'Within my town or city' },
      { value: '30miles', label: 'Within 30 Miles', icon: Navigation, desc: 'Happy to commute a bit' },
      { value: 'anywhere', label: 'Anywhere in UK', icon: Globe, desc: 'Will relocate for the right role' },
    ],
  },
];

const availabilityOptions = [
  { value: 'immediate', label: 'Immediately', desc: "I'm ready to start right away" },
  { value: '1month', label: 'Within 1 Month', desc: 'Need a short notice period' },
  { value: '3months', label: 'Within 3 Months', desc: 'Currently wrapping things up' },
  { value: 'exploring', label: 'Currently Employed — Exploring', desc: 'Not in a rush, seeing what\'s out there' },
];

const rightToWorkOptions = [
  { value: 'uk_citizen', label: 'UK Citizen / Settled Status' },
  { value: 'work_visa', label: 'Valid Work Visa' },
  { value: 'apprenticeship', label: 'Eligible for Apprenticeship' },
];

const matchedRoles = [
  { role: 'Site Manager', match: 92, salary: '£35,000 – £55,000' },
  { role: 'Quantity Surveyor', match: 87, salary: '£30,000 – £50,000' },
  { role: 'Construction Project Coordinator', match: 84, salary: '£28,000 – £42,000' },
];

export default function CandidateOnboarding() {
  const [step, setStep] = useState(1);
  const [background, setBackground] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [availability, setAvailability] = useState('');
  const [rightToWork, setRightToWork] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const totalSteps = 6;

  const handleQuizAnswer = (questionId: string, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const currentQuizQuestion = quizQuestions.find(q => !quizAnswers[q.id]);
  const allQuizAnswered = quizQuestions.every(q => quizAnswers[q.id]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsLoading(true);
    
    const { error } = await supabase.from('candidate_profiles').upsert({
      user_id: user.id,
      background_text: background,
      quiz_answers: quizAnswers,
      availability,
      right_to_work: rightToWork,
      bio,
    });

    setIsLoading(false);
    if (error) {
      toast({ title: 'Error saving profile', description: error.message, variant: 'destructive' });
    } else {
      setStep(6);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container flex h-14 items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          <span className="font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>BuildFuture Talent</span>
        </div>
      </div>

      {/* Progress */}
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
        {/* Step 1: Background */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                Tell us about your background
              </h1>
              <p className="mt-2 text-muted-foreground text-sm">
                This isn't a CV. Tell us about any previous jobs, hobbies, interests, or skills from ANY sector. 
                We'll use this to match you with construction roles you might love.
              </p>
            </div>
            <Textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="e.g. I've worked in retail for 3 years and enjoy problem-solving. I'm good with my hands and love DIY projects at home..."
              className="min-h-[200px] text-base"
            />
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!background.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Career Quiz */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  Career interest quiz
                </h1>
                <p className="text-sm text-muted-foreground">Answer 4 quick questions to find your ideal construction career</p>
              </div>
            </div>
            
            {!allQuizAnswered && currentQuizQuestion && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">{currentQuizQuestion.question}</h2>
                <div className="grid gap-3">
                  {currentQuizQuestion.options.map(opt => (
                    <Card
                      key={opt.value}
                      className="cursor-pointer border-border hover:border-accent/50 transition-all"
                      onClick={() => handleQuizAnswer(currentQuizQuestion.id, opt.value)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <opt.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{opt.label}</p>
                          <p className="text-sm text-muted-foreground">{opt.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Question {Object.keys(quizAnswers).length + 1} of {quizQuestions.length}
                </p>
              </div>
            )}

            {allQuizAnswered && (
              <div className="text-center space-y-4 py-8">
                <Check className="h-12 w-12 text-accent mx-auto" />
                <p className="text-lg font-medium text-foreground">All questions answered!</p>
                <Button onClick={() => setStep(3)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Availability */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>When can you start?</h1>
                <p className="text-sm text-muted-foreground">Let employers know your availability</p>
              </div>
            </div>
            <div className="grid gap-3">
              {availabilityOptions.map(opt => (
                <Card
                  key={opt.value}
                  className={`cursor-pointer transition-all ${availability === opt.value ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}
                  onClick={() => setAvailability(opt.value)}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground">{opt.label}</p>
                    <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(4)} disabled={!availability} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Right to Work */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(3)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Right to work</h1>
                <p className="text-sm text-muted-foreground">This helps us match you with appropriate opportunities</p>
              </div>
            </div>
            <div className="grid gap-3">
              {rightToWorkOptions.map(opt => (
                <Card
                  key={opt.value}
                  className={`cursor-pointer transition-all ${rightToWork === opt.value ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}
                  onClick={() => setRightToWork(opt.value)}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground">{opt.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(5)} disabled={!rightToWork} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Photo + Bio */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setStep(4)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Almost there!</h1>
                <p className="text-sm text-muted-foreground">Add a photo and short bio to complete your profile</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Short bio</Label>
                <span className="text-xs text-muted-foreground">{bio.length}/140</span>
              </div>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 140))}
                placeholder="Enthusiastic about building a career in construction..."
                className="resize-none"
                rows={3}
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </div>
        )}

        {/* Step 6: Match Results */}
        {step === 6 && (
          <div className="space-y-8 animate-fade-in text-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                Your Construction Match 🏗️
              </h1>
              <p className="mt-2 text-muted-foreground">Based on your answers, here are your top matched roles</p>
            </div>

            <div className="grid gap-4">
              {matchedRoles.map((role, i) => (
                <Card key={role.role} className="border-border">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-bold text-foreground text-lg">{role.role}</p>
                      <p className="text-sm text-muted-foreground">{role.salary}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{role.match}%</p>
                        <p className="text-xs text-muted-foreground">match</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => navigate('/dashboard/candidate')}
              className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              View Jobs <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
