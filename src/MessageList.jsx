import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {




  render () {
    const messageList = this.props.messages.map((messageObj) => {
      console.log("rendering");
      return <Message key = {messageObj.id} username = {messageObj.username} content = {messageObj.content} />;
    });

    return (
      <main className="messages">
      {messageList}
      </main>
      )
  }
}
export default MessageList;