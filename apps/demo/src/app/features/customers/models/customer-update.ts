import type { CustomerDto } from '@ds/contracts';

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
