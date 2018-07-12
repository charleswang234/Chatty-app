import React, {Component} from 'react';

class Message extends Component {


  render() {

    switch(this.props.type) {
      case "incomingMessage":
        return (
        <div className="message">
          <span className="message-username" style={{color: this.props.userColour}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        );
        break;
      case "incomingNotification":
        return (
        <div className="notification">
          <span className="notification-content">{this.props.content}</span>
        </div>
        );
        break;
      default:
        // show an error in the console if the message type is known
        throw new Error("Unknown data type " + data.type);
    }
  }
}
export default Message;