# React Native Chat app
![app screenshot](/assets/chat-app-screenshpt.png)

### Live view
** The app is hosted on Expo at (https://expo.dev/@sms165 )
## Description
The aim of this project is to build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

### What technology did I use and why?

I used **React Native** to create this mobile chat app. 
**React Native**
*Enables the coding of a functional app that can be used on different OS (iOS and Android), while using one programming language
*Unlike PWA it offers the possibility to use the devices API for accessing the camera, microphone and more

**Expo**
*Used as a development environment to develop and test the app

**Gifted Chat**
*The library was used to create the UI of the Chat App such as the message bubbles

**Firestore**
*Database that comes with Google Firebase
*Eliminates the need to write backend code for database queries

###What challenges did I face, what did I learn?
*As the lessons in CareerFoundry used Firestore v7 and the current version is 9, I had to heavily rely on the Firebase documentation and other sources online. As I had decided it would be better to code an up to date app.

### Testing the app offline on iOS systems
1. Connect the device using a cable
2. In the terminal type in ```ifconfig -a``` and copy the ip address of the device
3. In the terminal type in ```export EXPO_DEVTOOLS_LISTEN_ADDRESS={ipAdress without braces}```
4. In the terminal type in ```export REACT_NATIVE_PACKAGER_HOSTNAME={ipAdress without braces}```
5. In the terminal type in ```expo start```
6. Then the app can be opened on the device through ExpoGo
7. While the app is open disconnect from the internet on the device and the computer
8 In the terminal type in ```r``` this restarts the app in the offline mode, and gets the data from the async storage

### Downloading and opening the app
1. Download the code from github
2. Open the Terminal in the directory folder 
3. In the terminal type in ```npm install``` this installs all the dependencies needed
4. In the terminal type in ```expo start``` 
5. Open ExpoGo on the device and scan the QR code to open the app
