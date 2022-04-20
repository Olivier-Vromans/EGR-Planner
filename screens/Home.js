import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Pressable, Image, TextInput, Button } from 'react-native';
import leaf from '../assets/leaf.png';

export default function Home({ navigation }) {
  const [origin, onChangeOrigin] = React.useState(String);
  const [destination, onChangeDestination] = React.useState(String);

  console.log(origin);
  console.log(destination);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={leaf} />
      <Text style={styles.text}>
        EGR-Planner
      </Text>
      <Text style={styles.text2}>
        Vertrekpunt
      </Text>
      <TextInput style={styles.input} onChangeText={onChangeOrigin} value={origin} placeholder={"Rotterdam Centraal"} />
      <Text style={styles.text2}>
        Bestemming
      </Text>
      <TextInput style={styles.input} onChangeText={onChangeDestination} value={destination} placeholder={"Beurs"} />
      <StatusBar style="auto" />
      <Pressable style={styles.button} onPress={() => {
        //Check if origin and destination is not empty
        if (origin !== '' && destination !== '') {
          /* Navigate to the Route route with params */
          navigation.navigate('Map', {
            origin: "zintele 4",
            destination: "Wijnhaven 99"
          })
        }
      }}>
        <Text style={styles.textButton}>{">"}</Text>
      </Pressable>
      <Button title="Go to the Map page" onPress={() => {
        navigation.navigate('Map')
      }} />
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

