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
      {/* <Image source={leaf} style={styles.logoImage}/> */}
      <Text style={styles.titleText}>EGR-Planner</Text>
      <Text style={styles.inputFieldText}>Vertrekpunt</Text> 
     
      <GooglePlacesAutocomplete
        placeholder='Location'
        minLength={1}
        returnKeyType={'default'}
        fetchDetails={true}
        autoFillOnNotFound={true}
        enablePoweredByContainer={false}
        suppressDefaultStyles={true}
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
            flex:0,
          },
          textInputContainer: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            minWidth: 250,
            maxWidth: 250,
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
          listView: {},
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
      
      <Text style={styles.inputFieldText}>Bestemming</Text>
      
      {/* 
      <GooglePlacesAutocomplete
      placeholder='Location'
      minLength={2}
      autoFocus={true}
      returnKeyType={'default'}
      fetchDetails={true}
      autoFillOnNotFound={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onChangeDestination(data.description)
      }}
      query={{
        key: 'AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY',
        language: 'nl',
      }}
      styles={styles.input}
    /> 
    */}

      <TextInput style={styles.textInputContainer} onChangeText={onChangeDestination} value={destination} placeholder={"Beurs"} />

      <StatusBar style="auto" />

      <Pressable style={styles.button} onPress={() => {
        //Check if origin and destination is not empty
        if (origin !== '' && destination !== '') {
          /* Navigate to the Route route with params */
          navigation.navigate('Map', {
            origin: origin,
            destination: destination
          })
        }
      }}>
        <Text style={styles.textButton}>{">"}</Text>
      </Pressable>

      <Button title="Go to the Map page" onPress={() => {
        navigation.navigate('Map', {
          origin: "zintele 4",
          destination: "Wijnhaven 99"
        })
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },

  titleText:{
    fontSize: 42,
  },

  inputFieldText: {
    marginLeft: 12,
  },

  textInputContainer: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 250,
    borderRadius: 4,
    borderColor:'#ececec',
  },
  button: {
    backgroundColor: '#28D8A1',
    alignSelf: 'flex-end',
    marginRight: 83,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
  },
  textButton: {
    color: '#fff',
  },
});

