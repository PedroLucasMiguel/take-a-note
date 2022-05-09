import React, {useEffect} from 'react';
import { StyleSheet, PermissionsAndroid, Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotesScreen from './screens/NotesScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    navigator_backgroud: {
        backgroundColor: '#575757',
    },

    navigator_text: {
      color: '#E6E6E6',
    },
});

const Tab = createMaterialBottomTabNavigator();

async function requireFilePermission() {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE],
            {
                title: 'Take a Note! Storage Permission',
                message:
                "Take a note needs to access your storage to " +
                "create and edit notes.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
            
            return true;
        } 
        
        else {
            return false;
        }

      } catch (err) {
            Alert.alert('Error? wtf?')
      }
}

export default function App(){

    useEffect( () => {
        
        async function fetchPermissions(){
            if (await requireFilePermission() === false) {
                Alert.alert(
                    'Permissions denied...',
                    'You must enable the file permissions of the app.',
                    [
                        {text: 'Ok', onPress: () => BackHandler.exitApp()},
                    ] 
                );
                
            }
        }
        
        fetchPermissions();
    });

    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Home' 
                barStyle={styles.navigator_backgroud}
            >

                <Tab.Screen 
                    name='Home' 
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen 
                    name='CreateNote' 
                    component={NotesScreen} 
                    options={{
                        title: 'Notes',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="note-edit-outline" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen 
                    name='Settings' 
                    component={SettingsScreen} 
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog-outline" color={color} size={26} />
                        ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}