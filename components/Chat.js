import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, onSnapshot, addDoc, query, where, initializeFirestore, orderBy } from "firebase/firestore";
import {getAuth, onAuthStateChanged, signInAnonymously} from 'firebase/auth';

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// const firebase = require('firebase');
// require('firebase/firestore');

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

import MapView from 'react-native-maps';
import CustomActions from './CustomActions'

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const firebaseConfig = {
    apiKey: "AIzaSyDhvK9oHmouNpSo8yaXKK_44cjkwyaE-dU",
           authDomain: "chat-app-e1449.firebaseapp.com",
           projectId: "chat-app-e1449",
           storageBucket: "chat-app-e1449.appspot.com",
           messagingSenderId: "555781147632",
           appId: "1:555781147632:web:e01436956f6c218625eb35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Create reference to the messages collection on firestore
const messagesRef = collection(db, 'messages');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
      
    };

  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentsSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
        image: data.image || null,
      location: data.location || null,
        
      });
    });
    this.setState({
      messages,
    });
  };

  
  

  componentDidMount() {
    // this.getMessages;
    // Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected:true
        })
      } else {
        console.log('offline');
        this.setState({
          isConnected:false
        })
      }
    });
    

        // // Reference to load messages from Firebase
        // this.referenceChatMessages = firebase
        //   .firestore()
        //   .collection('messages');

        // Authenticate user anonymously
        this.authUnsubscribe = 
        auth = getAuth();

        console.log(this.getMessages())
    
        const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
         if (!user) {
   
           await signInAnonymously(auth);
           console.log(user)
         }
         if(user){
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
              },
            });

          
            if (this.state.isConnected) {
              const userListQuery = query(messagesRef, orderBy('createdAt', 'desc'));
            unsubscribe= onSnapshot(userListQuery, this.onCollectionUpdate);

             this.deleteMessages()
             this.saveMessages()
            }
            else{
              this.getMessages();
            }
           
            
  }});
      
    
  }

  componentWillUnmount() {
   
      
      this.authUnsubscribe;
    }

  

 // Add message to the state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // Save messages locally with Async Storage
        this.saveMessages();
        // Call addMessage with last message in message state
        if (this.state.isConnected === true) {
          this.addMessages(this.state.messages);
          
        }
      }
    );
  }

  // Add message to Firestore
  addMessages = (messages) => {
    const message = messages[0]
    addDoc(messagesRef, {
      
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };


  //  // Retrieve messages from async storage
    async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
        console.log('messages from storage', messages)
      } catch (error) {
        console.log(error.message);
      }
    };

  //   //save messages to async storage
    async saveMessages() {
      try {
        console.log('messages from state', this.state.messages)
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }
    
  //   //Delete messages from async storage (for development purposes only)
    async deleteMessages() {
      try {
        await AsyncStorage.removeItem('messages');
        this.setState({
          messages: []
        })
      } catch (error) {
        console.log(error.message);
      }
    }

  // Customize message bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fafafa',
          },
          right: {
            backgroundColor: '#2d7ecf',
          },
        }}
      />
    );
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  
 // Render the CustomActions component next to input bar to let user send images and geolocation
  renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

// Render Custom View to display map when user shares geolocation
 renderCustomView = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  return null;
}
 

  render() {
    let { bgColor } = this.props.route.params;
    // let {bgColor} = this.props.route.params.color;
    // console.log(this.props.route.params.color)
    // Set default background color if no color was selected
    if (bgColor === '') {
      bgColor = '#000000';
    }

    let name = this.props.route.params.name; // OR ...
//     // let { name } = this.props.route.params;
//     let bgColor = this.props.route.params.bgColor;

//     this.props.navigation.setOptions({ title: name });


    return (
              <View
                style={{
                  backgroundColor: bgColor,
                  flex: 1,
                }}
              >
        
                <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                renderActions={this.renderCustomActions}
                renderCustomView={this.renderCustomView}
                renderInputToolbar={this.renderInputToolbar.bind(this)}
                  messages={this.state.messages}
                  onSend={(messages) => this.onSend(messages)}
                  user={{
                    _id: this.state.uid,
                    name: this.state.user.name,
                    avatar: 'https://placeimg.com/140/140/any'
                  }}
                />
        
        
                
                  {/*fix error on display of keyboard for android devices  */}
                {Platform.OS === "android" ? (
                  <KeyboardAvoidingView behavior="height" />
                ) : null}
              </View>
            );
          }
        }
        
        
        
   const styles = StyleSheet.create({
 

  map: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3
  }
})