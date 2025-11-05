import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

/**
 * RestaurantCard Component
 * 
 * Displays a restaurant's basic information in a card format
 * 
 * Props:
 * @param {Object} restaurant - Restaurant data object
 * @param {Function} onPress - Callback when card is tapped
 */
const RestaurantCard = ({restaurant, onPress}) => {
  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join(' ');
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.8}>
      {/* Restaurant Image */}
      {restaurant.image ? (
        <Image
          source={{uri: restaurant.image}}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>

        {/* Rating and Review Count */}
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(restaurant.rating)}</Text>
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Text style={styles.reviewCount}>
            ({restaurant.reviewCount} reviews)
          </Text>
        </View>

        {/* Categories */}
        <Text style={styles.categories} numberOfLines={1}>
          {restaurant.categories?.join(' • ')}
        </Text>

        {/* Address */}
        <Text style={styles.address} numberOfLines={2}>
          📍 {restaurant.address}
        </Text>

        {/* Price and Distance */}
        <View style={styles.footer}>
          <Text style={styles.price}>{restaurant.price}</Text>
          {restaurant.distance && (
            <Text style={styles.distance}>{restaurant.distance} mi away</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 16,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stars: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  categories: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  address: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  distance: {
    fontSize: 13,
    color: '#999',
  },
});

export default RestaurantCard;
