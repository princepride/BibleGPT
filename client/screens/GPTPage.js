import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const GPTPage = () => {
    return (
        <View style={styles.container}>
            <Text>GPTPage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
});

export default GPTPage