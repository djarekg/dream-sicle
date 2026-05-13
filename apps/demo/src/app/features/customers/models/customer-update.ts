import type { CustomerDto } from '@dream-sicle/contracts';

export type CustomerUpdateModel = Pick<
  CustomerDto,
  | 'id'
  | 'name'
  | 'streetAddress'
  | 'streetAddress2'
  | 'city'
  | 'stateId'
  | 'zip'
  | 'phone'
  | 'isActive'
>;
