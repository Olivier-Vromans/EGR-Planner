import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, TextInput, Button } from 'react-native';
import leaf from '../assets/leaf.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Home({ navigation }) {
  const [origin, onChangeOrigin] = React.useState(String);
  const [destination, onChangeDestination] = React.useState(String);

  console.log(destination);

  return (
    <View style={styles.homeWrapper}>
      <StatusBar style="auto" />
      <Text style={styles.titleText}>EGR-Planner</Text>
      {/* <Image source={leaf} style={styles.logoImage}/> */}
      {/* <Text style={styles.inputFieldText}>Vertrekpunt</Text>  */}
     
      <GooglePlacesAutocomplete
        // Placeholder
        placeholder='Vertrekpunt'
        // Minimal text length before prediction
        minLength={1}
        // what is the return
        returnKeyType={'done'}
        // fetch extra details
        fetchDetails={true}
        // 	displays the result from autocomplete if the place details api return not found
        autoFillOnNotFound={true}
        // hides "powered by Google" at the bottom of the search results list
        enablePoweredByContainer={false}
        // removes all default styling from the library
        suppressDefaultStyles={true}
        // the onPress handler
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onChangeOrigin(data.description)
        }}
        query={{
          key: 'AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY',
          language: 'nl',
        }}
        styles={{
          container:{
            flex: 0,
          },
          textInputContainer: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 350,
            maxWidth: 350,
            borderRadius: 4,
            borderColor:'#ececec',
            alignSelf:'center',
          },
          poweredContainer: {
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
          },
          powered: {},
          listView: {

          },
          row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 45,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          description: {},
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
      />
      
      {/* <Text style={styles.inputFieldText}>Bestemming</Text> */}
      
      <GooglePlacesAutocomplete
      // Placeholder
      placeholder='Bestemming'
      // Minimal text length before prediction
      minLength={1}
      // what is the return
      returnKeyType={'done'}
      // fetch extra details
      fetchDetails={true}
      // 	displays the result from autocomplete if the place details api return not found
      autoFillOnNotFound={true}
      // hides "powered by Google" at the bottom of the search results list
      enablePoweredByContainer={false}
      // removes all default styling from the library
      suppressDefaultStyles={true}
      // the onPress handler
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onChangeDestination(data.description)
      }}
      query={{
        key: 'AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY',
        language: 'nl',
      }}
      styles={{
        container:{
          flex: 0,
        },
        textInputContainer: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          minWidth: 350,
          maxWidth: 350,
          borderRadius: 4,
          borderColor:'#ececec',
          alignSelf:'center',
        },
        poweredContainer: {
          alignItems: 'center',
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: '#c8c7cc',
          borderTopWidth: 0.5,
        },
        powered: {},
        listView: {
          alignSelf: 'center',
          minWidth: 350,
          maxWidth: 350,
        },
        row: {
          backgroundColor: '#FFFFFF',
          padding: 13,
          height: 45,
          flexDirection: 'row',
        },
        separator: {
          height: 0.5,
          backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
        },
      }}
    /> 

      {/* <TextInput style={styles.textInputContainer} onChangeText={onChangeDestination} value={destination} placeholder={"Beurs"} /> */}

      <Text style={styles.button} onPress={() => {
        //Check if origin and destination is not empty
        if (origin !== '' && destination !== '') {
          //Navigate to the Route route with params
          navigation.navigate('Map', {
            origin: origin,
            destination: destination
          })
        }
      }}>
        <Text style={styles.textButton}>Vertrek!</Text>
      </Text>

      <Text style={styles.button} onPress={() => {
        navigation.navigate('Map', {
          origin: "zintele 4",
          destination: "Wijnhaven 99"
        })
      }}>
        <Text style={styles.textButton}>Go to the Map page</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#fff',
    alignContent: 'center',
    height: '100%',
    textAlign: 'center',
  },

  titleText:{
    fontSize: 42,
    marginTop: 100,
    marginBottom: 25,
    textAlign:'center',
    color: '#28D8A1',
  },

  inputFieldText: {
    //textAlign:'center',
    marginLeft: 35,
  },

  textInputContainer: {
    alignSelf: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 350,
    maxWidth: 350,
    borderRadius: 4,
    borderColor: '#ececec',
  },
  button: {
    backgroundColor: '#28D8A1',
    textAlign: 'center',
    alignSelf: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 350,
    maxWidth: 350,
    borderRadius: 4,
    borderColor: '#ececec',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textButton: {
    color: '#fff',
  },
});

