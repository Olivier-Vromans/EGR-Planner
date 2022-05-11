import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Pressable, Image, TextInput, Button } from 'react-native';
import leaf from '../assets/leaf.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Home({ navigation }) {
  const [origin, onChangeOrigin] = React.useState(String);
  const [destination, onChangeDestination] = React.useState(String);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={leaf} />
      <Text style={styles.text}>
        EGR-Planner
      </Text>
      <Text style={styles.text2}>
        Vertrekpunt
      </Text>
      {/* <GooglePlacesAutocomplete
        placeholder='Location'
        minLength={2}
        autoFocus={true}
        returnKeyType={'default'}
        fetchDetails={true}
        autoFillOnNotFound={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onChangeOrigin(data.description)
        }}
        query={{
          key: 'AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY',
          language: 'nl',
        }}
        styles={styles.input}
      /> */}
      <TextInput style={styles.input} onChangeText={onChangeOrigin} value={origin} placeholder={"Rotterdam Centraal"} />
      <Text style={styles.text2}>
        Bestemming
      </Text>
      {/* <GooglePlacesAutocomplete
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
    /> */}
      <TextInput style={styles.input} onChangeText={onChangeDestination} value={destination} placeholder={"Beurs"} />
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
        navigation.navigate('Advice', {
          origin: "zintele 4",
          destination: "wijnhaven 99"
        })
      }} />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#28D8A1',
    fontSize: 32,
    marginBottom: 30,
  },
  text2: {
    paddingTop: 10,
    color: '#000',
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 250,
    borderRadius: 4,
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

