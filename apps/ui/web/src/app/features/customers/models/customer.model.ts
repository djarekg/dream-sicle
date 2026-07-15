/**
 * Client-safe customer shape returned by the API.
 *
 * Date values are represented as ISO-8601 strings because API responses are JSON.
 */
export type CustomerDto = {
  id: string;
  name: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  stateId: string;
  zip: string;
  phone: string;
  isActive: boolean;
  dateCreated: string;
  dateUpdated?: string;
};
