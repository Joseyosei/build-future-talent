export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string | null
          candidate_id: string
          id: string
          job_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applied_at?: string | null
          candidate_id: string
          id?: string
          job_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_at?: string | null
          candidate_id?: string
          id?: string
          job_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          category: string | null
          description: string | null
          id: string
          name: string
          sort_order: number | null
          time_estimate: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
          time_estimate?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          time_estimate?: string | null
        }
        Relationships: []
      }
      candidate_badges: {
        Row: {
          badge_id: string
          candidate_id: string
          earned_at: string | null
          id: string
        }
        Insert: {
          badge_id: string
          candidate_id: string
          earned_at?: string | null
          id?: string
        }
        Update: {
          badge_id?: string
          candidate_id?: string
          earned_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          age_range: string | null
          availability: string | null
          background_text: string | null
          bio: string | null
          created_at: string
          cv_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          photo_url: string | null
          postcode: string | null
          profile_completion: number | null
          quiz_answers: Json | null
          right_to_work: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age_range?: string | null
          availability?: string | null
          background_text?: string | null
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          photo_url?: string | null
          postcode?: string | null
          profile_completion?: number | null
          quiz_answers?: Json | null
          right_to_work?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age_range?: string | null
          availability?: string | null
          background_text?: string | null
          bio?: string | null
          created_at?: string
          cv_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          photo_url?: string | null
          postcode?: string | null
          profile_completion?: number | null
          quiz_answers?: Json | null
          right_to_work?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cohorts: {
        Row: {
          id: string
          institution_id: string
          name: string
          student_count: number | null
          upload_date: string | null
        }
        Insert: {
          id?: string
          institution_id: string
          name: string
          student_count?: number | null
          upload_date?: string | null
        }
        Update: {
          id?: string
          institution_id?: string
          name?: string
          student_count?: number | null
          upload_date?: string | null
        }
        Relationships: []
      }
      employer_profiles: {
        Row: {
          company_name: string | null
          company_size: string | null
          company_type: string | null
          contact_name: string | null
          created_at: string
          description: string | null
          hire_volume: string | null
          hiring_roles: string[] | null
          id: string
          logo_url: string | null
          plan: string | null
          region: string | null
          trust_score: number | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          company_name?: string | null
          company_size?: string | null
          company_type?: string | null
          contact_name?: string | null
          created_at?: string
          description?: string | null
          hire_volume?: string | null
          hiring_roles?: string[] | null
          id?: string
          logo_url?: string | null
          plan?: string | null
          region?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string | null
          company_size?: string | null
          company_type?: string | null
          contact_name?: string | null
          created_at?: string
          description?: string | null
          hire_volume?: string | null
          hiring_roles?: string[] | null
          id?: string
          logo_url?: string | null
          plan?: string | null
          region?: string | null
          trust_score?: number | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      institution_profiles: {
        Row: {
          contact_name: string | null
          created_at: string
          description: string | null
          id: string
          institution_name: string | null
          institution_type: string | null
          logo_url: string | null
          partnership_goals: string[] | null
          plan: string | null
          region: string | null
          regulatory_body: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          contact_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_name?: string | null
          institution_type?: string | null
          logo_url?: string | null
          partnership_goals?: string[] | null
          plan?: string | null
          region?: string | null
          regulatory_body?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          contact_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_name?: string | null
          institution_type?: string | null
          logo_url?: string | null
          partnership_goals?: string[] | null
          plan?: string | null
          region?: string | null
          regulatory_body?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          build_ready_required: boolean | null
          category: string
          contract_type: string | null
          created_at: string | null
          description: string | null
          employer_id: string
          id: string
          location: string
          open_to_career_changers: boolean | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          status: string | null
          title: string
        }
        Insert: {
          build_ready_required?: boolean | null
          category: string
          contract_type?: string | null
          created_at?: string | null
          description?: string | null
          employer_id: string
          id?: string
          location: string
          open_to_career_changers?: boolean | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title: string
        }
        Update: {
          build_ready_required?: boolean | null
          category?: string
          contract_type?: string | null
          created_at?: string | null
          description?: string | null
          employer_id?: string
          id?: string
          location?: string
          open_to_career_changers?: boolean | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      match_scores: {
        Row: {
          breakdown: Json | null
          candidate_id: string
          computed_at: string | null
          id: string
          job_id: string
          score: number
        }
        Insert: {
          breakdown?: Json | null
          candidate_id: string
          computed_at?: string | null
          id?: string
          job_id: string
          score: number
        }
        Update: {
          breakdown?: Json | null
          candidate_id?: string
          computed_at?: string | null
          id?: string
          job_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_scores_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      placements: {
        Row: {
          candidate_id: string
          created_at: string | null
          employer_id: string | null
          id: string
          job_id: string | null
          start_date: string | null
          status: string | null
          three_month_checkin: string | null
          twelve_month_checkin: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          start_date?: string | null
          status?: string | null
          three_month_checkin?: string | null
          twelve_month_checkin?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          start_date?: string | null
          status?: string | null
          three_month_checkin?: string | null
          twelve_month_checkin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "placements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "candidate" | "employer" | "institution"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "candidate", "employer", "institution"],
    },
  },
} as const
