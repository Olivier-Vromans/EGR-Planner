import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map({ route, navigation }) {

    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")
    // TODO remove when done now just testing
    tempOrigin = "zintele 4"
    temoDestination = "Wijnhaven 99"

    // add %20 instead of space and end with .json for the api
    const origin = tempOrigin.replace(/ /g, "%20").concat(".json")
    const destination = temoDestination.replace(/ /g, "%20").concat(".json")
    
    //Array to store the geometry
    let geometryArray = []

    // variables for the api key and url's
    const api = "pk.eyJ1IjoiZHJ1bmttb25rZXlib203IiwiYSI6ImNsMW5pcnd2bjB0ZG0zYm9iMDFyM292MGIifQ.k2pJ_l0LUKSeaJxmK45tkw"
    const urlGeometry = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const urlDirections = 'https://api.mapbox.com/directions/v5/mapbox/'

    // call the function
    GETInfo()

    async function GETInfo() {
        // get the origin coordinates
        await fetch(urlGeometry + origin + "?country=nl&proximity=ip&types=place%2Cpostcode%2Caddress&language=nl&access_token=" + api)
            .then(response => response.json())
            .then(data => {
                //push the geometry to the array
                geometryArray.push(data.features[0].geometry.coordinates)
            })
            .catch(error => console.log(error))
        // get the destination coordinates
        await fetch(urlGeometry + destination + "?country=nl&proximity=ip&types=place%2Cpostcode%2Caddress&language=nl&access_token=" + api)
            .then(response => response.json())
            .then(data => {
                //push the geometry to the array
                geometryArray.push(data.features[0].geometry.coordinates)
            })
            .catch(error => console.log(error))


        // Array to string with url marks in between <lon>%2C<lat>%3B<lon>%2C<lat>
        let coordinatesStringTemp = geometryArray.toString()
        let coordinatesString = coordinatesStringTemp.replace(",", "%2C").replace(",", "%3B").replace(",", "%2C")
        console.log(coordinatesString);
        
        // fetch route
        await fetch(urlDirections + "driving/" + coordinatesString + "?alternatives=true&geometries=geojson&language=nl&overview=full&steps=true&access_token=" + api)
            .then(response => response.json())
            .then(data => console.log(data))

    }

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
        </MapView>
    )
}