import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';

import { supabaseClient as supabase } from '@/core/utils/supabase-client';

const base64ToArrayBuffer = (base64: string) => {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const useSupabaseMVT = () => {
  useEffect(() => {
    maplibregl.addProtocol('supabase', async (params) => {
      const re = new RegExp(
        /^supabase:\/\/([^/]+)\/(\d+)\/(\d+)\/(\d+)(?:\/([^/]+))?$/,
      );
      const result = params.url.match(re);
      if (!result) {
        throw new Error('Invalid MVT URL format');
      }

      const { data, error } = await supabase.rpc(`mvt_${result[1]}`, {
        z: result[2],
        x: result[3],
        y: result[4],
        ...(result[5] ? { instrument_id: result[5] } : {}),
      });

      const encoded = base64ToArrayBuffer(data);

      if (!error) {
        return { data: encoded };
      } else {
        throw new Error(`Tile fetch error: ${error.message}`);
      }
    });

    return () => {
      maplibregl.removeProtocol('supabase');
    };
  }, []);
};

export { useSupabaseMVT };
