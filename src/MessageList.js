import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Message from './Message.js';

export default class MessageList extends Component {
  componentDidUpdate() {
    // Scrolls to the bottom if not already there
    let node = ReactDOM.findDOMNode(this);
    let int = setInterval(() => {
      if(node.scrollTop + node.offsetHeight < node.scrollHeight){
        node.scrollTop += 3;
      } else {
        clearInterval(int);
      }
    }, 15);
  }
  renderMessages() {
    let messages = this.props.messages.map((mess) => {
      return <Message message={mess} key={mess.message.id}></Message>
    });
    return messages;
  }
  render() {
    return <div className="messages-list">
      {this.renderMessages()}
    </div>
  }
}
