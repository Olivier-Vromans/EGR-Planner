import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, ActivityIndicator, FlatList, View, Button } from 'react-native';
import Card from "../src/AdviceCards.js"
let CardComponents

export default function Advice({ route, navigation }) {
    const [loading, setLoading] = useState(true)
    const mode = ["driving", "transit", "bicycling", "walking"]
    const [routes, setRoutes] = useState([])
    const [busDistance, setBusDistance] = useState(0)

    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")

    // tempOrigin = "zintele 4"
    // add %20 instead of space and end with .json for the api
    const origin = tempOrigin.replace(/ /g, "%20")
    const destination = temoDestination.replace(/ /g, "%20")

    const url = "https://maps.googleapis.com/maps/api/directions/json?"
    const params = `origin=${origin}&destination=${destination}`
    const key = "&key=AIzaSyADZtwlvQuxxtgjZ6YcSyDQdC7KKq0A3pY"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = mode.map(travelMode => url + params + "&mode=" + travelMode + key)
                console.log(urls);
                await Promise.all(urls.map(url => fetch(url)))
                    .then((responses) => Promise.all(responses.map((res) => res.json())))
                    .then(directionResults => {
                        let arr = [];
                        let busArr = []
                        for (let directionResult of directionResults) {
                            for (let route of directionResult.routes) {
                                for (let step of route.legs[0].steps) {
                                    if (step.travel_mode === "TRANSIT") {
                                        if (step.transit_details.line.vehicle.type === "BUS") {
                                            console.log(step.transit_details.line.vehicle.type);
                                            setBusDistance(busDistance + step.distance.value)
                                        }
                                    }
                                }
                                console.log(route.legs[0].duration.text)
                                arr.push(route)
                            }
                        }
                        // setBusTime(busArr)
                        setRoutes(arr)
                    })
                    .then(setLoading(false))
            } catch (err) {

            }
            // setLoading(false)
        }
        // call the async fetchData function
        fetchData()

    }, [])

    if (!loading) {
        CardComponents = routes.map((route, index) => {
            return <Card
                navigation={navigation}
                mode={mode[index]}
                origin={origin}
                destination={destination}
                time={route.legs[0].duration.value}
                busDistance={busDistance}
                distance={route.legs[0].distance.value}
                key={mode[index]}
            >
            </Card>
        })
    }

    return (
        <SafeAreaView>
            {loading ? <ActivityIndicator size="large" /> :
                <View>
                    {CardComponents}
                    {/* <Text>{JSON.stringify(routes)}</Text> */}
                    <Button title="Go to the Map page" onPress={() => {
                        navigation.navigate('Route', {
                            origin: origin,
                            destination: destination,
                            mode: mode[0]
                        })
                    }} />
                </View>
            }
            <StatusBar style="dark" />
            {/* <Card /> */}
        </SafeAreaView>

    )
}