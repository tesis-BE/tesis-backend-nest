import type { DeepPartial } from 'typeorm';
import type { File } from '../../../modules/file/entities/file.entity';

export const FILES_SEED_DATA: DeepPartial<File>[] = [
  {
    filename: 'docuemnto de satisfaccion',
    url: 'https://example.com/uploads/documento-satisfaccion.pdf',
    isActive: true,
  },
  {
    filename: 'encuesta de empleo',
    url: 'https://example.com/uploads/documento-empleo.pdf',
    isActive: true,
  },
];
