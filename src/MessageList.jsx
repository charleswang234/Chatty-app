import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  messageList = this.props.messages.map((messageObj) => {
    console.log("rendering");
    return <Message key = {messageObj.id} username = {messageObj.username} content = {messageObj.content} />;

  });


  render () {


    return (
      <main className="messages">
      {this.messageList}
      </main>
      )
  }
}
export default MessageList;