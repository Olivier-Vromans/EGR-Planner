import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import leaf from '../assets/leaf.png'

export default function Home({ navigation }) {
  const [origin, onChangeOrigin] = React.useState(String);
  const [destination, onChangeDestination] = React.useState(String);
  const [licensePlate, setLicensePlate] = React.useState(String);

  console.log(origin);
  return (
    <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false}>      
    <View style={styles.homeWrapper}>
      <Image
        source={leaf}
        style={styles.logoImage}
      />

      {/* <Text style={styles.titleText}>Kies je route!</Text> */}
      <Text style={styles.titleText}>EGR</Text>
      <Text style={styles.motto}>Verklein je ecologische voetafdruk </Text>

      <View style={styles.section}>
        
            <Text style={styles.inputFieldText}>Vertrekpunt</Text>
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
                container: {
                  flex: 0,
                },
                textInputContainer: {
                  height: 40,
                  margin: 12,
                  marginTop: 0,
                  //borderWidth: 1,
                  padding: 10,
                  minWidth: 350,
                  maxWidth: 350,
                  borderBottomWidth: 1,
                  //borderRadius: 4,
                  borderColor: '#ececec',
                  alignSelf: 'center',
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

        <Text style={styles.inputFieldText}>Bestemming</Text>
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
            container: {
              flex: 0,
            },
            textInputContainer: {
              height: 40,
              margin: 12,
              marginTop: 0,
              //borderWidth: 1,
              padding: 10,
              minWidth: 350,
              maxWidth: 350,
              borderBottomWidth: 1,
              //borderRadius: 4,
              borderColor: '#ececec',
              alignSelf: 'center',
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
        <Text style={styles.button} onPress={() => {
          //Check if origin and destination is not empty
          if (origin !== '' && destination !== '') {
            //Navigate to the Route route with params
            navigation.navigate('Advies', {
              origin: origin,
              destination: destination,
              licensePlate: licensePlate,
            })
          }
          else {
            console.log('empty input')
          }
        }}>
          <Text style={styles.textButton}>Vertrek!</Text>
        </Text>

        <Text style={styles.button} onPress={() => {
          navigation.navigate('Advies', {
            origin: "Zintele 4",
            destination: "wijnhaven 99",
            licensePlate: "8kkr09"
          })
        }}>
          <Text style={styles.textButton}>Go to the Map page</Text>
        </Text>
      </View>
      <StatusBar style="dark" />
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#fff',
    alignContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  section: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },

  titleText: {
    fontSize: 45,
    textAlign: 'center',
    color: '#28D8A1',
    fontWeight: 'bold',
    textShadowColor: 'rgba(40, 216, 116, 0.50)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
    ,
  },

  motto: {
    color: '#28D8A1',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',

  },

  inputFieldText: {
    width: Dimensions.get('screen').width,
    color: '#28D8A1',
    marginTop: 5,
    marginBottom: 6,
    paddingLeft: 20
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
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 40,
    margin: 12,
    padding: 10,
    minWidth: 350,
    maxWidth: 350,

    borderRadius: 4,
    shadowColor: "#28D8A1",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.58,
    shadowRadius: 13.00,
    elevation: 10,
  },
  textButton: {
    color: '#fff',
  },

  logoImage: {
    marginTop: 75,
    alignSelf: 'center',
    marginBottom: 0,
    //marginLeft: 32,
    width: 89.6,
    height: 80,
  },
});