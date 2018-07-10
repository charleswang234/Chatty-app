import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
      {
        id: "1",
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        id: "2",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
      ]}
      this.addNewMessage = this.addNewMessage.bind(this);
    }

    generateRandomString() {
      let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let lower = upper.toLowerCase();
      let digits = "0123456789";
      let alphanum = upper + lower + digits;
      let generatedString = "";

      for (let i = 0; i < 6; ++i) {
        generatedString += alphanum[Math.floor(Math.random() * alphanum.length)];
      }
      return generatedString;
    }

    addNewMessage(content, curUser) {
      const oldMessages = this.state.messages;
      const newMessage = {
        id:  this.generateRandomString(),
        username: curUser,
        content: content
      };
      const currentMessages = [... oldMessages, newMessage];
      this.setState({ messages: currentMessages});
    }

    componentDidMount() {
      console.log("componentDidMount <App />");
      setTimeout(() => {
        console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        console.log("hi");
        this.setState({messages: messages})
        console.log("bye");
      }, 3000);
    }


    render() {
      return (
        <div>
        <MessageList messages = {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} addNewMessage = {this.addNewMessage} />
        </div>
        );

    }
  }
  export default App;
