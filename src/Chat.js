import React, { Component } from 'react';
import MessageList from './MessageList.js';
import ChatInput from './ChatInput.js';
import Chats from '../data/chats.json';
import crypto from 'crypto-js';

// Set our userID to John
let userId = 5;
let messCount = 1;

let users = {};
let chats = {};

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: this.normalizeData()
    };
  }

  handleSubmit = (message) => {
    let _this = this;
    let mess = {
      user: users[userId],
      message: {text: message, id: messCount++}
    };

    let loadingMessage = {
      user: users[6],
      message: {text: '**loading**', id: messCount++}
    };

    // add user inputted message and typing message for bot
    this.state.messages.push(mess);
    this.state.messages.push(loadingMessage);
    this.setState({messages: this.state.messages });
    this.handleBot(message, mess);
  }

  handleBot = (message, mess) => {
    let _this = this;
    // Send message to Chat Bot
    let outboundMess = {
      "message": {
        "message": message,
        "chatBotID": '2',
        "timestamp": Date.now()
      },
      "user": {
        "firstName": "John",
        "lastName": "Appleseed",
        "gender": "m",
        "externalID": "abc-123"
      }
    };

    let encodedMessage = JSON.stringify(outboundMess);
    let hash = crypto.HmacSHA256(encodedMessage, 'a3TKcn09mvnuoRmlVNKdsiluN9XbW4fN');
    fetch('http://www.personalityforge.com/api/chat/?apiKey=s8IgmUNaIfuUPN8n&hash=' + hash + '&message=' + encodeURIComponent(encodedMessage))
    .then(function(d){
      return d.json();
    })
    .then(function(d){
      // Fake typing delay
      setTimeout(() => {
        let mess = {
          user: users[6],
          message: {text: d.message.message, id: messCount++}
        };
        // Remove loading message and push on returned message
        _this.state.messages.pop();
        _this.state.messages.push(mess);
        _this.setState({messages: _this.state.messages});
      }, 3000);
    });
  }

  normalizeData = () => {
    let result = [];
    // Put includes in objects for constant time lookup
    Chats.includes.forEach((item) => {
      if(item.type === "message"){
        chats[item.id] = item;
      } else if (item.type === "user"){
        users[item.id] = item;
      }
    });
    // Push chats into normalized array for render
    Chats.data.forEach((chat) => {
      messCount++;
      result.push({user: users[chat.user.id], message: chats[chat.message.id]});
    })
    return result;
  }

  render() {
    return <div className="chat-container">
      <MessageList messages={this.state.messages}></MessageList>
      <ChatInput onInputSubmit={this.handleSubmit}></ChatInput>
    </div>
  }
}
