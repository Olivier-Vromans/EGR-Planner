import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import Card from "../src/AdviceCards.js"
let CardComponents

export default function Advice({ route, navigation }) {
    const [loading, setLoading] = useState(true)
    const mode = ["driving", "transit", "bicycling", "walking"]
    const [routes, setRoutes] = useState([])
    const [busDistance, setBusDistance] = useState(0)
    const [transitDistance , setTransitDistance] = useState(0)

    //Get the origin and destination from the home page
    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")

    // tempOrigin = "zintele 4"
    // add %20 instead of space and end with .json for the api
    const origin = tempOrigin.replace(/ /g, "%20")
    const destination = temoDestination.replace(/ /g, "%20")

    const url = "https://maps.googleapis.com/maps/api/directions/json?"
    const params = `origin=${origin}&destination=${destination}`
    const key = "&key=" + navigation.getParam("googleKey")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = mode.map(travelMode => url + params + "&mode=" + travelMode + key)
                console.log(urls);
                await Promise.all(urls.map(url => fetch(url)))
                    .then((responses) => Promise.all(responses.map((res) => res.json())))
                    .then(directionResults => {
                        let arr = [];
                        let walking = 0
                        let transit = 0
                        let bus = 0
                        for (let directionResult of directionResults) {
                            for (let route of directionResult.routes) {
                                for (let step of route.legs[0].steps) {
                                    if (step.travel_mode === "TRANSIT") {
                                        transit = transit + step.distance.value
                                        if (step.transit_details.line.vehicle.type === "BUS") {
                                            bus = bus + step.distance.value
                                        }
                                    }
                                    if(step.travel_mode === "WALKING"){
                                        walking = walking + step.distance.value
                                    }
                                }
                                arr.push(route)
                            }
                        }
                        setRoutes(arr)
                        setBusDistance(bus)
                        setTransitDistance(transit)
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
                travelTime={route.legs[0].duration.value}
                busDistance={busDistance}
                transitDistance={transitDistance}
                distance={route.legs[0].distance.value}
                key={index}
                overheidKey={navigation.getParam("overheidKey")}
            >
            </Card>
        })
    }

    return (
        <SafeAreaView>
            {loading ? <ActivityIndicator size="large" /> :
                <View>
                    {CardComponents}
                </View>
            }
            <StatusBar style="dark" />
            {/* <Card /> */}
        </SafeAreaView>

    )
}