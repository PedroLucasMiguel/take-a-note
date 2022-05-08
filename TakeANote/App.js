import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


function App(){
  return(
    <ScrollView>
      <View style={styles.view_test}>
        <Text style={styles.view_test}>Hello World!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view_test: {
    alignItems: 'center',
  },

  text_test: {
    textAlign: 'center',
  }
});

export default App;
