import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import restaurantData from '../../data/restaurantdummies.json';

function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);

    // Filter the restaurant data based on the search text
    if (text.trim() === '') { // Check if the search bar is empty
        setSuggestions([]); // Clear the suggestions
        console.log("empty")
        
      } else {
        // Filter the restaurant data based on the search text
        const filteredRestaurants = restaurantData.filter(
          (restaurant) =>
            restaurant.restaurant_name.toLowerCase().includes(text.toLowerCase())
        );

    // Get an array of suggestion strings
    const suggestionStrings = filteredRestaurants.map(
      (restaurant) => restaurant.restaurant_name
    );

    setSuggestions(suggestionStrings);
  };
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a restaurant"
        onChangeText={handleSearch}
        value={searchText}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionContainer}>
          {suggestions.map((suggestion) => (
            <Text style={styles.suggestionItem} key={suggestion}>
              {suggestion}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchBar: {
    position:"absolute",
    top: 0,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  suggestionContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 150,
    overflow: 'scroll',
  },
  suggestionItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default SearchScreen;
