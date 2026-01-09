import { createClient } from '@refinedev/supabase';

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    db: {
      schema: 'public', // this can be overridden by passing `meta.schema` to data hooks.
    },
    auth: {
      persistSession: true,
    },
  },
);
