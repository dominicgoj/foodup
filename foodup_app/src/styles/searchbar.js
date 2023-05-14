import { StyleSheet } from "react-native/";
export const Searchbar = StyleSheet.create({
    resultsContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D6D6',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 0.1,
        shadowOffset: {
            height: 10, // Vertical offset
          },
        
    },
    resultContainer:{
        height: 50,
        marginBottom: 5,
        justifyContent: 'center'
    },
    resultRow: {
        flexDirection: 'row',
        
    },
    resultFont: {
        fontSize: 16,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
      },
      magniGlass:{
        fontSize:16,
        marginLeft: 10,
      },
      tagText:{
        fontSize: 12,
      }

});