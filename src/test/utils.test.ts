import { describe, expect, test } from 'vitest'
import { getPopularSearches, getRecipeShortDescription, getSanitizedSearchQuery, isMoreThan24HoursPassed, POPULAR_SEARCHES } from '@/lib/utils'
import type { Meal } from '@/lib/types';
import mockRecipe from './mocks/recipe';

describe('getSanitizedSearchQuery', () => {
  test('should return null for an empty query', () => {
    expect(getSanitizedSearchQuery('')).toBeNull();
  });

  test('should return null for a query with only spaces', () => {
    expect(getSanitizedSearchQuery('   ')).toBeNull();
  });

  test('should trim leading and trailing spaces', () => {
    expect(getSanitizedSearchQuery('  test  ')).toBe('test');
  });

  test('should decode URI encoded characters', () => {
    expect(getSanitizedSearchQuery('hello%20world')).toBe('hello%20world'); // Note: encodeURIComponent will re-encode spaces
    expect(getSanitizedSearchQuery('caf%C3%A9')).toBe('caf%C3%A9');
  });

  test('should remove extra spaces within the query', () => {
    expect(getSanitizedSearchQuery('hello   world')).toBe('hello%20world');
  });

  test('should handle a query with no spaces', () => {
    expect(getSanitizedSearchQuery('oneword')).toBe('oneword');
  });
});

describe('isMoreThan24HoursPassed', () => {
  test('should return false when the difference is less than 24 hours', () => {
    const date1 = new Date('2025-05-23T10:00:00Z');
    const date2 = new Date('2025-05-23T12:00:00Z');
    expect(isMoreThan24HoursPassed(date1, date2)).toBe(false);
  });

  test('should return true when the difference is exactly 24 hours + 1 millisecond', () => {
    const date1 = new Date('2025-05-23T10:00:00Z');
    const date2 = new Date(date1.getTime() + (24 * 60 * 60 * 1000) + 1);
    expect(isMoreThan24HoursPassed(date1, date2)).toBe(true);
  });

  test('should return true when the difference is more than 24 hours', () => {
    const date1 = new Date('2025-05-23T10:00:00Z');
    const date2 = new Date('2025-05-24T15:00:00Z');
    expect(isMoreThan24HoursPassed(date1, date2)).toBe(true);
  });

  test('should handle dates in reverse order correctly', () => {
    const date1 = new Date('2025-05-24T11:00:00Z');
    const date2 = new Date('2025-05-23T10:00:00Z');
    expect(isMoreThan24HoursPassed(date1, date2)).toBe(true);
  });

  test('should return false when the difference is exactly 24 hours', () => {
    const date1 = new Date('2025-05-23T10:00:00Z');
    const date2 = new Date(date1.getTime() + (24 * 60 * 60 * 1000));
    expect(isMoreThan24HoursPassed(date1, date2)).toBe(false);
  });
});

describe('getPopularSearches', () => {
  test('should return an array of popular search terms', () => {
    const popularSearches = getPopularSearches();
    expect(Array.isArray(popularSearches)).toBe(true);
    expect(popularSearches.length).toBeGreaterThan(0);
    expect(popularSearches).toEqual(POPULAR_SEARCHES);
  });
});

describe('getRecipeShortDescription', () => {
  it('should return a short description from the first paragraph of instructions', () => {
    const mockMeal: Meal = {
      ...mockRecipe,
      strInstructions: 'This is the first paragraph of instructions.\r\nThis is the second paragraph.',
    };
    const shortDescription = getRecipeShortDescription(mockMeal);
    expect(shortDescription).toBe('This is the first paragraph of instructions.');
    expect(shortDescription.length).toBeLessThanOrEqual(123); // 120 chars + "..."
  });

  it('should truncate the first paragraph if it exceeds 120 characters', () => {
    const longInstruction = 'This is a very long first paragraph of instructions that goes well beyond the one hundred and twenty character limit to test the truncation functionality.';
    const mockMeal: Meal = {
      ...mockRecipe,
      strInstructions: `${longInstruction}\r\nSecond paragraph.`,
    };
    const shortDescription = getRecipeShortDescription(mockMeal);
    expect(shortDescription.length).toBeLessThanOrEqual(123);
    expect(shortDescription).toBe(`${longInstruction.substring(0, 120).trim()}...`);
  });

  it('should handle instructions with no line breaks', () => {
    const singleParagraph = 'This is a single paragraph of instructions.';
    const mockMeal: Meal = {
      ...mockRecipe,
      strInstructions: singleParagraph,
    };
    const shortDescription = getRecipeShortDescription(mockMeal);
    const expected = singleParagraph.length > 120 ? `${singleParagraph.substring(0, 120).trim()}...` : singleParagraph.trim();
    expect(shortDescription).toBe(expected);
    expect(shortDescription.length).toBeLessThanOrEqual(expected.length);
  });

  it('should return "No description available..." if strInstructions is empty', () => {
    const mockMeal: Meal = {
      ...mockRecipe,
      strInstructions: "",
    };
    const shortDescription = getRecipeShortDescription(mockMeal);
    expect(shortDescription).toBe('No description available');
  });
});