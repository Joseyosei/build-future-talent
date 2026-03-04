import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowLeft, Lock, Mail } from 'lucide-react';

const requestSchema = z.object({
  email: z.string().trim().email('Valid email required'),
});

const resetSchema = z.object({
  password: z.string().min(8, 'At least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm your password'),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function ResetPasswordPage() {
  const [isRecovery, setIsRecovery] = useState(false);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }
  }, []);

  const requestForm = useForm({ resolver: zodResolver(requestSchema) });
  const resetForm = useForm({ resolver: zodResolver(resetSchema) });

  const handleRequest = async (data: { email: string }) => {
    setIsLoading(true);
    const { error } = await resetPassword(data.email);
    setIsLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setSent(true);
    }
  };

  const handleReset = async (data: { password: string }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: data.password });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password updated!' });
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center gap-2 mb-8">
          <Building2 className="h-5 w-5 text-accent" />
          <span className="font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>BuildFuture Talent</span>
        </div>

        {isRecovery ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Set new password</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enter your new password below</p>
            </div>
            <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4">
              <div className="space-y-2">
                <Label>New password</Label>
                <Input type="password" className="h-11" {...resetForm.register('password')} />
                {resetForm.formState.errors.password && <p className="text-xs text-destructive">{resetForm.formState.errors.password.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label>Confirm password</Label>
                <Input type="password" className="h-11" {...resetForm.register('confirmPassword')} />
                {resetForm.formState.errors.confirmPassword && <p className="text-xs text-destructive">{resetForm.formState.errors.confirmPassword.message as string}</p>}
              </div>
              <Button type="submit" className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>
        ) : sent ? (
          <div className="text-center space-y-4">
            <Mail className="h-12 w-12 text-accent mx-auto" />
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Check your email</h1>
            <p className="text-muted-foreground">We've sent a password reset link to your email.</p>
            <Link to="/login" className="text-accent text-sm hover:underline">Back to sign in</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Forgot password?</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send a reset link</p>
            </div>
            <form onSubmit={requestForm.handleSubmit(handleRequest)} className="space-y-4">
              <div className="space-y-2">
                <Label>Email address</Label>
                <Input type="email" placeholder="you@example.com" className="h-11" {...requestForm.register('email')} />
                {requestForm.formState.errors.email && <p className="text-xs text-destructive">{requestForm.formState.errors.email.message as string}</p>}
              </div>
              <Button type="submit" className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
            <Link to="/login" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
