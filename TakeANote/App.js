import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotesScreen from './screens/NotesScreen';

const styles = StyleSheet.create({
    navigator_backgroud: {
        backgroundColor: '#575757',
    },

    navigator_text: {
      color: '#E6E6E6',
    },
});

const Tab = createMaterialBottomTabNavigator();

export default function App(){

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