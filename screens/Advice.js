import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';

export default function Advice({ route, navigation }) {
    const [loading, setLoading] = useState(true)

    //For Testing
    setTimeout(() => { setLoading(false)}, 3000)

    let tempOrigin = navigation.getParam("origin")
    let temoDestination = navigation.getParam("destination")



    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            {loading ? <ActivityIndicator size="large"/> : <Text>Done Loading</Text> }
            <StatusBar style="dark" />
        </SafeAreaView>

    )
}