import React, { Component } from 'react';

export default class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: ''
    };
  }
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  detectKeyDown = (e) => {
    // Submit when user hits enter
    if(e.which === 13){
      this.props.onInputSubmit(this.state.inputValue);
      this.setState({inputValue: ''});
    }
  }
  render() {
    return <input placeholder="Say something funny" onKeyDown={this.detectKeyDown} value={this.state.inputValue} onChange={this.handleInputChange}></input>;
  }
}
