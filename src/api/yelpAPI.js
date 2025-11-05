import axios from 'axios';
import {YELP_API_KEY} from '@env';

/**
 * Yelp Fusion API Base URL
 * Documentation: https://www.yelp.com/developers/documentation/v3
 */
const YELP_API_BASE_URL = 'https://api.yelp.com/v3';

/**
 * Search for restaurants based on a query (food type or location)
 * 
 * @param {string} searchQuery - The search term (e.g., "pizza", "Chinese food")
 * @param {string} location - The location to search in (e.g., "New York", "90210")
 * @param {number} limit - Number of results to return (default: 20)
 * @returns {Promise<Array>} - Array of restaurant objects
 */
export const searchRestaurants = async (searchQuery, location, limit = 20) => {
  try {
    const response = await axios.get(`${YELP_API_BASE_URL}/businesses/search`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: searchQuery,
        location: location,
        limit: limit,
        sort_by: 'rating', // Sort by highest rated
      },
    });

    // Transform the Yelp data to our app's format
    return response.data.businesses.map(business => ({
      id: business.id,
      name: business.name,
      image: business.image_url,
      rating: business.rating,
      reviewCount: business.review_count,
      price: business.price || 'N/A',
      phone: business.phone,
      address: formatAddress(business.location),
      coordinates: {
        latitude: business.coordinates.latitude,
        longitude: business.coordinates.longitude,
      },
      categories: business.categories.map(cat => cat.title),
      distance: business.distance ? (business.distance / 1609.34).toFixed(2) : null, // Convert meters to miles
      isClosed: business.is_closed,
      url: business.url,
    }));
  } catch (error) {
    console.error('Error fetching restaurants from Yelp:', error.response?.data || error.message);
    throw new Error('Failed to fetch restaurants. Please check your API key and try again.');
  }
};

/**
 * Get detailed information about a specific restaurant
 * 
 * @param {string} businessId - The Yelp business ID
 * @returns {Promise<Object>} - Detailed restaurant object
 */
export const getRestaurantDetails = async (businessId) => {
  try {
    const response = await axios.get(`${YELP_API_BASE_URL}/businesses/${businessId}`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });

    const business = response.data;

    return {
      id: business.id,
      name: business.name,
      image: business.image_url,
      photos: business.photos || [],
      rating: business.rating,
      reviewCount: business.review_count,
      price: business.price || 'N/A',
      phone: business.display_phone,
      address: formatAddress(business.location),
      coordinates: {
        latitude: business.coordinates.latitude,
        longitude: business.coordinates.longitude,
      },
      categories: business.categories.map(cat => cat.title),
      hours: business.hours?.[0]?.is_open_now ? 'Open Now' : 'Closed',
      isClosed: business.is_closed,
      url: business.url,
      // Additional details
      transactions: business.transactions || [], // e.g., ["delivery", "pickup"]
      specialties: business.categories.map(cat => cat.title).join(', '),
      reservations: business.transactions.includes('restaurant_reservation'),
      delivery: business.transactions.includes('delivery'),
      pickup: business.transactions.includes('pickup'),
    };
  } catch (error) {
    console.error('Error fetching restaurant details:', error.response?.data || error.message);
    throw new Error('Failed to fetch restaurant details.');
  }
};

/**
 * Format Yelp location object into a readable address string
 * 
 * @param {Object} location - Yelp location object
 * @returns {string} - Formatted address
 */
const formatAddress = (location) => {
  const address1 = location.address1 || '';
  const city = location.city || '';
  const state = location.state || '';
  const zipCode = location.zip_code || '';
  
  return `${address1}, ${city}, ${state} ${zipCode}`.trim();
};

/**
 * Search restaurants by category (e.g., "chinese", "italian", "vegan")
 * 
 * @param {string} category - Food category
 * @param {string} location - Location to search
 * @returns {Promise<Array>} - Array of restaurant objects
 */
export const searchByCategory = async (category, location) => {
  return searchRestaurants(category, location);
};
