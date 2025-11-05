import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * SearchBar Component
 * 
 * A reusable search bar with two input fields:
 * - Food type/category (e.g., "pizza", "Chinese", "vegan")
 * - Location/area (e.g., "New York", "Los Angeles")
 * 
 * Props:
 * @param {Function} onSearch - Callback function when search button is pressed
 * @param {boolean} loading - Whether the search is in progress
 */
const SearchBar = ({onSearch, loading = false}) => {
  const [foodQuery, setFoodQuery] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSearch = () => {
    // Validate inputs
    if (!foodQuery.trim() && !location.trim()) {
      alert('Please enter a food type or location');
      return;
    }

    // Call the parent's search handler
    onSearch({
      foodQuery: foodQuery.trim(),
      location: location.trim() || 'New York', // Default to New York if no location
    });
  };

  return (
    <View style={styles.container}>
      {/* Food Type Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Food type (e.g., pizza, Chinese)"
          placeholderTextColor="#999"
          value={foodQuery}
          onChangeText={setFoodQuery}
          editable={!loading}
          returnKeyType="next"
        />
      </View>

      {/* Location Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location (e.g., New York, 90210)"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
          editable={!loading}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity
        style={[styles.searchButton, loading && styles.searchButtonDisabled]}
        onPress={handleSearch}
        disabled={loading}
        activeOpacity={0.7}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.searchButtonText}>Search</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
