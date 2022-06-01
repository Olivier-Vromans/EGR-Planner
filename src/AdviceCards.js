import { React, useEffect, useState } from "react"
import { StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native"
import Clock from "../assets/clock.png"
import Euro from "../assets/euro.png"
import Co2 from "../assets/co2.png"

const routeCard = ({ navigation, origin, destination, time, distance, mode, busDistance }) => {
    const url = "https://api.overheid.io/voertuiggegevens/"
    const key = "db354afa306f071e41b1d6f51d887ce59a0720102e361f2bf0fca9cf97b6117b"

    const km = distance / 1000
    const kmBus = busDistance / 1000 
    let price = 0
    let co2 = 0
    let emission = 0
    let licensePlate = navigation.getParam("licensePlate")

    const [loading, setLoading] = useState(true)
    const [fuelDetails, setfuelDetails] = useState([])


    function secondsToHms(d) {
        d = Number(d)
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = h > 0 ? h : "";
        let mDisplay = m > 0 ? m : "";
        let sDisplay = s > 0 ? s : "";

        return [Number(hDisplay), Number(mDisplay), Number(sDisplay)]
    }
    let [hours, minutes, seconds] = secondsToHms(time)

    if(mode === "transit"){
        price = (0.155 * km) + 1.01
        emission = Math.round(69.2 * kmBus)
    }
    if (mode === "driving") {
        let fuelPrice = 2.29
        price = km / 12 * fuelPrice

        if (licensePlate) {
            useEffect(() => {
                const fetchData = async () => {
                    try {
                        let searchURL = url + licensePlate
                        console.log(searchURL)
                        await fetch(searchURL, {
                            headers: {
                                "ovio-api-key": key
                            }
                        })
                            .then(response => response.json())
                            .then(fuelResults => {
                                let arr = []
                                for (let fuelResult of fuelResults.brandstof) {
                                    arr.push(fuelResult)
                                    // console.log(fuelResult)
                                }
                                setfuelDetails(arr)
                            })
                    } catch (err) {
                    }
                    setLoading(false)
                }
                // call the async fetchData function
                fetchData()
            }, [])
            if(!loading){
                co2 = fuelDetails[0].co2_uitstoot_gecombineerd 
                emission = Math.round(co2 * km)
            }
        }

    }



    return (
        <TouchableOpacity style={styles.cardContainer} key={mode}
        onPress={() => {
            navigation.navigate('Route', {
                origin: origin,
                destination: destination,
                mode: mode
            })
        }}
        >
            <Text>This is a Advice Card</Text>
            {/* <Image
                source={Clock}
                style={styles.clock}
            /> */}
            <Text>Tijd: {hours}:{minutes}</Text>
            {/* <Image
                source={Euro}
                style={styles.euro}
            /> */}
            <Text>Prijs: € {price.toFixed(2).replace('.', ',')}</Text>
            {/* <Image
                source={Co2}
                style={styles.co2}
            /> */}
            <Text>Uitstoot: {emission} gram</Text>
            <Text>Afstand: {km.toFixed(1)} km</Text>
        </TouchableOpacity >
    )

}

const deviceWidth = Math.round(Dimensions.get("window").width)
const styles = StyleSheet.create({
    cardContainer: {
        alignSelf: "center",
        backgroundColor: "#fff",
        width: deviceWidth - 40,
        height: 150,
        borderRadius: 10,
        marginTop: 20
    },
    clock: {
        width: 25,
        height: 25
    },
    euro: {
        width: 20,
        height: 20
    },
    co2: {
        width: 25,
        height: 25
    }
})

export default routeCard