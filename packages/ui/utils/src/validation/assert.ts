import { isEmpty, isNullOrUndefined } from '../index';

/**
 * Throws an error if the provided value is empty.
 *
 * @param {unknown} value - The value to check.
 * @param {string} message - The error message to throw if the value is empty.
 * @throws {Error} Throws an error if the value is empty.
 * @asserts value is T - Asserts that the value is of type T if it is not empty.
 */
export function isNotEmpty<T>(
  value: T | null | undefined,
  message: string,
  ...args: unknown[]
): asserts value is T {
  if (isEmpty(value)) {
    console.error('assertIsNotEmpty', ...args);
    throw new Error(message, { cause: { code: 'IsEmpty' } });
  }
}

/**
 * Throws an error if the provided value is null or undefined.
 *
 * @param {unknown} value - The value to check.
 * @param {string} message - The error message to throw if the value is null or undefined.
 * @throws {Error} Throws an error if the value is null or undefined.
 * @asserts value is T - Asserts that the value is of type T if it is not null or undefined.
 */
export function isNotNull<T>(
  value: T | null | undefined,
  message: string,
  ...args: unknown[]
): asserts value is T {
  if (isNullOrUndefined(value)) {
    console.error('assertIsNotNull', ...args);
    throw new Error(message, { cause: { code: 'IsNull' } });
  }
}

/**
 * Ensures exhaustive handling of discriminated unions by throwing for unknown values.
 *
 * @param value The value that should be impossible to reach.
 * @returns Never returns; always throws.
 */
export function never(value: never): never {
  throw new Error(`Unhandled type: ${value}`);
}
