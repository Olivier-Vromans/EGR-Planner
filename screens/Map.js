import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions, Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import leaf from '../assets/leaf.png'

export default function Map({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(true);
    const { width, height } = Dimensions.get('window');
    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")
    // tempOrigin = "zintele 4"
    // add %20 instead of space and end with .json for the api
    const mode = navigation.getParam("mode")
    const origin = tempOrigin.replace(/ /g, "%20")
    const destination = temoDestination.replace(/ /g, "%20")
    const [originGeoCode, setOriginGeoCode] = useState({})
    const [destinationGeoCode, setDestinationGeoCode] = useState({})

    let advice
    let emissionText
    const hours = navigation.getParam("hours")
    const minutes = navigation.getParam("minutes")
    const emission = navigation.getParam("emission") / 1000
    const adviceMode = navigation.getParam("adviceMode")

    switch (mode) {
        case "driving":
            advice = "Met dit advies reist u met de AUTO"
            emissionText = "Bah! Hiermee stoot u tot wel " + Math.round(emission * 100) / 100 + " kg CO2 uit! \n\n Weet u zeker dat u met de auto wil? Houd er dan rekening mee dat de toekomst van uw kinderen hieronder kan lijden!"
            break
        case "transit":
            advice = "Met dit advies reist u met het OV"
            break
        case "bicycling":
            advice = "Met dit advies reist u met de FIETS"
            emissionText = "U bent goed bezig, dit is de groenste route. Met deze route stoot u geen C02 uit en krijgt u sneller een summerbody!"
            break
        case "walking":
            advice = "Met dit advies reist u TE VOET"
            emissionText = "U bent goed bezig, dit is de groenste route. Met deze route stoot u geen C02 uit en krijgt u sneller een summerbody!"
            break
    }

    // variables for the api key and url's
    const api = navigation.getParam("googleKey").substring(5)
    const GeocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultOrigin = await fetch(GeocodeUrl + origin + "&key=" + api)
                const bodyOrigin = await resultOrigin.json()
                setOriginGeoCode(bodyOrigin.results[0].geometry.location)
                const resultDestination = await fetch(GeocodeUrl + destination + "&key=" + api)
                const bodyDestination = await resultDestination.json()
                setDestinationGeoCode(bodyDestination.results[0].geometry.location)

            } catch (err) {

            }
        }
        // call the async fetchData function
        fetchData()
    }, [])

    return (
        <View style={{ flex: 2 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={leaf}
                            style={styles.logoImage}
                        />
                        <Text style={styles.modalTitle}>U route is berekend</Text>
                        <Text style={styles.modalTitle}>{advice}</Text>
                        <Text>{emissionText}
                        </Text>
                        <View style={styles.buttons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    navigation.goBack()
                                }}
                            >
                                <Text style={styles.buttonText}>Ga Terug</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.buttonText}>Start route!</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: 51.916517,
                    longitude: 4.478560,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                <Marker coordinate={
                    {
                        latitude: originGeoCode.lat,
                        longitude: originGeoCode.lng,
                    }
                } />
                <Marker coordinate={
                    {
                        latitude: destinationGeoCode.lat,
                        longitude: destinationGeoCode.lng,
                    }
                } />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={api}
                    strokeWidth={5}
                    mode={mode.toUpperCase()}
                    strokeColor="green"
                />
                <StatusBar style="dark" />
            </MapView>

        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 225
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    buttonClose: {
        backgroundColor: "#28D8A1",
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        marginBottom: 50,
        textAlign: "center",
    },
    logoImage: {
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 50,
        width: 89.6,
        height: 80,
    },

});
