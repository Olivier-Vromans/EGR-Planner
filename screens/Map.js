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
    
    // variables for the api key and url's
    const api = "AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY"
    const url = "https://maps.googleapis.com/maps/api/directions/json?"

    // call the function
    GETInfo()

    async function GETInfo() {        
        console.log(url + "origin=" + origin + "&destination=" + destination + "&key=" + api)
        // // fetch route
        // await fetch(url + "origin=" + origin + "&destination=" + destination + "&key=" + api)
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))
    }

    console.log(origin);
    console.log(destination)
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
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={api}
                    strokeWidth={5}
                    strokeColor="green"
                    />
        </MapView>
    )
}