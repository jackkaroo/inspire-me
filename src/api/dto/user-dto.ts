export {Prisma} from '@prisma/client';
import {UserRole} from '@prisma/client';

export type UserDto = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarId: number | null;
};
