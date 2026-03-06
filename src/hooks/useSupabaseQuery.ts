import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useCandidateProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['candidateProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useEmployerProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['employerProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useInstitutionProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['institutionProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('institution_profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useActiveJobs(filters?: { category?: string; location?: string; search?: string }) {
  return useQuery({
    queryKey: ['activeJobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*, employer_profiles!inner(company_name, logo_url)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters?.category && filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useEmployerJobs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['employerJobs', user?.id],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('employer_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) return [];

      const { data, error } = await supabase
        .from('jobs')
        .select('*, applications(count)')
        .eq('employer_id', profile.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useCandidateApplications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['candidateApplications', user?.id],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('candidate_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) return [];

      const { data, error } = await supabase
        .from('applications')
        .select('*, jobs(title, location, category, salary_min, salary_max, employer_profiles(company_name))')
        .eq('candidate_id', profile.id)
        .order('applied_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useApplyForJob() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data: profile } = await supabase
        .from('candidate_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) throw new Error('Profile not found');

      const { error } = await supabase.from('applications').insert({
        job_id: jobId,
        candidate_id: profile.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidateApplications'] });
      queryClient.invalidateQueries({ queryKey: ['activeJobs'] });
    },
  });
}

export function usePostJob() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (job: {
      title: string; category: string; location: string;
      salary_min: number; salary_max: number; contract_type: string;
      description: string; requirements: string;
      build_ready_required: boolean; open_to_career_changers: boolean;
    }) => {
      const { data: profile } = await supabase
        .from('employer_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) throw new Error('Employer profile not found');

      const { error } = await supabase.from('jobs').insert({
        ...job,
        employer_id: profile.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
      queryClient.invalidateQueries({ queryKey: ['candidateApplications'] });
    },
  });
}

export function useBadges() {
  return useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useCandidateBadges() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['candidateBadges', user?.id],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('candidate_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) return [];

      const { data, error } = await supabase
        .from('candidate_badges')
        .select('*, badges(*)')
        .eq('candidate_id', profile.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useEarnBadge() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (badgeId: string) => {
      const { data: profile } = await supabase
        .from('candidate_profiles')
        .select('id')
        .eq('user_id', user!.id)
        .single();
      if (!profile) throw new Error('Profile not found');

      const { error } = await supabase.from('candidate_badges').insert({
        candidate_id: profile.id,
        badge_id: badgeId,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidateBadges'] });
    },
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('jobs')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employerJobs'] });
      queryClient.invalidateQueries({ queryKey: ['activeJobs'] });
    },
  });
}
