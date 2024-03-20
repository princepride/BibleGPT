import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const SettingsPage = () => {
    return (
        <View style={styles.container}>
            <Text>SettingsPage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
});

export default SettingsPage