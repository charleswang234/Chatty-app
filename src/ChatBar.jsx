import React, {Component} from 'react';

class ChatBar extends Component {
  render () {
    const onSubmit = evt => {
      if (evt.key == "Enter") {
        const newMessageInput = evt.target;
        this.props.addNewMessage(newMessageInput.value, this.props.currentUser.name);
        newMessageInput.value = "";
      }
    }
    return (
      <footer className="chatbar">

      <input className="chatbar-username" value = {this.props.currentUser.name} />
      <input className="chatbar-message" name = "newMessage" onKeyPress = {onSubmit} placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}
export default ChatBar;
