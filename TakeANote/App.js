import React from 'react';
import { StyleSheet, Appearance, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CreateNoteScreen from './screens/CreateNoteScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from './screens/SettingsScreen';

const styles = StyleSheet.create({
    navigator_backgroud_dark: {
        backgroundColor: '#575757',
    },

    navigator_text_dark: {
      color: '#E6E6E6',
    },

    navigator_style_white: {
        backgroundColor: '',
    },
});

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const device_theme = Appearance.getColorScheme()

export default function App(){

  if (device_theme == 'dark'){
      return(
        <NavigationContainer>
          <Tab.Navigator 
              initialRouteName='Home' 
              barStyle={styles.navigator_backgroud_dark}
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
                component={CreateNoteScreen} 
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

  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home Screen'>
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Take a Note!' }} />
          <Stack.Screen name='Create Note' component={CreateNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}