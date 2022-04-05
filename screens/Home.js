import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, Pressable, Image, TextInput } from 'react-native';
import leaf from './assets/leaf.png';

export default function App(props) {
  const [text, onChangeText] = React.useState();
  const { onPress, title = '>' } = props;


  return (
    <SafeAreaView style={styles.container}>
      <Image source={leaf}/>
      <Text style={styles.text}>
        EGR-Planner
      </Text>
      <Text style={styles.text2}>
        Vertrekpunt
      </Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={"Rotterdam Centraal"} />
      <Text style={styles.text2}>
        Bestemming
      </Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={"Beurs"}/>      
      <StatusBar style="auto" />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>{title}</Text>
      </Pressable>
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
  text2:{
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
  button:{
    backgroundColor: '#28D8A1',
    alignSelf: 'flex-end',
    marginRight: 83,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
  },
  textButton:{
    color: '#fff',
  },
});

