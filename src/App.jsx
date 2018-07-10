import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true,
      currentUser: {name: "Bob"},
      messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
      ]}
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({loading:false});
      }, 3000)
    }



    render() {
      if (this.state.loading) {
        return (<h1>Loading...</h1>);
      } else {

        return (
          <div>
          <MessageList />
          <ChatBar />
          </div>
          );
      }
    }
  }
  export default App;
