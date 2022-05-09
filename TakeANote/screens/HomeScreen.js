import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({    
    main_view_dark: {
        backgroundColor: '#121212',
    },
    
    page_header: { 
        justifyContent: 'center',
    },
    
    logo: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 35,
    },
});
  
export default function HomeScreen() {

    return(
        <ScrollView style={styles.main_view_dark}>
            <View style={styles.page_header}>
                <Text style={styles.text}>Welcome back ???</Text>
                <Image 
                    source={require('../resources/images/logo_nobg.png')}
                    style={styles.logo}
                />
            </View>
        </ScrollView>
    );
}