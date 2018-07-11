import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
  }


  addNewMessage(content, curUser) {
    const oldMessages = this.state.messages;
    const newMessage = {
      // id:  this.generateRandomString(),
      username: curUser,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    // const currentMessages = [... oldMessages, newMessage];
    // this.setState({ messages: currentMessages});
  }

  addNewUsername(newUser) {
    console.log(newUser);
    this.setState({currentUser: {name: newUser}});
  }



  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:localhost:3001");
    this.socket.addEventListener('open', e => {
      console.log("connected to server");
    })

    this.socket.onmessage = (event) => {
      console.log(event.data);
      let newMessageWithId = JSON.parse(event.data);
      this.setState({ messages: this.state.messages.concat([newMessageWithId])});
    }
      // setTimeout(() => {
      //   // console.log("Simulating incoming message");
      //   // // Add a new message to the list of messages in the data store
      //   // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      //   // const messages = this.state.messages.concat(newMessage)
      //   // // Update the state of the app component.
      //   // // Calling setState will trigger a call to render() in App and all child components.
      //   // this.setState({messages: messages})
      //   // console.log("bye");
      // }, 3000);
    }


    render() {
      return (
        <div>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} addNewMessage = {this.addNewMessage}  addNewUsername = {this.addNewUsername}/>
        </div>
        );

    }
  }
  export default App;
