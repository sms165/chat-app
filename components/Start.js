import React from 'react';
import { View, Text, Button, StyleSheet, Pressable, ImageBackground, TouchableOpacity, TextInput,} from 'react-native';

// Importing the default background image from the assets folder
import BackgroundImage from "../assets/background-image.png";
import Icon from "../assets/icon.svg";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: "",
    };
  }

  // function to update the state with the new background color for Chat Screen chosen by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };
  // backgroud colors to choose
  colors = {
    black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE"
  };

  render() {
    return (
      // Components to create the color arrays, titles and the app's colors
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chat App</Text>
          </View>

          <View style={styles.inputMain}>
            <View style={styles.inputBox}>
            <Icon />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>
                Choose Background Color
              </Text>
            </View>

            {/* All the colors to change the background are here! */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                style={[{backgroundColor: this.colors.black}, styles.colorButton]}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[{backgroundColor: this.colors.purple}, styles.colorButton]}
                onPress={() => this.changeBgColor(this.colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[{backgroundColor: this.colors.grey}, styles.colorButton]}
                onPress={() => this.changeBgColor(this.colors.grey)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[{backgroundColor: this.colors.green}, styles.colorButton]}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            {/*This will allow the user to click on a button and be redirected to the chat page */}
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Creating the app's stylesheet, fixing sizes, centering items, changing colors
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "40%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  inputMain: {
    backgroundColor: "#FFFFFF",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    marginLeft:10,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    width:"100%"
  },

  colorBox: {
    
    width: "88%",
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    textAlign: "center"
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  colorButton: {
    
    width: 50,
    height: 50,
    borderRadius: 25,
  },

 

  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

