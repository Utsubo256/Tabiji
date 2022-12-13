import { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  introduction: string;
} & BaseEntity;
