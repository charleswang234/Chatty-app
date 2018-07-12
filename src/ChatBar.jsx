import React, {Component} from 'react';

class ChatBar extends Component {
  state={
    "username": "",
    "inputMessage": ""
  }

  changeUsername = (evt) => {
    console.log(evt.target.value);
    this.setState({"username": evt.target.value});
  }

  changeMessage = (evt) => {
    console.log(evt.target.value);
    this.setState({inputMessage: evt.target.value});
  }

  render () {



    const submitMessage = evt => {
      if (evt.key == "Enter") {
        const newMessageInput = evt.target;
        this.props.addNewMessage(this.state.inputMessage, this.props.currentUser.name);
        newMessageInput.value = "";
      }
    }



    const submitUsername = evt => {
      console.log("inputting");
      if (evt.key == "Enter") {
        console.log("checking");
        // const newUsername = evt.target;
        // console.log(newUsername.value);
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
