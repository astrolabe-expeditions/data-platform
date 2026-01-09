import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/shared/types/supabase';

export type Instrument = Tables<'instruments'>;
export type InsertInstrument = TablesInsert<'instruments'>;
export type UpdateInstrument = TablesUpdate<'instruments'>;

export type Station = Tables<'stations'>;
export type InsertStation = TablesInsert<'stations'>;
export type UpdateStation = TablesUpdate<'stations'>;
