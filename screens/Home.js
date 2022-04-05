import { React } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';

export default function Home({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('Route')
    }

    return (
        <View style={styles.container}>
            <Button title='Set Origin' onPress={() => routeOrigin()} />
            <Button title='Set destination' onPress={() => routeDestination()} />
            <Button title='Route Page' onPress={pressHandler} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
