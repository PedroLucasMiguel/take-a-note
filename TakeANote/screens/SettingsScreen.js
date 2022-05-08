import React from 'react'
import { Appearance, View, ScrollView, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    view_test: {
        alignItems: 'center',
    },
  
    text_test_whiteT: {
        color: 'white',
        textAlign: 'center',
    },

    text_test_darkT: {
        color: 'black',
        textAlign: 'center',
    },
});

const device_theme = Appearance.getColorScheme()
  
export default function SettingsScreen() {
    return(
        <ScrollView>
            <View style={styles.view_test}>
                <Text style={styles.text_test_darkT}>Will have some settings here</Text>
            </View>
        </ScrollView>
    );
}