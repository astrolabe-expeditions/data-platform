export type FileStatus = 'pending' | 'uploading' | 'done' | 'error';

export interface UploadFile {
  file: File;
  instrument: { id: string; serial_number: string } | null;
  date: string | null;
  time: string | null;
  status: FileStatus;
  error?: string;
}
