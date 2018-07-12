import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
  }


  addNewMessage(content, curUser) {
    const oldMessages = this.state.messages;
    const newMessage = {
      // id:  this.generateRandomString(),
      type: "postMessage",
      username: curUser,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    // const currentMessages = [... oldMessages, newMessage];
    // this.setState({ messages: currentMessages});
  }

  addNewUsername(newUser) {
    console.log(newUser);
    const data = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newUser}`
    }
    this.socket.send(JSON.stringify(data));
    this.setState({currentUser: {name: newUser}});
  }



  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws:localhost:3001");
    this.socket.addEventListener('open', e => {
      console.log("connected to server");
    })

    this.socket.onmessage = (event) => {
      console.log(event);
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({ messages: this.state.messages.concat([data])});
          break;
        case "incomingNotification":
          // handle incoming notification
          this.setState({messages: this.state.messages.concat([data])});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
        }


      }

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
