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
      try{
        const results = await SearchRestaurants(searchInput, 'restaurant_name');
        setSearchResults(results);
      }catch(error){
        console.error(error)
      }
      
    };

    fetchResults();
    
  }, [searchInput]);
  

  const handleResetSearchbar = () => {
    setSearchResults([])
    setSearchInput("")
  }

    const handleRestaurantSelect = (result) =>{
      setSearchInput('')
    navigation.navigate('Detail', { restaurant: result });
   }

  return (
    
    <View style={[styles.container]}>
      <TextInput
        style={[Searchbar.input]}
        placeholder="Worauf hast du Lust?"
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
        onBlur={handleResetSearchbar}
        
      /><View style={[Searchbar.resultsContainer]}>
      {searchResults && searchResults.length > 0 ? (
  searchResults.map((result, index) => {
    return(
    <TouchableOpacity key={`${result.id}-${index}`} onPress={() => handleRestaurantSelect(result)}>
      <View style={[Searchbar.resultContainer]}>
        <View style={[Searchbar.resultRow]}>
          <Icon name='magnifying-glass' style={Searchbar.magniGlass} />
          <View>
            <Text style={Searchbar.resultFont}>{result.restaurant_name}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          {result.tags && result.tags.length > 0 ? (
            JSON.parse(result.tags).map((tag, index) => {
          return (
        <Text key={`${result.id}-tag-${index}`} style={[Searchbar.tagText, Colors.quartaryText]}>
          {tag}
          {index !== result.tags.length - 1 ? ', ' : ''}
        </Text>
      );
    })
  ) : null}
</View>
          </View>
          <View style={{flexDirection: 'row', flex: 1, justifyContent:'flex-end', marginRight: 10}}>
          <View style={{ marginLeft: 10,}}><RenderStars rating={result.average_rating} /></View>
          <View style={{marginTop: 2 }}><DistanceLocation restaurant={result} /></View>
          </View>
        </View>
        <View style={Searchbar.resultRow}>
          {/* Additional content */}
        </View>
      </View>
    </TouchableOpacity>
  )})
) : null}

    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  resultsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  
});

export default SearchBar;
