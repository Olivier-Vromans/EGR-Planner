import { StyleSheet, Text, View } from 'react-native';

export default function Route() {
    return (
        <View style={styles.container}>
            <Text>This is the Routes Page!!</Text>
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