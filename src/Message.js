import React, { Component } from 'react';

export default class Message extends Component {
  evaluateMessage = () => {
    if(this.props.message.message.text === "**loading**"){
      return <div className="load-3">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    } else {
      // If the text is an image, render in img tag
      if(this.props.message.message.text.indexOf('.jpeg') > -1
      || this.props.message.message.text.indexOf('.gif') > -1
      || this.props.message.message.text.indexOf('.jpg') > -1
      || this.props.message.message.text.indexOf('.png') > -1){
        return <img src={this.props.message.message.text} width="100%"></img>
      } else {
        return <p>{this.props.message.message.text}</p>
      }
    }
  }
  render() {
    return <div className={"message-container " + (this.props.message.user.id === 5 ? 'self': '')}>
        <b>{this.props.message.user.name}</b>
        <div className="user" style={{clear: "both"}}></div>
      <div className="message">
        {this.evaluateMessage()}
      </div>
    </div>
  }
}
