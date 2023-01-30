import { BaseEntity } from '@/types';

export type User = {
  name: string;
  introduction: string | null;
} & BaseEntity;
