import { React, useEffect, useState } from "react"
import { StyleSheet, Text, Dimensions, TouchableOpacity, Image, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Clock from "../assets/clock.png"
import Euro from "../assets/euro.png"
import Co2 from "../assets/co2.png"

const routeCard = ({ navigation, origin, destination, travelTime, distance, mode, busDistance, transitDistance }) => {
    const url = "https://api.overheid.io/voertuiggegevens/"
    const key = "db354afa306f071e41b1d6f51d887ce59a0720102e361f2bf0fca9cf97b6117b"
    const [hours, minutes, seconds] = secondsToHms(travelTime)
    const [time, setTime] = useState(null);
    const [arriveTime, setArriveTime] = useState(null)
    
    const km = distance / 1000
    const kmBus = busDistance / 1000 
    const kmTransit = transitDistance / 1000
    let price = 0
    let co2 = 130
    let emission = 0
    let licensePlate = navigation.getParam("licensePlate")

    const [loading, setLoading] = useState(true)
    const [fuelDetails, setfuelDetails] = useState([])

    useEffect(() => {
      let time = getCurrentTime()
      let arriveTime = getCurrentTime()
      setTime(time);
    }, []);
    
    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes;
      }

    function secondsToHms(d) {
        d = Number(d)
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = h > 0 ? h : "";
        let mDisplay = m > 0 ? (m < 10 ? '0' : '') + m : "";
        let sDisplay = s > 0 ? s : "";

        return [Number(hDisplay), mDisplay, Number(sDisplay)]
    }
    if(mode === "transit"){
        price = (0.155 * kmTransit) + 1.01
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
            }
        }else{
            co2 = 109
        }
        emission = Math.round(co2 * km)
    }
    
    return (
        <TouchableOpacity style={styles.cardContainer} key={key}
        onPress={() => {
            navigation.navigate('Route', {
                origin: origin,
                destination: destination,
                mode: mode,
                hours: hours,
                minutes: minutes,
                emission: emission
            })
        }}
        >
                <View style={styles.time}>
                    <Text style={styles.cardText}>{time}<Ionicons name="arrow-forward" size={24} color="black" />{}</Text>
                </View>
                <View style={styles.info}>
                    <Text><Ionicons name="md-time-outline" size={20} color="black" /> {hours}:{minutes}</Text>
                    <Text><FontAwesome name="euro" size={20} color="black"/>{" "}{price.toFixed(2).replace('.', ',')}</Text>
                    <Text><MaterialCommunityIcons name="molecule-co2" size={23} color="black" />{emission} gram</Text>
                    <Text><MaterialCommunityIcons name="map-marker-distance" size={20} color="black" />{km.toFixed(1)} km</Text>
                </View>
                <View>
                </View>
        </TouchableOpacity >
    )


}
const deviceWidth = Math.round(Dimensions.get("window").width)
const styles = StyleSheet.create({
    cardText : {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 35,
    },

    time:{
        // backgroundColor:"green",
    },

    info:{
        // backgroundColor:"blue",
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    cardContainer: {
        marginBottom: 20,
        // alignSelf: "center",
        backgroundColor: "#DDDDDD",
        alignSelf: "center",
        width: deviceWidth - 50,
        padding: 20,
        height: 125,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 15,
        borderStyle: 'solid',
        borderLeftColor: '#28D8A0',
        marginTop: 10,

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