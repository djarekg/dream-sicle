import { describe, expect, it, vi } from 'vitest';

import {
  assertIsNotEmpty,
  assertIsNotNull,
  format,
  formatDate,
  isEmpty,
  isNotEmpty,
  isNotNullOrUndefined,
  isNullOrEmpty,
  isNullOrUndefined,
  randomInRange,
} from '../src/index.ts';

describe('formatDate()', () => {
  it('formats date values as YYYY-MM-DD', () => {
    const date = new Date(2026, 2, 9);

    expect(formatDate(date)).toBe('2026-03-09');
  });
});

describe('randomInRange()', () => {
  it('returns a value in the provided inclusive range', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

    const value = randomInRange(3, 7);

    expect(value).toBe(3);
    randomSpy.mockRestore();
  });

  it('returns the max value when random() is close to 1', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    const value = randomInRange(3, 7);

    expect(value).toBe(7);
    randomSpy.mockRestore();
  });

  it('throws when min is greater than max', () => {
    expect(() => randomInRange(8, 7)).toThrowError(
      'Min value cannot be greater than max value.',
    );
  });
});

describe('object utilities', () => {
  it('isNullOrUndefined() returns true for null and undefined', () => {
    expect(isNullOrUndefined(null)).toBe(true);
    expect(isNullOrUndefined(undefined)).toBe(true);
    expect(isNullOrUndefined('value')).toBe(false);
  });

  it('isNotNullOrUndefined() returns inverse nullish state', () => {
    expect(isNotNullOrUndefined(null)).toBe(false);
    expect(isNotNullOrUndefined(undefined)).toBe(false);
    expect(isNotNullOrUndefined(0)).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
  });

  it('isEmpty() handles nullish, strings, arrays, objects, and primitives', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('test')).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ id: 1 })).toBe(false);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(true)).toBe(false);
  });

  it('isNotEmpty() returns inverse empty state', () => {
    expect(isNotEmpty('value')).toBe(true);
    expect(isNotEmpty([1])).toBe(true);
    expect(isNotEmpty({ id: 1 })).toBe(true);
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty([])).toBe(false);
    expect(isNotEmpty({})).toBe(false);
    expect(isNotEmpty(0)).toBe(false);
  });
});

describe('string utilities', () => {
  it('isNullOrEmpty() treats nullish and whitespace-only strings as empty', () => {
    expect(isNullOrEmpty(null)).toBe(true);
    expect(isNullOrEmpty(undefined)).toBe(true);
    expect(isNullOrEmpty('')).toBe(true);
    expect(isNullOrEmpty('   ')).toBe(true);
    expect(isNullOrEmpty('text')).toBe(false);
  });

  it('format() replaces all indexed placeholders', () => {
    const formatted = format(
      'Hello {0}, welcome to {1}. {0}!',
      'Dustin',
      'dream-sicle',
    );

    expect(formatted).toBe('Hello Dustin, welcome to dream-sicle. Dustin!');
  });

  it('format() keeps unmatched placeholders as-is', () => {
    const formatted = format('Value: {0}, Missing: {1}', 'A');

    expect(formatted).toBe('Value: A, Missing: {1}');
  });
});

describe('validation assertions', () => {
  it('assertIsNotEmpty() does not throw for non-empty values', () => {
    expect(() => assertIsNotEmpty('value', 'should not throw')).not.toThrow();
    expect(() => assertIsNotEmpty([1], 'should not throw')).not.toThrow();
  });

  it('assertIsNotEmpty() throws with IsEmpty cause for empty values', () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    try {
      assertIsNotEmpty('', 'empty value');
      throw new Error('Expected assertIsNotEmpty to throw.');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('empty value');
      expect((error as Error & { cause?: { code?: string } }).cause?.code).toBe(
        'IsEmpty',
      );
    }

    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });

  it('assertIsNotNull() does not throw for non-null values', () => {
    expect(() => assertIsNotNull('value', 'should not throw')).not.toThrow();
    expect(() => assertIsNotNull(0, 'should not throw')).not.toThrow();
  });

  it('assertIsNotNull() throws with IsNull cause for null values', () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    try {
      assertIsNotNull(null, 'null value');
      throw new Error('Expected assertIsNotNull to throw.');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('null value');
      expect((error as Error & { cause?: { code?: string } }).cause?.code).toBe(
        'IsNull',
      );
    }

    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });
});
