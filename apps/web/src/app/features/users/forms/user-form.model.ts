import type { UserDto } from '@dream-sicle/contracts';

export type UserFormModel = Omit<UserDto, 'dateCreated'>;
