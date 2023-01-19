import { BaseEntity } from '@/types';

export type User = {
  name: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
} & BaseEntity;
