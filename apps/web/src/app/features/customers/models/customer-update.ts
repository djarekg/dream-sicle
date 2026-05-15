import type { CustomerDto } from './customer.model';

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
