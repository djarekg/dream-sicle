import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  Genders,
  SearchResultTypes,
  type Gender,
  type SearchResult,
  type SearchResultParams,
  type SearchResultType,
  type UserDto,
} from '../src/index.ts';

describe('SearchResultTypes', () => {
  it('exposes the expected stable numeric identifiers', () => {
    expect(SearchResultTypes).toEqual({
      user: 1,
      customer: 2,
      customerContact: 3,
      product: 4,
    });
  });

  it('accepts only the supported numeric search result identifiers', () => {
    expectTypeOf<SearchResultType>().toEqualTypeOf<1 | 2 | 3 | 4>();
  });
});

describe('Genders', () => {
  it('exposes the expected stable gender values', () => {
    expect(Genders).toEqual(['MALE', 'FEMALE', 'PERFERNOTTOSAY']);
  });

  it('accepts only the supported gender values', () => {
    expectTypeOf<Gender>().toEqualTypeOf<
      'MALE' | 'FEMALE' | 'PERFERNOTTOSAY'
    >();
  });
});

describe('contract payload shapes', () => {
  it('defines a JSON-safe user dto shape', () => {
    const user: UserDto = {
      id: 'user-1',
      firstName: 'Dustin',
      lastName: 'Griffith',
      gender: 'MALE',
      email: 'dustin@example.com',
      streetAddress: '123 Main St',
      streetAddress2: null,
      city: 'Nashville',
      stateId: 'tn',
      zip: '37201',
      phone: '555-0100',
      jobTitle: 'Engineer',
      imageId: 7,
      isActive: true,
      dateCreated: '2026-03-23T10:00:00.000Z',
      dateUpdated: null,
    };

    expect(user.dateCreated).toBeTypeOf('string');
    expect(user.dateUpdated).toBeNull();
  });

  it('defines the expected search request payload shape', () => {
    const params: SearchResultParams = {
      query: 'dustin',
      highlightStartTag: '<pi>',
      highlightEndTag: '</pi>',
    };

    expect(params.query).toBe('dustin');
    expect(params.highlightStartTag).toBe('<pi>');
    expect(params.highlightEndTag).toBe('</pi>');
  });

  it('defines the expected search response payload shape', () => {
    const result: SearchResult = {
      type: SearchResultTypes.user,
      rank: -1.25,
      json: '{"id":"user-1"}',
    };

    expect(result.type).toBe(SearchResultTypes.user);
    expect(result.rank).toBe(-1.25);
    expect(JSON.parse(result.json)).toEqual({ id: 'user-1' });
  });
});
