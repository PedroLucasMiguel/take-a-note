import React from 'react'
import { Appearance, View, ScrollView, Text, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({    
    main_view_dark: {
        backgroundColor: '#121212',
    },
    
    page_header: { 
        justifyContent: 'center',
    },
    
    logo: {
        width: 320,
        height: 320,
        alignSelf: 'center',
    },
});

const device_theme = Appearance.getColorScheme()
  
export default function HomeScreen({ navigation }) {
    
    if (device_theme == 'dark'){
        return(
            <ScrollView style={styles.main_view_dark}>
                <View style={styles.page_header}>
                    <Image 
                        source={require('../resources/images/logo_nobg.png')}
                        style={styles.logo}
                    />
                </View>
            </ScrollView>
        );
    }
    
    return(
        <ScrollView>
            <View style={styles.page_header}>
                <Image 
                    source={require('../resources/images/logo_nobg.png')}
                    style={styles.logo}
                />
            </View>
        </ScrollView>
    );
}