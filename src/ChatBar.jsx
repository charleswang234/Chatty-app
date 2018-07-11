import React, {Component} from 'react';

class ChatBar extends Component {
  render () {
    const submitMessage = evt => {
      if (evt.key == "Enter") {
        const newMessageInput = evt.target;
        this.props.addNewMessage(newMessageInput.value, this.props.currentUser.name);
        newMessageInput.value = "";
      }
    }

    const submitUsername = evt => {
      console.log("inputting");
      if (evt.key == "Enter") {
        console.log("checking");
        const newUsername = evt.target;
        console.log(newUsername.value);
        this.props.addNewUsername(newUsername.value);
      }
    }

    return (
      <footer className="chatbar">

      <input className="chatbar-username" name = "newUserName" onKeyPress = {submitUsername} defaultValue = {this.props.currentUser.name} />
      <input className="chatbar-message" name = "newMessage" onKeyPress = {submitMessage} placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}
export default ChatBar;
