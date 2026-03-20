import type { DataProvider } from '@refinedev/core';
import { createClient } from '@refinedev/supabase';

const supabaseClient = createClient(
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

const addRpcToDataProvider = (supabaseProvider: DataProvider): DataProvider => {
  return {
    ...supabaseProvider,
    custom: async ({ url, query }) => {
      if (!url.startsWith('rpc/')) {
        throw new Error(
          'Custom method is only supported for Supabase RPC calls.',
        );
      }

      const rpcName = url.replace('rpc/', '');
      const response = await supabaseClient.rpc(rpcName, query);

      console.log('RPC Response:', response);

      return response.data;
    },
  };
};

export { addRpcToDataProvider, supabaseClient };
