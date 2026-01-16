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

export type Dataset = Tables<'datasets'>;
export type InsertDataset = TablesInsert<'datasets'>;
export type UpdateDataset = TablesUpdate<'datasets'>;

export type Model = Tables<'models'>;
export type InsertModel = TablesInsert<'models'>;
export type UpdateModel = TablesUpdate<'models'>;
