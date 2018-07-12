import React, {Component} from 'react';

const imageUrlTest = /https?:\/\/.*\.(?:png|jpg|gif)/;
// what.test("str");

class Message extends Component {


    // var whatever = "asdfasdf jkasldf http://asdf.gif https://asfdasdfa.jpg"

  // check if filtering is contained within word
  containedWithin(filtering, word) {
    return filtering.test(word);
  }

  newContent(content, filter) {
    const splitMessage = content.split(" ");
    const condensedMessage = [];
    let currentIndex = 0;
    for (let i = 0; i < splitMessage.length; ++i) {
      if (containedWithin(filter, splitMessage[i])) {
        condensedMessage.push(splitMessage[i]);
      }
    }
    return condensedMessage;
  }

  render() {


    // {this.newCentent(this.props.content)}
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