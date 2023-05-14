import React, {useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Touchable, TouchableOpacityBase} from 'react-native';
import SearchRestaurants from '../../api/searchRestaurants';
import { Searchbar } from '../../styles/searchbar';
import { Colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Entypo';
import RenderStars from './renderstars';
import { useNavigation } from '@react-navigation/native';
import DistanceLocation from './distanceLocation';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState({})

  const navigation = useNavigation();
  useEffect(() => {
    const fetchResults = async () => {
      const results = await SearchRestaurants(searchInput, 'restaurant_name');
      setSearchResults(results);
    };

    fetchResults();
    
  }, [searchInput]);
  
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

    const handleRestaurantSelect = (result) =>{
    navigation.navigate('Detail', { restaurant: result });
   }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <TextInput
        style={[Searchbar.input]}
        placeholder="Search"
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      /><View style={Searchbar.resultsContainer}>
      {searchResults ? (
  searchResults.map((result, index) => (
    <TouchableOpacity key={`${result.id}-${index}`} onPress={() => handleRestaurantSelect(result)}>
      <View style={[Searchbar.resultContainer]}>
        <View style={[Searchbar.resultRow]}>
          <Icon name='magnifying-glass' style={Searchbar.magniGlass} />
          <View>
            <Text style={Searchbar.resultFont}>{result.restaurant_name}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {result.tags.map((tag, index) => {
                return (
                  <Text key={`${result.id}-tag-${index}`} style={[Searchbar.tagText, Colors.quartaryText]}>
                    {tag},
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={{ marginLeft: 10 }}><RenderStars rating={result.average_rating} /></View>
          <View style={{ flex: 1, marginTop: 2 }}><DistanceLocation restaurant={result} /></View>
        </View>
        <View style={Searchbar.resultRow}>
          {/* Additional content */}
        </View>
      </View>
    </TouchableOpacity>
  ))
) : null}

    </View></View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default SearchBar;
