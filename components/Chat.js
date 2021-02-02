import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, SystemMessage, Day, InputToolbar, Time } from 'react-native-gifted-chat';
import '@firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from '../CustomActions';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
        createdAt: ''
      },
      isConnected: false
    }

    // Initializes the firestore app
    if (!firebase.apps.length){
      // This is the Firebase configuration for the chat app
      firebase.initializeApp({
        apiKey: "AIzaSyAHQXDmTW5je9Clp0SEf8h32vRfgpBXe5A",
        authDomain: "chat-app-265ef.firebaseapp.com",
        projectId: "chat-app-265ef",
        storageBucket: "chat-app-265ef.appspot.com",
        messagingSenderId: "146744076069",
        appId: "1:146744076069:web:370df1e27f434be930dccc",
        measurementId: "G-6XQMXGXF4F"
      });
    }
  }


  componentDidMount() {
    // Received from user name input on Start screen
    const name = this.props.route.params.name;
    // This sets the title of the chat page to the name entered by the user
    this.props.navigation.setOptions({ title: name });

    // Check to see if the user is online.  If yes, get messages from firestore.  If no, get messages from local storage
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true
        });
        // This stores and retrieves the chat messages that users send
        this.referenceChatMessages = firebase.firestore().collection("messages");

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
              createdAt: new Date()
            },
            messages: [],
          });
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        });
        this.getMessages();
        window.alert('You are currently offline and unable to send messages');
      }
    });
  };

  // Retrieves messages from local storage so they can be viewed offline
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Saves messages in local storage each time a new message is sent
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Not currentyly called anywhere - useful for deleting test messages
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

  // app will stop listening for updates and unsubscribe from firestore and authorization
  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // updates messages state when a new message goes to firestore
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      // appends the new message to the message object
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  // creates a new instance of chat message in firestore
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
    // console.log('Message added to firestore');
  }

  // sets the color of the message bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#d9d9d9',
          },
          right: {
            backgroundColor: '#2e2e2e'
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

  renderTime(props) {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {color: 'white'},
          left: {color: 'black'}
        }}
      />
    )
  }

  // hides the input toolbar if user is offline
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

  // shows option button for custom actions - sending location or photos
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 250,
            height: 150,
            borderRadius: 13,
            margin: 8}}
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
    // color selection from the start screen is passed here
    let color = this.props.route.params.color;

    return (
      <View style={{
        flex: 1, 
        backgroundColor: color}}
      >
        <GiftedChat
          renderDay={this.renderDay}
          renderTime={this.renderTime}
          renderSystemMessage={this.renderSystemMessage}
          renderBubble={this.renderBubble.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />

        {/* fix to prevent keyboard from hiding message input field on older android devices */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}