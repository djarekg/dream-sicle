import type { UserDto } from '@ds/contracts';

export type UserFormModel = Omit<UserDto, 'dateCreated'>;
