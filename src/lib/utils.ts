import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Meal } from './types';

export const POPULAR_SEARCHES = ["Pasta", "Chicken", "Fish", "Pie", "Cake"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes a search query string for use in URLs.
 * It trims the input, decodes URI components, removes extra spaces,
 * and then encodes the resulting string for URL safety.
 * Returns `null` if the input query is empty after trimming.
 *
 * @param {string} query - The raw search query string.
 * @returns {string | null} The sanitized and URL-encoded search query, or `null` if the input was empty.
 */
export function getSanitizedSearchQuery(query: string): string | null {
  const trimmedSearchTerm = query.trim();

  if (!trimmedSearchTerm) {
    return null;
  }

  const searchTerm = decodeURIComponent(trimmedSearchTerm);

  const searchTermNoSpaces = searchTerm.split(" ").filter(term => term !== "").join(" ");

  // Sanitize the search term for URL
  const sanitizedTerm = encodeURIComponent(searchTermNoSpaces)

  return sanitizedTerm;
}

/**
 * Checks if more than 24 hours have passed between two given dates.
 * The order of the dates does not matter, as the absolute difference is calculated.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} True if the absolute difference between the two dates is greater than 24 hours, otherwise false.
 *
 * @example
 * // Example 1: Less than 24 hours difference
 * const dateA = new Date('2025-05-20T10:00:00Z');
 * const dateB = new Date('2025-05-20T12:00:00Z');
 * console.log(isMoreThan24HoursPassed(dateA, dateB)); // Expected output: false
 *
 * @example
 * // Example 2: More than 24 hours difference
 * const dateC = new Date('2025-05-20T10:00:00Z');
 * const dateD = new Date('2025-05-21T11:00:00Z');
 * console.log(isMoreThan24HoursPassed(dateC, dateD)); // Expected output: true
 *
 * @example
 * // Example 3: Dates in reverse order
 * const dateE = new Date('2025-05-22T10:00:00Z');
 * const dateF = new Date('2025-05-20T09:00:00Z');
 * console.log(isMoreThan24HoursPassed(dateE, dateF)); // Expected output: true
 */
export function isMoreThan24HoursPassed(date1: Date, date2: Date): boolean {
  // Get the time difference in milliseconds
  const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

  // Convert 24 hours to milliseconds (1 hour = 60 minutes * 60 seconds * 1000 milliseconds)
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  return differenceInMilliseconds > twentyFourHoursInMilliseconds;
}

export function getPopularSearches(): string[] {
  return POPULAR_SEARCHES;
}

/**
 * Extracts a short description from a recipe's instructions.
 * It takes the first paragraph of the instructions, trims it,
 * and if it exceeds 120 characters, it truncates it and adds an ellipsis.
 * If no instructions are available, it returns "No description available".
 *
 * @param {Meal} meal - The meal object containing the recipe details, including `strInstructions`.
 * @returns {string} A short description of the recipe.
 */
export function getRecipeShortDescription(meal: Meal) {
  const description = meal.strInstructions || "No description available";

  let finalString = description.split("\r\n")[0];
  finalString = finalString.trim();
  if (finalString.length > 120) {
    finalString = finalString.substring(0, 120).trim().concat("...");
  }
  return finalString;
}