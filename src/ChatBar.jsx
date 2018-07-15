import React, {Component} from 'react';

class ChatBar extends Component {
  state={
    "username": "",
    "inputMessage": ""
  }

  // updates username when user changes it
  changeUsername = (evt) => {
    console.log(evt.target.value);
    this.setState({"username": evt.target.value});
  }

  // updates message when user changes it
  changeMessage = (evt) => {
    console.log(evt.target.value);
    this.setState({inputMessage: evt.target.value});
  }

  render () {

    // pressing enter to submit the message
    const submitMessage = evt => {
      if (evt.key == "Enter") {
        const newMessageInput = evt.target;
        this.props.addNewMessage(this.state.inputMessage, this.props.currentUser);
        newMessageInput.value = "";
      }
    }

    // creating a new username
    const submitUsername = evt => {
      console.log("inputting");
      if (evt.key == "Enter") {
        this.props.addNewUsername(this.state.username);
      }
    }

    return (
      <footer className="chatbar">
      <input className="chatbar-username" name = "newUserName" onChange = {this.changeUsername} onKeyDown = {submitUsername} defaultValue = {this.props.currentUser.name} />
      <input className="chatbar-message" name = "newMessage" onChange = {this.changeMessage} onKeyPress = {submitMessage} placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}
export default ChatBar;
