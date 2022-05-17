import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, ActivityIndicator, FlatList, View, Button } from 'react-native';


export default function Advice({ route, navigation }) {
    const [loading, setLoading] = useState(true)
    const mode = ["driving", "transit", "bicycling", "walking"]
    const [routes, setRoutes] = useState([])

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
                        // console.log(data);
                        let arr = [];
                        for (let directionResult of directionResults) {
                            for (let route of directionResult.routes) {
                                console.log(route.legs[0].duration.text)
                                arr.push(route)
                            }
                        }
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
        console.log(routes[0]);
        // const routeComponents = routes.map((route, index) => {
        //     return 
        // })
    }

    return (
        <SafeAreaView>
            {loading ? <ActivityIndicator size="large" /> :
                <View>
                    <FlatList
                        data={routes}
                        renderItem={({ item }) => (
                            <Text>{item.legs[0].duration.text}</Text>
                        )}
                        keyExtractor={item => item.legs[0].duration.value}
                    />
                    {/* <Text>{JSON.stringify(routes)}</Text> */}
                    <Button title="Go to the Map page" onPress={() => {
                        navigation.navigate('Route', {
                            origin: origin,
                            destination: destination,
                            mode: mode[0]
                        })
                    }} />
                    <Button title="Driving" onPress={() => {
                        navigation.navigate('Route', {
                            origin: origin,
                            destination: destination,
                            mode: mode[0]
                        })
                    }} />
                    <Button title="OV" onPress={() => {
                        navigation.navigate('Route', {
                            origin: origin,
                            destination: destination,
                            mode: mode[1]
                        })
                    }} />
                    <Button title="Fiets" onPress={() => {
                        navigation.navigate('Route', {
                            origin: origin,
                            destination: destination,
                            mode: mode[2]
                        })
                    }} />
                </View>
            }
            <StatusBar style="dark" />
            {/* <Card /> */}
        </SafeAreaView>

    )
}