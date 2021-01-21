import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, SystemMessage, Day } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    const name = this.props.route.params.name;

    // This sets the title of the chat page to the name entered by the user
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: name + ' has joined the conversation.',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // sets the color of the message bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
          },
          right: {
            backgroundColor: 'black'
          }
        }}
      />
    )
  }

  // customize system message text
  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: 'black',
          fontSize: 14,
          fontWeight: '700'
        }}
      />
    )
  }

  // customize the day shown above a message
  renderDay(props) {
    return (
      <Day
        {...props}
        textStyle={{
          color: 'black',
          fontSize: 16,
          fontWeight: '500'
        }}
      />
    )
  }

  render() {
    // color selection from the start screen is passed here
    let color = this.props.route.params.color;

    return (
      <View style={{
        flex: 1, 
        backgroundColor: color}}
      >
        <GiftedChat
          renderDay={this.renderDay}
          renderSystemMessage={this.renderSystemMessage}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />

        {/* fix to prevent keyboard from hiding message input field on older android devices */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}