import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './navBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "", colour: '#000000'},
      messages: [],
      numberUsersOnline: 0,

    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewUsername = this.addNewUsername.bind(this);
  }


  addNewMessage(content, curUser) {
    const oldMessages = this.state.messages;
    const newMessage = {
      // id:  this.generateRandomString(),
      type: "postMessage",
      username: curUser.name,
      content: content,
      colour: curUser.colour
    };

    if (newMessage.username === "" ) {
      newMessage.username = "Anonymous";
    }
    this.socket.send(JSON.stringify(newMessage));
    // const currentMessages = [... oldMessages, newMessage];
    // this.setState({ messages: currentMessages});
  }

  addNewUsername(newUser) {
    console.log(newUser);
    // if the user did not change
    if (this.state.currentUser.name === newUser) {
      return;
    }
    const data = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newUser}`
    }
    if (this.state.currentUser.name === "") {
      data.content = `Anonymous has changed their name to ${newUser}`;
    }
    if (newUser === "") {
      data.content = `${this.state.currentUser.name} has changed their name to Anonymous`;
    }
    this.socket.send(JSON.stringify(data));
    this.setState({currentUser: {name: newUser, colour: this.state.currentUser.colour}});
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
      console.log("went through");
      console.log(event.data);
      switch(data.type) {

        case "incomingMessage":
          // handle incoming message
          this.setState({ messages: this.state.messages.concat([data])});
          break;
          case "incomingNotification":
          // handle incoming notification
          this.setState({messages: this.state.messages.concat([data])});
          break;
          case "postUsersOnline":
          // handle users online
          this.setState({numberUsersOnline: data.usersOnline});
          console.log("there are " + this.state.numberUsersOnline + " users online");
          break;
          case "postUserColour":
          // handle the user's colour
          this.setState({currentUser: {name: this.state.currentUser.name, colour: data.colour}});
          // console.log(`${this.state.currentUser.colour}`);
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
        <NavBar numberUsersOnline = {this.state.numberUsersOnline} />
        <MessageList messages = {this.state.messages}/>
        <div style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar currentUser = {this.state.currentUser} addNewMessage = {this.addNewMessage}  addNewUsername = {this.addNewUsername}/>

        </div>
        );

    }
  }
  export default App;
