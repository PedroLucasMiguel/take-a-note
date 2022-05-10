import React, {useRef, useEffect, useState} from 'react'
import { ScrollView, View, Text, Button, StyleSheet, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';

const Stack = createNativeStackNavigator();
var RNFS = require('react-native-fs');

const SAVE_DIR = RNFS.ExternalStorageDirectoryPath + '/Documents' + '/Take a Note';

function CreateNewNote() {
    const richText = useRef(null);
    const editorView = useRef(null);
    const [fileName, setFileName] = useState('NewNote');
    const [editorText, setEditorText] = useState('')

    return (
        <ScrollView style={styles.create_note_view} ref={editorView} onContentSizeChange={ () => editorView.current.scrollToEnd({ animated: false }) }>
            <View style={styles.file_name_view}>
                <Text style={styles.file_name_text}>File name:</Text>
                <TextInput 
                    style={styles.file_name_input} 
                    value={fileName} 
                    onChangeText={(text) => {setFileName(text); console.log(fileName)}} 
                    maxLength={10}
                />
            </View>
            <RichEditor
                ref={richText}
                initialHeight={250}
                onChange={ 
                    descriptionText => {
                        setEditorText(descriptionText);
                        console.log("descriptionText:", typeof(editorText));
                    }
                }
                pasteAsPlainText={true}
                initialFocus={true}
            />
            <RichToolbar
                editor={richText}
                actions={
                    [ 
                        actions.undo, 
                        actions.redo,
                        actions.setBold, 
                        actions.setItalic, 
                        actions.setUnderline, 
                        actions.heading1, 
                        'save', 
                    ]
                }
                iconMap={
                    { 
                        [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), 
                        save: ({tintColor}) => (<MaterialCommunityIcons name="content-save" color={tintColor} size={25} />),
                    }
                }
                save={
                    () => { 
                        let path = SAVE_DIR + '/' + fileName + '.html';
                        
                        RNFS.writeFile(path, editorText, 'utf8')
                            .then((success) => {
                                Alert.alert('File saved succesfuly! \n' + path)
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });
                    
                        console.log(path)
                    }
                }
            />
        </ScrollView>
    );
}

function NotesHome({ navigation }) {
    
    /*
    let buttons = RNFS.readdir(SAVE_DIR).resolve()
    
    console.log(buttons)
    */
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
    useEffect( () => {
        console.log('alo');

        RNFS.exists(SAVE_DIR)
            .then( (exists) => {
                if(!exists){
                    RNFS.mkdir(SAVE_DIR);
                }
            });
    });
    
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: styles.stack_navigator_background,
                headerTitleAlign: 'center',
                headerTitleStyle: styles.stack_navigator_text,
                headerTintColor: '#ffffff',
                animation: 'none', // Thats fix the crashes related to the webview... that's sad to be honest :(
            }}
        >
            <Stack.Screen name='YourNotes' component={NotesHome} options={{title: 'Your Notes'}} />
            <Stack.Screen 
                name='NewNote'
                options={{title: 'New Note'}} 
                component={CreateNewNote}
            />
        </Stack.Navigator>
    );
}

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

    file_name_view: {
        paddingBottom: 10,
        paddingTop: 10,
    },

    file_name_text: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    file_name_input: {
        backgroundColor: '#ffffff',
        color: '#000000',
    }
});
