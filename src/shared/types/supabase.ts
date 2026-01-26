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
      dataset_files: {
        Row: {
          dataset_id: string;
          extension: string;
          id: string;
          instrument_id: string;
          name: string;
          path: string;
          processed: boolean | null;
          processed_at: string | null;
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
          processed?: boolean | null;
          processed_at?: string | null;
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
          processed?: boolean | null;
          processed_at?: string | null;
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
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          end_at: string;
          id: string;
          start_at: string;
          station_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at: string;
          id?: string;
          start_at: string;
          station_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at?: string;
          id?: string;
          start_at?: string;
          station_id?: string;
          updated_at?: string;
        };
        Relationships: [
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
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
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
    Enums: {},
  },
} as const;
