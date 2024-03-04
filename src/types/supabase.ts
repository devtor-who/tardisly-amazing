export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anonymous_post: {
        Row: {
          content: string
          created_at: string
          id: string
          topic_id: string
          writer_name: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          topic_id: string
          writer_name: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          topic_id?: string
          writer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_anonymous_post_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "anonymous_post_topic"
            referencedColumns: ["id"]
          }
        ]
      }
      anonymous_post_topic: {
        Row: {
          closed_at: string | null
          created_at: string
          id: string
          topic_name: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          id?: string
          topic_name: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          id?: string
          topic_name?: string
        }
        Relationships: []
      }
      two_factor_auth: {
        Row: {
          auth_available_at: string
          auth_code: string
          auth_limit_time: number
          auth_method: Database["public"]["Enums"]["TWO_FACTOR_AUTH_METHOD"]
          auth_user: string
          created_at: string
          id: string
        }
        Insert: {
          auth_available_at: string
          auth_code: string
          auth_limit_time: number
          auth_method?: Database["public"]["Enums"]["TWO_FACTOR_AUTH_METHOD"]
          auth_user: string
          created_at?: string
          id?: string
        }
        Update: {
          auth_available_at?: string
          auth_code?: string
          auth_limit_time?: number
          auth_method?: Database["public"]["Enums"]["TWO_FACTOR_AUTH_METHOD"]
          auth_user?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_two_factor_auth_auth_user_fkey"
            columns: ["auth_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          id: string
          updated_at: string
          use_2fa: boolean
          user_name: string
          user_role: Database["public"]["Enums"]["USER_ROLE"]
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          id?: string
          updated_at?: string
          use_2fa?: boolean
          user_name: string
          user_role?: Database["public"]["Enums"]["USER_ROLE"]
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          id?: string
          updated_at?: string
          use_2fa?: boolean
          user_name?: string
          user_role?: Database["public"]["Enums"]["USER_ROLE"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      TWO_FACTOR_AUTH_METHOD: "EMAIL"
      USER_ROLE: "ADMIN" | "GENERAL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
