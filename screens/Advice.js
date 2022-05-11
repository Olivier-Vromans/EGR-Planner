import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, ActivityIndicator, FlatList, View, Button } from 'react-native';
import Card from '../src/Card.js';

export default function Advice({ route, navigation }) {
    const [loading, setLoading] = useState(true)
    const mode = ["walking"
        , "driving"
        // ,"walking", "bicycling", "transit"
    ]
    const [routes, setRoutes] = useState([
        //     {
        //     bounds: {},
        //     copyrights: "Map data ©2022",
        //     legs: [
        //         {
        //             distance: {},
        //             duration: {
        //                 text: "20000 min test.",
        //                 value: 1457,
        //             },
        //             end_address: "Wijnhaven 99, 3011 WN Rotterdam, Nederland",
        //             end_location: {},
        //             start_address: "Zintele 4, 2642 JS Pijnacker, Nederland",
        //             start_location: {
        //                 lat: 52.0076732,
        //                 lng: 4.4478421,
        //             },
        //             steps: [],
        //             traffic_speed_entry: [],
        //             via_waypoint: [],
        //         }
        //     ],
        //     overview_polyline: {},
        //     summary: "N471 en G.K. van Hogendorpweg/S112",
        //     warnings: [],
        //     waypoint_order: [],
        // }
    ])

    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")

    // tempOrigin = "zintele 4"
    // add %20 instead of space and end with .json for the api
    const origin = tempOrigin.replace(/ /g, "%20")
    const destination = temoDestination.replace(/ /g, "%20")

    const url = "https://maps.googleapis.com/maps/api/directions/json?"
    const params = `origin=${origin}&destination=${destination}&alternatives=true`
    const key = "&key=AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = mode.map(travelMode => url + params + "&mode=" + travelMode + key)
                console.log(urls);
                await Promise.all(urls.map(url =>
                    fetch(url).then(resp => resp.json())
                )).then(data => {
                    let r = data[0].routes
                    for (let route of r) {
                        console.log(route.legs[0].duration.text)
                        let arr = routes.concat(route)
                        setRoutes(arr)
                    }
                }).then(setLoading(false))
                // constvc result = await fetch(GeocodeUrl + destination + "&key=" + api)
                // const body = await result.json()
                // setDestinationGeoCode(body.results[0].geometry.location)
            } catch (err) {

            }
            // setLoading(false)
        }
        // call the async fetchData function
        fetchData()

    }, [])

    if (!loading) {
        // console.log(Object.keys(routes).length)
        // console.log(typeof(routes))
    }

    return (
        <SafeAreaView>
            {loading ? <ActivityIndicator size="large" /> :
                <View>
                    <Text>Done Loading</Text>
                    <FlatList
                        data={routes}
                        renderItem={({ item }) => (
                            <Text>{item.legs[0].duration.text}</Text>
                        )}
                        keyExtractor={item => item.legs[0].duration.value}
                    />
                    {/* <Text>{JSON.stringify(routes[0].legs[0].duration.text)}</Text> */}
                    <Button title="Go to the Map page" onPress={() => {
                        navigation.navigate('Map', {
                            origin: origin,
                            destination: destination
                        })
                    }} />
                </View>
            }
            <StatusBar style="dark" />
            {/* <Card /> */}
        </SafeAreaView>

    )
}