import { type BaseRecord, useCustom } from '@refinedev/core';

interface UseSupabaseRpcProps {
  name: string;
  params: Record<string, unknown>;
}

const useSupabaseRpc = <T extends BaseRecord>({
  name,
  params,
}: UseSupabaseRpcProps) => {
  const query = useCustom<T>({
    url: `rpc/${name}`,
    method: 'get',
    config: {
      query: params,
    },
  });

  return query;
};

export { useSupabaseRpc };
