import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, onSnapshot, addDoc, query, where, initializeFirestore, orderBy } from "firebase/firestore";
import {getAuth, onAuthStateChanged, signInAnonymously} from 'firebase/auth';

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// const firebase = require('firebase');
// require('firebase/firestore');


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
      isConnected: null,
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
        
      });
    });
    this.setState({
      messages,
    });
  };

  
  

  componentDidMount() {
    // Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

   

        // // Reference to load messages from Firebase
        // this.referenceChatMessages = firebase
        //   .firestore()
        //   .collection('messages');

        // Authenticate user anonymously
        this.authUnsubscribe = 
        auth = getAuth();
    
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
            const userListQuery = query(messagesRef, orderBy('createdAt', 'desc'));
             unsubscribe= onSnapshot(userListQuery, this.onCollectionUpdate);
            
  }});
      
    
  }

  componentWillUnmount() {
   
      
      // this.authUnsubscribe();
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
          this.addMessages(this.state.messages[0]);
        }
      }
    );
  }

  // Add message to Firestore
  addMessages = (message) => {
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

  

 

  render() {
    let bgColor = this.props.route.params.color;
    // Set default background color if no color was selected
    if (bgColor === '') {
      bgColor = '#8A95A5';
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
                  messages={this.state.messages}
                  onSend={(messages) => this.addMessages(messages)}
                  user={{
                    _id: 1,
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
        
        
        
        

//    //Firestore Database
//    const firebase = require('firebase');
//    require('firebase/firestore');
   
//    //// firebase adding credential in order to connect to firebase
//    const firebaseConfig = {
//        apiKey: "AIzaSyDhvK9oHmouNpSo8yaXKK_44cjkwyaE-dU",
//        authDomain: "chat-app-e1449.firebaseapp.com",
//        projectId: "chat-app-e1449",
//        storageBucket: "chat-app-e1449.appspot.com",
//        messagingSenderId: "555781147632",
//        appId: "1:555781147632:web:e01436956f6c218625eb35",
      
//      };

// export default class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//     };


  
 
//    if (!firebase.apps.length){
//      firebase.initializeApp(firebaseConfig);
//      }
//      this.referenceChatMessages = firebase.firestore().collection("messages");

//      this.referenceMessagesUser= null;
//   }

 
  

 

//   componentDidMount() {

//     this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
//         if (!user) {
//           firebase.auth().signInAnonymously();
//         }
//         this.setState({
//           uid: user.uid,
//           messages: [],
//           user: {
//             _id: user.uid,
//             name: name,
//             avatar: "https://placeimg.com/140/140/any",
//         },
//         });
//         this.unsubscribe = this.referenceChatMessages
//           .orderBy("createdAt", "desc")
//           .onSnapshot(this.onCollectionUpdate);
//       });
//     }
   
// //     this.referenceChatMessages = firebase.firestore().collection('messages');
// //   this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
//    // this.setState({
//     //   messages: [
//     //     {
//     //       _id: 1,
//     //       text: "Helllo developer",
//     //       createdAt: new Date(),
//     //       user: {
//     //         _id: 2,
//     //         name: "React ative",
//     //         avatar: "http://placeimg.com/140/140/any",
//     //       },
//     //     },
//     //     {
//     //       _id: 2,
//     //       text: 'This is a system message',
//     //       createdAt: new Date(),
//     //       system: true,
//     //      },
//     //   ],
//     // });


//  componentWillUnmount() {
//    this. unsubscribe();
// }
  

//   onCollectionUpdate = (querySnapshot) => {
//    const messages = [];
//    // go through each document
//    querySnapshot.forEach((doc) => {
//      // get the QueryDocumentSnapshot's data
//      let data = doc.data();
//      messages.push({
//        _id: data._id,
//        text: data.text,
//        createdAt: data.createdAt.toDate(),
//        user: data.user,
//      });
//    });
//   }

//    // Add message to Firestore
//    addMessages = (message) => {
//     this.referenceChatMessages.add({
//         uid: this.state.uid,
//         _id: message._id,
//       text: message.text || '',
//       createdAt: message.createdAt,
//       user: message.user,
      
//     });
//   };
  
//   onSend(messages = []) {
//     this.setState((previousState) => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }));
//   }

//   renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#000'
//           }
//         }}
//       />
//     )
//   }

//   render() {
//     let name = this.props.route.params.name; // OR ...
//     // let { name } = this.props.route.params;
//     let bgColor = this.props.route.params.bgColor;

//     this.props.navigation.setOptions({ title: name });

//     return (
//       <View
//         style={{
//           backgroundColor: bgColor,
//           flex: 1,
//         }}
//       >

//         <GiftedChat
//         renderBubble={this.renderBubble.bind(this)}
//           messages={this.state.messages}
//           onSend={(messages) => this.onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//         />


        
//           {/*fix error on display of keyboard for android devices  */}
//         {Platform.OS === "android" ? (
//           <KeyboardAvoidingView behavior="height" />
//         ) : null}
//       </View>
//     );
//   }
// }



