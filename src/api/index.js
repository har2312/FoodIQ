// src/api/index.js
// Step 1: Provide a unified API surface that returns mock Yelp-like data.
// Later, this module can switch to real providers (Yelp/Google/Foursquare/Zomato).

import {MOCK_RESTAURANTS} from './mockData';

// Simulate network delay
const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

/**
 * Search restaurants (mocked)
 * @param {string} searchQuery - e.g., "pizza", "vegan", "chinese"
 * @param {string} location - e.g., "New York", "90210"
 * @param {number} limit - max results (default 20)
 * @returns {Promise<Array>}
 */
export const searchRestaurants = async (searchQuery = '', location = 'New York', limit = 20) => {
  await delay();
  const term = `${searchQuery} ${location}`.toLowerCase();

  const filtered = MOCK_RESTAURANTS.filter(r => {
    const inName = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const inCats = (r.categories || [])
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return !searchQuery ? true : inName || inCats;
  });

  return filtered.slice(0, limit);
};

/**
 * Get restaurant details by id (mocked)
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getRestaurantDetails = async (id) => {
  await delay(400);
  return MOCK_RESTAURANTS.find(r => r.id === id) || null;
};

export default {
  searchRestaurants,
  getRestaurantDetails,
};
