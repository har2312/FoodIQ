import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {getRestaurantDetails} from '../api';

/**
 * DetailsScreen Component
 * 
 * Displays detailed information about a selected restaurant:
 * - Restaurant name, image, and rating
 * - Full address and phone number
 * - Price range and cuisines
 * - Availability of seating, reservations, delivery
 * - Link to Yelp page
 */
const DetailsScreen = ({route, navigation}) => {
  const {restaurant: initialRestaurant} = route.params;
  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch detailed restaurant information when screen loads
   */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getRestaurantDetails(initialRestaurant.id);
        setRestaurant(details);
      } catch (err) {
        setError(err.message);
        // If fetch fails, use the initial restaurant data
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [initialRestaurant.id]);

  /**
   * Open phone dialer
   */
  const handleCallPress = () => {
    if (restaurant.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  /**
   * Open Yelp page in browser
   */
  const handleViewOnYelp = () => {
    if (restaurant.url) {
      Linking.openURL(restaurant.url);
    }
  };

  /**
   * Render star rating
   */
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      <ScrollView style={styles.scrollView}>
        {/* Restaurant Image */}
        {restaurant.image ? (
          <Image
            source={{uri: restaurant.image}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text style={styles.noImageText}>No Image Available</Text>
          </View>
        )}

        {/* Main Content */}
        <View style={styles.content}>
          {/* Restaurant Name */}
          <Text style={styles.name}>{restaurant.name}</Text>

          {/* Rating and Reviews */}
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{renderStars(restaurant.rating)}</Text>
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.reviewCount}>
              ({restaurant.reviewCount} reviews)
            </Text>
          </View>

          {/* Price and Categories */}
          <View style={styles.tagsContainer}>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{restaurant.price}</Text>
            </View>
            <Text style={styles.categories}>{restaurant.categories?.join(' • ')}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Contact Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Location</Text>
            <Text style={styles.address}>{restaurant.address}</Text>
          </View>

          {restaurant.phone && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📞 Phone</Text>
              <TouchableOpacity onPress={handleCallPress}>
                <Text style={styles.phone}>{restaurant.phone}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Hours */}
          {restaurant.hours && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🕒 Hours</Text>
              <Text style={styles.infoText}>{restaurant.hours}</Text>
            </View>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🍽️ Services & Features</Text>
            
            <View style={styles.featuresContainer}>
              {restaurant.delivery && (
                <View style={styles.featureBadge}>
                  <Text style={styles.featureText}>🚚 Delivery</Text>
                </View>
              )}
              {restaurant.pickup && (
                <View style={styles.featureBadge}>
                  <Text style={styles.featureText}>🥡 Pickup</Text>
                </View>
              )}
              {restaurant.reservations && (
                <View style={styles.featureBadge}>
                  <Text style={styles.featureText}>📅 Reservations</Text>
                </View>
              )}
            </View>

            {!restaurant.delivery && !restaurant.pickup && !restaurant.reservations && (
              <Text style={styles.infoText}>
                Contact restaurant for service details
              </Text>
            )}
          </View>

          {/* Specialties */}
          {restaurant.specialties && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✨ Famous For</Text>
              <Text style={styles.infoText}>{restaurant.specialties}</Text>
            </View>
          )}

          {/* View on Yelp Button */}
          <TouchableOpacity
            style={styles.yelpButton}
            onPress={handleViewOnYelp}
            activeOpacity={0.8}>
            <Text style={styles.yelpButtonText}>View on Yelp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#e0e0e0',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    fontSize: 16,
    marginRight: 6,
  },
  rating: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B6B',
    marginRight: 6,
  },
  reviewCount: {
    fontSize: 16,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  priceText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  categories: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  phone: {
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFB74D',
  },
  featureText: {
    fontSize: 14,
    color: '#F57C00',
    fontWeight: '600',
  },
  yelpButton: {
    backgroundColor: '#D32323',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  yelpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default DetailsScreen;
