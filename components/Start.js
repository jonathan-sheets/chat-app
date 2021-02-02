import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// import the background image for start screen
const image = require('../assets/Background_Image.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (
      // using background image provided in project brief
      <ImageBackground source={image} style={styles.image}>
        <View style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          }}
          >
          <Text style={styles.title}>Cloud Chat</Text>
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Enter Your Name</Text>

            {/* This is where the user will input their name */}
            <TextInput
              style={{
                height: 40,
                color: 'white',
                borderColor: 'white', 
                borderWidth: 1, 
                borderRadius: 10, 
                width: 250, 
                padding: 10, 
                margin: 15,
                }}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder='Name'
              placeholderTextColor='lightgray'
            />

            {/* This is where the color options the user can choose are created */}
            <Text style={styles.text}> Choose a color for your Chat: </Text>
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.box1}
                  onPress={() => {this.setState({color: '#cfcd90'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box2}
                  onPress={() => {this.setState({color: '#cfab90'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box3}
                  onPress={() => {this.setState({color: '#a59d97'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.box4}
                  onPress={() => {this.setState({color: '#95a6c1'})}}
                >
                </TouchableOpacity>
              </View>

            <Text style={styles.text}>Your choice: </Text>

            {/* This field will populate with the color chosen by the user to show them their choice  */}
            <View style={{ 
              backgroundColor: this.state.color, 
              borderStyle: 'solid', 
              borderWidth: 1, 
              borderColor: 'gray', 
              marginTop: 10, 
              marginBottom: 15,
              width: 50, 
              height: 50, 
              borderRadius: 25 }}
            >
            </View>
            <Button
              color='#b094c2'
              title="Go to Chat"
              onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name, color: this.state.color })}
            />
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 200,
    margin: 10
  },
  mainContainer: {
    flexDirection: 'column',
    position: 'relative',
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '88%',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1
  },
  title: {
    fontSize: 42,
    color: 'white',
    fontVariant: ['small-caps'],
    textShadowColor: 'white',
    textShadowRadius: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    fontWeight: 'bold', 
    color: 'white', 
    fontSize: 17,
  },
  box1: {
    flex: 1,
    backgroundColor: '#cfcd90',
    height: 50,
    borderRadius: 25,
    right: 25
  },
  box2: {
    flex: 1,
    backgroundColor: '#cfab90',
    borderRadius: 25,
    right: 10
  },
  box3: {
    flex: 1,
    backgroundColor: '#a59d97',
    borderRadius: 25,
    left: 5
  },
  box4: {
    flex: 1,
    backgroundColor: '#95a6c1',
    borderRadius: 25,
    left: 20
  }
});