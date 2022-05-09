import React, {useRef} from 'react'
import { ScrollView, View, Text, Button, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

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

    create_note_view: {
        backgroundColor: '#8a8a8a',
    },

});

function CreateNewNote() {
    const richText = useRef(null);
    const editorView = useRef(null);

    return (
        <ScrollView style={styles.create_note_view} ref={editorView} onContentSizeChange={ () => editorView.current.scrollToEnd({ animated: false }) }>
            <RichEditor
                ref={richText}
                initialHeight={250}
                onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
            />
            <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertImage, actions.undo, actions.redo, ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            />
        </ScrollView>
    );
}

function NotesHome({ navigation }) {

    return (
        <ScrollView  style={styles.main_view}>
            <View style={styles.create_new_view}>
                <Button 
                    title='Create new note' 
                    onPress={ () => navigation.navigate('NewNote') } 
                />
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
                animation: 'none', // Thats fix the crashes related to the webview... that's sad to be honest :(
            }}>
            <Stack.Screen name='YourNotes' component={NotesHome} options={{title: 'Your Notes'}} />
            <Stack.Screen 
                name='NewNote' 
                component={CreateNewNote} 
                options={{
                    title: 'New Note', headerRight: () => (
                        <Button title='Save' />
                    ),
                }} 
            />
        </Stack.Navigator>
    );
}