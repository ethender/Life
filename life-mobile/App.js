import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {

  let PlayFairDisplayItalic = require('./assets/fonts/PlayfairDisplay-Italic.ttf')


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerview}>
          <Image style={styles.logo} source={require('./assets/lifelogo.png')} />
          <Text style={styles.projectname}>Life</Text>
        </View>
      
        <View>
          <Text>Body</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    color:'black',
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  headerview: {
    backgroundColor:'#244068',
    flexDirection:'row'
  },
  logo: {
    height: 50,
    width: 50
  },
  projectname: {
    color:'black',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily:'PlayFairDisplayItalic',
    alignContent:'center'
  }
});
