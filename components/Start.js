import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#adbdbd'}}
      >
        <Text>Enter Your Name</Text>

        {/* This is where the user will input their name */}
        <TextInput
          style={{
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1, 
            borderRadius: 10, 
            width: 250, 
            padding: 10, 
            margin: 15}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder='Name'
        />

        {/* This is where the color options the user can choose are created */}
        <Text>Choose a color for your Chat: </Text>
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

        <Text>Your choice: </Text>

        {/* This field will populate with the color chosen by the user to show them their choice  */}
        <View style={{ 
          backgroundColor: this.state.color, 
          borderStyle: 'solid', 
          borderWidth: 1, 
          borderColor: 'gray', 
          margin: 10, 
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 200,
    margin: 10
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