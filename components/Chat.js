import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

  componentDidMount() {
    const name = this.props.route.params.name;

    // This sets the title of the chat page to the name entered by the user
    this.props.navigation.setOptions({ title: name });
  };
  render() {
    // color selection from the start screen is passed here
    let color = this.props.route.params.color;

    // this.props.navigation.setOptions({ title: name }); -caused warning to be displayed when inside render function
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: color}}
      >
        <Text>Chat Screen</Text>
      </View>
    )
  }
}