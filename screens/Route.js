import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

export default function Route({ route, navigation }) {
    /* Get the param */
    const origin = navigation.getParam("origin")
    const destination = navigation.getParam("destination")

    return (
        <View style={styles.container}>
            <Text>This is the Routes Page!!</Text>
            <Text>The origin input: {origin}</Text>
            <Text>The destination input: {destination}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});