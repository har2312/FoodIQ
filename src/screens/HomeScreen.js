import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import {searchRestaurants} from '../api';

/**
 * HomeScreen Component
 * 
 * Main screen of the app where users can:
 * - Search for restaurants by food type and location
 * - View search results in a scrollable list
 * - Tap on a restaurant to view details
 */
const HomeScreen = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Handle search functionality
   * Fetches restaurants from Yelp API based on user input
   */
  const handleSearch = async ({foodQuery, location}) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
  // Step 1 uses mocked data from src/api/index.js
  const results = await searchRestaurants(foodQuery, location, 20);
      setRestaurants(results);

      if (results.length === 0) {
        setError('No restaurants found. Try a different search.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to restaurant details screen
   */
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Details', {restaurant});
  };

  /**
   * Render empty state when no results
   */
  const renderEmptyState = () => {
    if (loading) return null;

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>😕</Text>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      );
    }

    if (!hasSearched) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyTitle}>Welcome to FoodIQ!</Text>
          <Text style={styles.emptyText}>
            Search for your favorite food or cuisine to discover amazing
            restaurants near you
          </Text>
        </View>
      );
    }

    return null;
  };

  /**
   * Render loading indicator
   */
  const renderLoader = () => {
    if (!loading) return null;

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loaderText}>Finding restaurants...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FoodIQ</Text>
        <Text style={styles.headerSubtitle}>Smart Food Discovery</Text>
      </View>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Results List */}
      {loading ? (
        renderLoader()
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <RestaurantCard
              restaurant={item}
              onPress={handleRestaurantPress}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;
