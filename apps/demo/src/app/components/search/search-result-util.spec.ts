import { SearchResultType } from '@ds/contracts';

import { HIGHLIGHT_END_TAG, HIGHLIGHT_START_TAG } from '@/core/constants';

import { deserializeResultJson, formatHighlightedText, formatText } from './search-result-util';

describe('search-result-util', () => {
  describe('deserializeResultJson', () => {
    it('deserializes user search result JSON into the expected shape', () => {
      const json = JSON.stringify({
        id: 'u1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@acme.test',
        jobTitle: 'Engineer',
      });

      const result = deserializeResultJson(SearchResultType.user, json);

      expect(result).toEqual({
        id: 'u1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@acme.test',
        jobTitle: 'Engineer',
      });
    });

    it('is pure and deterministic for the same input', () => {
      const json = JSON.stringify({ id: 'c1', name: 'Acme' });

      const first = deserializeResultJson(SearchResultType.customer, json);
      const second = deserializeResultJson(SearchResultType.customer, json);

      expect(first).toEqual(second);
    });

    it('throws for invalid JSON', () => {
      expect(() => deserializeResultJson(SearchResultType.product, '{invalid')).toThrow();
    });
  });

  describe('formatHighlightedText', () => {
    it('returns an empty string for nullish and empty input', () => {
      expect(formatHighlightedText(undefined)).toBe('');
      expect(formatHighlightedText(null)).toBe('');
      expect(formatHighlightedText('')).toBe('');
    });

    it('replaces highlight tags and text-node spaces, and trims the input', () => {
      const input = `  ${HIGHLIGHT_START_TAG}Jane${HIGHLIGHT_END_TAG} <span>Senior Dev</span>  `;

      const result = formatHighlightedText(input);

      expect(result).toBe('<mark>Jane</mark>&nbsp;<span>Senior&nbsp;Dev</span>');
    });

    it('is pure and deterministic for the same input', () => {
      const input = `${HIGHLIGHT_START_TAG}hello${HIGHLIGHT_END_TAG}`;

      expect(formatHighlightedText(input)).toBe('<mark>hello</mark>');
      expect(formatHighlightedText(input)).toBe('<mark>hello</mark>');
    });
  });

  describe('formatText', () => {
    it('returns an empty string for nullish and empty input', () => {
      expect(formatText(undefined)).toBe('');
      expect(formatText(null)).toBe('');
      expect(formatText('')).toBe('');
    });

    it('wraps non-empty text in a span', () => {
      expect(formatText('value')).toBe('<span>value</span>');
    });

    it('is pure and deterministic for the same input', () => {
      expect(formatText('same')).toBe('<span>same</span>');
      expect(formatText('same')).toBe('<span>same</span>');
    });
  });
});
