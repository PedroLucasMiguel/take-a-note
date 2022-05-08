import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({    
    main_view: {
        backgroundColor: '#121212',
        alignContent: 'space-around',
    },

    create_new_view: {
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },

    stack_navigator_background: {
        backgroundColor: '#575757',
    },

    stack_navigator_text: {
        color: '#ffffff',
        fontWeight: 'bold'
    },

});

function CreateNewNote() {
    return (
        <View>
            <Text>The note editor will be here :p</Text>
        </View>
    );
}

function NotesHome({ navigation }) {
    return (
        <ScrollView  style={styles.main_view}>
            <View style={styles.create_new_view}>
                <Button title='Create new note' onPress={() => navigation.navigate('NewNote')}></Button>
            </View>
        </ScrollView>
    );
}

export default function NotesScreen() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: styles.stack_navigator_background,
                headerTitleAlign: 'center',
                headerTitleStyle: styles.stack_navigator_text,
                headerTintColor: '#ffffff',
            }}>
            <Stack.Screen name='YourNotes' component={NotesHome} options={{title: 'Your Notes'}} />
            <Stack.Screen 
                name='NewNote' 
                component={CreateNewNote} 
                options={{
                    title: 'New Note', headerRight: () => (
                        <Button title='Save' />
                    ),}} 
            />
        </Stack.Navigator>
    );
}