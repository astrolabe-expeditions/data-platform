export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      campaigns: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          program_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          program_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          program_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'campaigns_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'programs';
            referencedColumns: ['id'];
          },
        ];
      };
      dataset_files: {
        Row: {
          dataset_id: string;
          extension: string;
          id: string;
          instrument_id: string;
          name: string;
          path: string;
          processed_at: string | null;
          processing_status: Database['public']['Enums']['processing_status'];
          started_at: string | null;
          uploaded_at: string | null;
        };
        Insert: {
          dataset_id: string;
          extension: string;
          id?: string;
          instrument_id: string;
          name: string;
          path: string;
          processed_at?: string | null;
          processing_status?: Database['public']['Enums']['processing_status'];
          started_at?: string | null;
          uploaded_at?: string | null;
        };
        Update: {
          dataset_id?: string;
          extension?: string;
          id?: string;
          instrument_id?: string;
          name?: string;
          path?: string;
          processed_at?: string | null;
          processing_status?: Database['public']['Enums']['processing_status'];
          started_at?: string | null;
          uploaded_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'dataset_files_dataset_id_fkey';
            columns: ['dataset_id'];
            isOneToOne: false;
            referencedRelation: 'datasets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'dataset_files_instrument_id_fkey';
            columns: ['instrument_id'];
            isOneToOne: false;
            referencedRelation: 'instruments';
            referencedColumns: ['id'];
          },
        ];
      };
      datasets: {
        Row: {
          campaign_id: string | null;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          end_at: string;
          id: string;
          is_public: boolean | null;
          processed_at: string | null;
          processing_status: Database['public']['Enums']['processing_status'];
          program_id: string | null;
          start_at: string;
          station_id: string;
          updated_at: string;
        };
        Insert: {
          campaign_id?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at: string;
          id?: string;
          is_public?: boolean | null;
          processed_at?: string | null;
          processing_status?: Database['public']['Enums']['processing_status'];
          program_id?: string | null;
          start_at: string;
          station_id: string;
          updated_at?: string;
        };
        Update: {
          campaign_id?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at?: string;
          id?: string;
          is_public?: boolean | null;
          processed_at?: string | null;
          processing_status?: Database['public']['Enums']['processing_status'];
          program_id?: string | null;
          start_at?: string;
          station_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'datasets_campaign_id_fkey';
            columns: ['campaign_id'];
            isOneToOne: false;
            referencedRelation: 'campaigns';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'datasets_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'programs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'datasets_station_id_fkey';
            columns: ['station_id'];
            isOneToOne: false;
            referencedRelation: 'stations';
            referencedColumns: ['id'];
          },
        ];
      };
      instruments: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          model_id: string;
          serial_number: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          model_id: string;
          serial_number: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          model_id?: string;
          serial_number?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'instruments_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'models';
            referencedColumns: ['id'];
          },
        ];
      };
      measures: {
        Row: {
          dataset_id: string;
          id: string;
          instrument_id: string;
          parameters: Json | null;
          position: unknown;
          recorded_at: string;
        };
        Insert: {
          dataset_id: string;
          id?: string;
          instrument_id: string;
          parameters?: Json | null;
          position?: unknown;
          recorded_at: string;
        };
        Update: {
          dataset_id?: string;
          id?: string;
          instrument_id?: string;
          parameters?: Json | null;
          position?: unknown;
          recorded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'measures_dataset_id_fkey';
            columns: ['dataset_id'];
            isOneToOne: false;
            referencedRelation: 'datasets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'measures_instrument_id_fkey';
            columns: ['instrument_id'];
            isOneToOne: false;
            referencedRelation: 'instruments';
            referencedColumns: ['id'];
          },
        ];
      };
      models: {
        Row: {
          code: string;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      station_has_campaigns: {
        Row: {
          campaign_id: string;
          enroll_at: string | null;
          station_id: string;
        };
        Insert: {
          campaign_id: string;
          enroll_at?: string | null;
          station_id: string;
        };
        Update: {
          campaign_id?: string;
          enroll_at?: string | null;
          station_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'station_has_campaigns_campaign_id_fkey';
            columns: ['campaign_id'];
            isOneToOne: false;
            referencedRelation: 'campaigns';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'station_has_campaigns_station_id_fkey';
            columns: ['station_id'];
            isOneToOne: false;
            referencedRelation: 'stations';
            referencedColumns: ['id'];
          },
        ];
      };
      station_has_instruments: {
        Row: {
          assigned_at: string | null;
          instrument_id: string;
          station_id: string;
          unassigned_at: string | null;
        };
        Insert: {
          assigned_at?: string | null;
          instrument_id: string;
          station_id: string;
          unassigned_at?: string | null;
        };
        Update: {
          assigned_at?: string | null;
          instrument_id?: string;
          station_id?: string;
          unassigned_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'station_has_instruments_instrument_id_fkey';
            columns: ['instrument_id'];
            isOneToOne: false;
            referencedRelation: 'instruments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'station_has_instruments_station_id_fkey';
            columns: ['station_id'];
            isOneToOne: false;
            referencedRelation: 'stations';
            referencedColumns: ['id'];
          },
        ];
      };
      station_has_programs: {
        Row: {
          enroll_at: string | null;
          program_id: string;
          station_id: string;
        };
        Insert: {
          enroll_at?: string | null;
          program_id: string;
          station_id: string;
        };
        Update: {
          enroll_at?: string | null;
          program_id?: string;
          station_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'station_has_programs_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'programs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'station_has_programs_station_id_fkey';
            columns: ['station_id'];
            isOneToOne: false;
            referencedRelation: 'stations';
            referencedColumns: ['id'];
          },
        ];
      };
      stations: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          is_mobile: boolean;
          name: string;
          position: unknown;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          is_mobile?: boolean;
          name: string;
          position?: unknown;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          is_mobile?: boolean;
          name?: string;
          position?: unknown;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_station_last_position: {
        Args: { station_id: string };
        Returns: string;
      };
      get_station_measure_parameter_list: {
        Args: { station_id: string };
        Returns: string[];
      };
      get_stations_geojson: { Args: never; Returns: Json };
      get_stations_with_public_data: {
        Args: never;
        Returns: {
          campaign_ids: string[];
          description: string;
          id: string;
          is_mobile: boolean;
          lat: number;
          long: number;
          name: string;
          program_ids: string[];
        }[];
      };
      mvt_measures: {
        Args: { instrument_id: string; x: number; y: number; z: number };
        Returns: string;
      };
    };
    Enums: {
      processing_status: 'pending' | 'processing' | 'completed' | 'failed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      processing_status: ['pending', 'processing', 'completed', 'failed'],
    },
  },
} as const;
