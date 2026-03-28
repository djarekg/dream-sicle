import { Role } from '@aui/api';

export type AuthCookie = {
  token: string;
  userId: string;
  role: Role;
};
