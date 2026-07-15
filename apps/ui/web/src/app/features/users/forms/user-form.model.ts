import type { UserDto } from '@/features/users/models/user.model';

export type UserFormModel = Omit<UserDto, 'dateCreated'>;
