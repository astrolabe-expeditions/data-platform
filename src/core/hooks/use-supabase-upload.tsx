import { supabaseClient as supabase } from '@/core/utils/supabase-client.ts';

interface UseSupabaseUploadProps {
  bucket: string;
}

interface UseSupabaseUploadReturn {
  upload: (file: File, path: string) => Promise<void>;
}

const useSupabaseUpload = ({
  bucket
}: UseSupabaseUploadProps): UseSupabaseUploadReturn => {

  const upload = async (file: File, path: string) => {
    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          upsert: false,
          contentType: file.type,
        });

    if (uploadError) {
      throw uploadError;
    }
  };

  return { upload };
};

export { useSupabaseUpload };
