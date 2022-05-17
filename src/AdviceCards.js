import React from "react"
import { StyleSheet, View, Text, Dimensions } from "react-native"

const routeCard = () => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.text}>Advice Card</Text>
        </View>
    )

}

const deviceWidth = Math.round(Dimensions.get("window").width)
const styles = StyleSheet.create({
    cardContainer:{
        alignSelf: "center",
        backgroundColor: "#fff",
        width: deviceWidth - 80,
        height: 200,
        borderRadius: 10
    },
    text:{
        textAlign: "center"
    }
})

export default routeCard