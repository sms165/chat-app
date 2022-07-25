import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput,Button } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
 }
 

 render() {
   // Create the navigator
const Stack = createStackNavigator();
   return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
     </NavigationContainer>
   );
 }
}