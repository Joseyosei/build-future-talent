import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface QuizAnswers {
  background_type?: string;
  work_environment?: string;
  work_style?: string;
  motivation?: string;
  location_flex?: string;
}

const STYLE_CATEGORY_FIT: Record<string, string[]> = {
  "hands_on": ["Apprentice Carpenter", "Apprentice Electrician", "Apprentice Plumber", "Site Manager"],
  "technical": ["BIM Technician", "CAD Technician", "Site Engineer", "Graduate Civil Engineer", "Estimator"],
  "managing": ["Project Manager", "Site Manager", "Trainee Site Coordinator", "Health & Safety Officer"],
  "client_facing": ["Quantity Surveyor", "Estimator", "Project Manager", "Trainee Site Coordinator"],
};

const BACKGROUND_CATEGORY_FIT: Record<string, string[]> = {
  "school_leaver": ["Apprentice Carpenter", "Apprentice Electrician", "Apprentice Plumber"],
  "college_student": ["Apprentice Carpenter", "Apprentice Electrician", "Trainee Site Coordinator", "BIM Technician"],
  "graduate": ["Graduate Civil Engineer", "Quantity Surveyor", "Site Engineer", "BIM Technician", "Project Manager"],
  "career_changer": ["Trainee Site Coordinator", "Health & Safety Officer", "Estimator", "Site Manager"],
  "ex_military": ["Site Manager", "Project Manager", "Health & Safety Officer", "Trainee Site Coordinator"],
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Site Engineer": ["engineering", "civil", "site", "construction", "structural"],
  "Quantity Surveyor": ["quantity", "surveying", "costs", "estimating", "commercial"],
  "Project Manager": ["management", "project", "planning", "leadership"],
  "Apprentice Carpenter": ["carpentry", "woodwork", "joinery", "hands-on"],
  "Apprentice Electrician": ["electrical", "wiring", "circuits"],
  "Apprentice Plumber": ["plumbing", "pipework", "heating"],
  "Trainee Site Coordinator": ["coordination", "admin", "scheduling"],
  "Graduate Civil Engineer": ["civil", "engineering", "degree", "structures"],
  "BIM Technician": ["bim", "revit", "autocad", "3d", "modelling"],
  "Health & Safety Officer": ["safety", "health", "compliance", "risk"],
  "Site Manager": ["management", "site", "supervision", "leadership"],
  "Estimator": ["estimating", "costs", "pricing", "tender"],
  "CAD Technician": ["cad", "autocad", "drawing", "technical"],
};

function tokenise(text: string): Set<string> {
  return new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2));
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { candidate_id, job_id, compute_all } = await req.json();
    if (!candidate_id) {
      return new Response(JSON.stringify({ error: "candidate_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: candidate } = await supabase
      .from("candidate_profiles").select("id, background_text, quiz_answers, location").eq("user_id", candidate_id).single();
    if (!candidate) {
      return new Response(JSON.stringify({ error: "Candidate not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { count: badgeCount } = await supabase.from("candidate_badges").select("*", { count: "exact", head: true }).eq("candidate_id", candidate.id);
    const hasBadges = (badgeCount ?? 0) > 0;

    let jobs: any[] = [];
    if (compute_all) {
      const { data } = await supabase.from("jobs").select("*").eq("status", "active");
      jobs = data ?? [];
    } else if (job_id) {
      const { data } = await supabase.from("jobs").select("*").eq("id", job_id).single();
      if (data) jobs = [data];
    }

    const quiz = (candidate.quiz_answers as QuizAnswers) || {};
    const bgTokens = tokenise(candidate.background_text || "");

    const results = jobs.map(job => {
      let score = 0;
      const keywords = CATEGORY_KEYWORDS[job.category] ?? [];
      const matched = keywords.filter(kw => bgTokens.has(kw));
      score += Math.round((matched.length / Math.max(keywords.length, 1)) * 35);

      if (quiz.location_flex === "anywhere") score += 20;
      else if ((candidate.location || "").toLowerCase().includes(job.location.toLowerCase())) score += 20;
      else if (quiz.location_flex === "30_miles") score += 10;
      else score += 4;

      const styleFit = STYLE_CATEGORY_FIT[quiz.work_style ?? ""] ?? [];
      if (styleFit.includes(job.category)) score += 8;
      const bgFit = BACKGROUND_CATEGORY_FIT[quiz.background_type ?? ""] ?? [];
      if (bgFit.includes(job.category)) score += 7;

      if (quiz.background_type === "career_changer" && job.open_to_career_changers) score += 2;
      if (job.build_ready_required && hasBadges) score += 3;

      return { job_id: job.id, candidate_id: candidate.id, score: Math.min(score, 100) };
    });

    const upsertRows = results.map(r => ({ ...r, computed_at: new Date().toISOString() }));
    if (upsertRows.length > 0) {
      await supabase.from("match_scores").upsert(upsertRows, { onConflict: "candidate_id,job_id" });
    }

    return new Response(JSON.stringify({ success: true, results: results.sort((a, b) => b.score - a.score) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
