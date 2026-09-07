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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      custom_course_materials: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          material_type: string
          title: string
          url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          material_type: string
          title: string
          url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          material_type?: string
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "custom_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_course_questions: {
        Row: {
          answer: string | null
          course_id: string
          created_at: string
          id: string
          question: string
          source_url: string | null
        }
        Insert: {
          answer?: string | null
          course_id: string
          created_at?: string
          id?: string
          question: string
          source_url?: string | null
        }
        Update: {
          answer?: string | null
          course_id?: string
          created_at?: string
          id?: string
          question?: string
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_course_questions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "custom_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_courses: {
        Row: {
          course_code: string | null
          course_name: string
          created_at: string
          description: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          course_code?: string | null
          course_name: string
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          course_code?: string | null
          course_name?: string
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      past_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          difficulty: string | null
          exam_name: string
          explanation: string | null
          id: string
          options: Json
          question: string
          subject: string
          year: number
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          difficulty?: string | null
          exam_name: string
          explanation?: string | null
          id?: string
          options: Json
          question: string
          subject: string
          year: number
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          difficulty?: string | null
          exam_name?: string
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          subject?: string
          year?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_level: number | null
          avatar_url: string | null
          created_at: string | null
          custom_avatar: string | null
          full_name: string | null
          id: string
          reading_hours: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_level?: number | null
          avatar_url?: string | null
          created_at?: string | null
          custom_avatar?: string | null
          full_name?: string | null
          id: string
          reading_hours?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_level?: number | null
          avatar_url?: string | null
          created_at?: string | null
          custom_avatar?: string | null
          full_name?: string | null
          id?: string
          reading_hours?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_answer?: string
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          difficulty: string
          explanation: string | null
          id: string
          options: Json
          question: string
          subject: string
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          difficulty: string
          explanation?: string | null
          id?: string
          options: Json
          question: string
          subject: string
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          subject?: string
        }
        Relationships: []
      }
      study_plans: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          start_date: string
          subjects: Json | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          start_date: string
          subjects?: Json | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          start_date?: string
          subjects?: Json | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number
          id: string
          notes: string | null
          session_date: string | null
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes: number
          id?: string
          notes?: string | null
          session_date?: string | null
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          notes?: string | null
          session_date?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      quiz_questions_safe: {
        Row: {
          created_at: string | null
          difficulty: string | null
          explanation: string | null
          id: string | null
          options: Json | null
          question: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string | null
          options?: Json | null
          question?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string | null
          options?: Json | null
          question?: string | null
          subject?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_quiz_answer: {
        Args: { _question_id: string; _selected_answer: string }
        Returns: boolean
      }
      get_correct_answer: { Args: { _question_id: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
