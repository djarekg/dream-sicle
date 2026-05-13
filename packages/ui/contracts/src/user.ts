import type { Gender } from "./gender.ts";

/**
 * Client-safe user shape returned by the API.
 *
 * Date values are represented as ISO-8601 strings because API responses are JSON.
 */
export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  stateId: string;
  zip: string;
  phone: string;
  jobTitle: string;
  imageId: number;
  isActive: boolean;
  dateCreated: string;
  dateUpdated: string;
};
