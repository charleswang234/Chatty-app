import React, {Component} from 'react';

const imageUrlTest = /https?:\/\/.*\.(?:png|jpg|gif)/;
// what.test("str");


// (
//         <div className="message">
//         <span className="message-username" style={{color: this.props.userColour}}>{this.props.username}</span>
//         <span className="message-content">{this.props.content}</span>
//         </div>
//         );


class Message extends Component {

  // an alphaneumeric string generator that returns a string of length 6
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

  // check if filtering is contained within word
  containedWithin(filtering, word) {
    return filtering.test(word);
  }

  newContent(content, filter) {
    const splitMessage = content.split(" ");
    const condensedMessage = [];
    let currentIndex = 0;
    for (let i = 0; i < splitMessage.length; ++i) {
      if (condensedMessage[currentIndex] === undefined && this.containedWithin(filter, splitMessage[i])) {
        condensedMessage.push(splitMessage[i]);
        currentIndex++;
      } else if (condensedMessage[currentIndex] === undefined) {
        condensedMessage.push(splitMessage[i]);
      } else if (this.containedWithin(filter, splitMessage[i])) {
        condensedMessage.push(splitMessage[i]);
        currentIndex+= 2;
      } else {
        // concat onto old string
        condensedMessage[currentIndex] = condensedMessage[currentIndex] + " " + splitMessage[i];
      }

    }
    return condensedMessage;
  }

  render() {
    const imageContentList = this.newContent(this.props.content, imageUrlTest).map((phrases) => {
      if (this.containedWithin(imageUrlTest, phrases)) {
        return (
          <img src={phrases} />
          );
      }
      return (
        <div key={this.generateRandomString()}>{phrases}</div>
        );
    });

    // {this.newCentent(this.props.content)}
    switch(this.props.type) {
      case "incomingMessage":
      return (
        <div className="message">
        <span className="message-username" style={{color: this.props.userColour}}>{this.props.username}</span>
        <span className="message-content">{imageContentList}</span>
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