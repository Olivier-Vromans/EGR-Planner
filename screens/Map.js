import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map({ route, navigation }) {
    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")

    // tempOrigin = "zintele 4"
    // add %20 instead of space and end with .json for the api
    const origin = tempOrigin.replace(/ /g, "%20")
    const destination = temoDestination.replace(/ /g, "%20")
    const [originGeoCode, setOriginGeoCode] = useState({})
    const [destinationGeoCode, setDestinationGeoCode] = useState({})


    // variables for the api key and url's
    const api = "AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY"
    const GeocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(GeocodeUrl + origin + "&key=" + api)
                const body = await result.json()
                setOriginGeoCode(body.results[0].geometry.location)
            } catch (err) {

            }
        }
        // call the async fetchData function
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(GeocodeUrl + destination + "&key=" + api)
                const body = await result.json()
                setDestinationGeoCode(body.results[0].geometry.location)
            } catch (err) {

            }
        }
        // call the async fetchData function
        fetchData()
    }, [])




    console.log(tempOrigin);
    console.log(temoDestination)
    return (
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
                strokeColor="green"
            />
            <StatusBar style="dark" />
        </MapView>
    )
}